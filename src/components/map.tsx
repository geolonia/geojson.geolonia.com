import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { AppState } from "../store";

// state selector
const selectGeoJson = (state: AppState) => state.geoJson.data;

export const Map: React.FC = () => {
  const geoJson = useSelector(selectGeoJson, shallowEqual);
  return <pre>{JSON.stringify(geoJson)}</pre>;
};

export default Map;
