import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import jsonStyles from "../assets/json-styles";
import styleControl from "../assets/style-control";
import geojsonExtent from "@mapbox/geojson-extent";

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
        style:
          "https://api.tilecloud.io/v1/styles/tilecloud-basic?key=YOUR-API-KEY"
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

      map.addControl(draw, "top-right");
      map.addControl(new styleControl());

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
  }, [map, updateDraft]);

  useEffect(() => {
    if (isNotNull<MapboxDraw>(draw)) {
      if (draft) {
        try {
          draw.deleteAll().set(JSON.parse(draft));
          const bounds = geojsonExtent(JSON.parse(draft));
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
