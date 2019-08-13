import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import jsonStyles from "../assets/json-styles";
import styleControl from "../assets/style-control";

type Props = {
  draft: string;
  disabled: boolean;
};

// typeguards
const isNotNull = <T,>(object: any): object is T => !!object;

export const Map: React.FC<Props> = props => {
  const [, setMap] = useState<mapboxgl.Map | null>(null);
  const [draw, setDraw] = useState<MapboxDraw | null>(null);
  const { draft } = props;
  const mapContainer = useRef();

  useEffect(() => {
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
    setMap(map);
    setDraw(draw);
  }, []);

  useEffect(() => {
    return () => {
      if (isNotNull<MapboxDraw>(draw)) {
        if (draft) {
          try {
            draw.deleteAll().set(JSON.parse(draft));
          } catch (e) {
            draw.deleteAll();
          }
          // const bounds = geojsonExtent(geoJson);
          // if (bounds) {
          //   map.fitBounds(bounds, { padding: 20 });
          // }
        } else {
          draw.deleteAll();
        }
      }
    };
  }, [draft, draw]);

  return (
    <div
      // @ts-ignore
      ref={mapContainer}
      style={{ width: "100%", height: "100%", border: "1px solid #ccc" }}
    ></div>
  );
};

export default Map;
