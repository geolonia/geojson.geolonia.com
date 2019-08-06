import { createStore, combineReducers } from "redux";
import { reducer as geoJsonReducer, GeoJsonState } from "./reducers/geojson";

export type AppState = { geoJson: GeoJsonState };

const rootReducer = combineReducers({ geoJson: geoJsonReducer });
export const store = createStore(rootReducer);
