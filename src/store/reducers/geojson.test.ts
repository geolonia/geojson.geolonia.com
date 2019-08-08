import { reducer, createActions, GeoJsonState } from "./geojson";

test("reducer of update action", () => {
  const prevState: GeoJsonState = {
    draft: "",
    data: { type: "FeatureCollection", features: [] },
    error: false
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

test("reducer of update draft action", () => {
  const prevState: GeoJsonState = {
    draft: "",
    data: { type: "FeatureCollection", features: [] },
    error: false
  };
  const action = createActions.updateDraft("hello");
  const nextState = reducer(prevState, action);
  expect(nextState.draft).toBe("hello");
});

test("reducer of fix action", () => {
  const prevState: GeoJsonState = {
    draft: JSON.stringify({
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
    }),
    data: { type: "FeatureCollection", features: [] },
    error: new Error("some error")
  };
  const action = createActions.fix();
  const nextState = reducer(prevState, action);
  expect(nextState.draft).toBe("");
  expect(nextState.data.features).toHaveLength(1);
  expect(nextState.error).toBe(false);
});

test("reducer of fix action failure case", () => {
  const prevState: GeoJsonState = {
    draft: "not parsable json",
    data: { type: "FeatureCollection", features: [] },
    error: false
  };
  const action = createActions.fix();
  const nextState = reducer(prevState, action);
  expect(nextState.draft).toBe(prevState.draft);
  expect(nextState.data).toBe(prevState.data);
  expect(nextState.error).toBeInstanceOf(Error);
});

test("reducer of fix action with default draft value", () => {
  const prevState: GeoJsonState = {
    draft: "",
    data: { type: "FeatureCollection", features: [] },
    error: false
  };
  const action = createActions.fix();
  const nextState = reducer(prevState, action);
  expect(nextState.draft).toBe(prevState.draft);
  expect(nextState.data).toBe(prevState.data);
  expect(nextState.error).toBe(false);
});
