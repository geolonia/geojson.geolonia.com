export type GeoJsonState = {
  data: GeoJSON.GeoJSON;
};

const UpdateGeoJsonType = "@geojson.geolonia.com/GeoJSON/update";

type UpdateGeoJsonAction = {
  type: typeof UpdateGeoJsonType;
  payload: {
    geojson: GeoJSON.GeoJSON;
  };
};

type GeoJSONAction = UpdateGeoJsonAction;

const isUpdateAction = (action: GeoJSONAction): action is UpdateGeoJsonAction =>
  action.type === UpdateGeoJsonType;

const initialState: GeoJsonState = {
  data: { type: "FeatureCollection", features: [] }
};

export const createActions = {
  update: (geojson: GeoJSON.GeoJSON): UpdateGeoJsonAction => ({
    type: UpdateGeoJsonType,
    payload: { geojson }
  })
};

export const reducer = (
  state = initialState,
  action: GeoJSONAction
): GeoJsonState => {
  if (isUpdateAction(action)) {
    const { geojson } = action.payload;
    return { data: geojson };
  } else {
    return state;
  }
};
