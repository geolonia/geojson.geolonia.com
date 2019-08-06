import { createStore, combineReducers } from "redux";
import { reducer as geoJsonReducer } from "./reducers/geojson";

const rootReducer = combineReducers({ geoJson: geoJsonReducer });
export const store = createStore(rootReducer);
