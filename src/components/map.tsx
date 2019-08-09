import React, { useRef, useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { AppState } from "../store";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import jsonStyles from "../assets/json-styles";
import styleControl from "../assets/style-control";

// type guard
const isHTMLElement = (element: any): element is HTMLElement => !!element;

// state selector
const selectGeoJson = (state: AppState) => state.geoJson.data;

export const Map: React.FC = () => {
  const geoJson = useSelector(selectGeoJson, shallowEqual);
  const mapContainer = useRef();

  useEffect(() => {
    const container = mapContainer.current;
    if (isHTMLElement(container)) {
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

      return () => {
        // // @ts-ignore
        // geoJson.features.map((feature: GeoJSON.Feature) =>
        //   map.addLayer({
        //     id: "my-geojson",
        //     type: feature.type
        //   })
        // );
      };
    }
  }, [geoJson]);

  // @ts-ignore
  return <div ref={mapContainer} style={{ width: "100%", height: 300 }}></div>;
};

export default Map;
