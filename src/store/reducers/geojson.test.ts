import { reducer, createActions, GeoJsonState } from "./geojson";

test("reducer for update action", () => {
  const prevState: GeoJsonState = {
    data: { type: "FeatureCollection", features: [] }
  };
  const geoJson: GeoJSON.GeoJSON = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Point",
          coordinates: []
        }
      }
    ]
  };
  const action = createActions.update(geoJson);
  const nextState = reducer(prevState, action);
  expect(nextState.data.features).toHaveLength(1);
});
