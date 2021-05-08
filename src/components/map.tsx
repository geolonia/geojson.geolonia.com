import React, { useState, useRef, useEffect } from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import jsonStyles from "../assets/json-styles";
import geojsonExtent from "@mapbox/geojson-extent";
import GeoloniaControl from "@geolonia/mbgl-geolonia-control";
import { createFeaturePropertyTableHTML } from "../lib/geojson";

// @ts-ignore
const mapboxgl = window.geolonia

type Props = {
  draft: string;
  disabled: boolean;
  updateDraft: (draft: string) => void;
};

// typeguards
const isNotNull = <T,>(object: any): object is T => !!object;

export const Map: React.FC<Props> = props => {
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [draw, setDraw] = useState<MapboxDraw | null>(null);
  const { draft, updateDraft } = props;
  const mapContainer = useRef();

  useEffect(() => {
    if (!map) {
      const container = mapContainer.current;
      // @ts-ignore
      const map = new mapboxgl.Map({
        container,
        hash: true,
        style: "geolonia/basic"
      });

      const draw = new MapboxDraw({
        boxSelect: false,
        controls: {
          point: true,
          line_string: true,
          polygon: true,
          trash: true,
          combine_features: false,
          uncombine_features: false
        },
        styles: jsonStyles,
        userProperties: true
      });

      map.addControl(new mapboxgl.NavigationControl());
      map.addControl(draw, "top-right");

      ["draw.create", "draw.update", "draw.delete"].forEach(eventType => {
        map.on(eventType, () => {
          const geoJson = draw.getAll();
          updateDraft(JSON.stringify(geoJson, null, "  "));
        });
      });

      setMap(map);
      setDraw(draw);
      return () =>
        ["draw.create", "draw.update", "draw.delete"].forEach(eventType =>
          map.off(eventType)
        );
    }
  }, [draft, map, updateDraft]);

  useEffect(() => {
    if (map && draw && draft) {
      map.on("click", (e: mapboxgl.MapMouseEvent) => {
        const ids = draw.getFeatureIdsAt(e.point);
        if (ids.length < 1) {
          return;
        } else {
          const id = ids[0];
          try {
            const geoJson = JSON.parse(draft) as GeoJSON.FeatureCollection<
              GeoJSON.Geometry
            >;
            const feature = geoJson.features.find(feature => feature.id === id);
            feature &&
              new mapboxgl.Popup({ closeOnClick: true })
                .setLngLat(e.lngLat)
                .setHTML(createFeaturePropertyTableHTML(feature))
                .addTo(map);
          } catch (e) {
            console.error(e);
          }
        }
      });
    }
  }, [draft, draw, map]);

  useEffect(() => {
    if (isNotNull<MapboxDraw>(draw)) {
      if (draft || draft === "") {
        try {
          const geoJsons = JSON.parse(draft) as GeoJSON.FeatureCollection<
            GeoJSON.Geometry
          >;
          draw.deleteAll().set(geoJsons);
          const bounds = geojsonExtent(geoJsons);
          if (bounds && isNotNull<mapboxgl.Map>(map)) {
            map.fitBounds(bounds, { padding: 20 });
          }
        } catch (e) {
          // console.log("catch draw");
          // draw.deleteAll();
        }
      }
    }
  }, [draft, draw, map]);

  return (
    <div
      // @ts-ignore
      ref={mapContainer}
      style={{ width: "100%", height: "100%", border: "1px solid #ccc" }}
    ></div>
  );
};

export default Map;
