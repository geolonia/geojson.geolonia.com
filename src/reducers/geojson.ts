export type GeoJsonState = {
  draft: string;
  data: GeoJSON.FeatureCollection<GeoJSON.Geometry>;
  error: false | Error;
};

const UpdateGeoJsonType = "@geojson.geolonia.com/GeoJSON/update";
const UpdateDraftType = "@geojson.geolonia.com/GeoJSON/updateDraft";
const FixType = "@geojson.geolonia.com/GeoJSON/fix";

type UpdateGeoJsonAction = {
  type: typeof UpdateGeoJsonType;
  payload: {
    geojson: GeoJSON.FeatureCollection<GeoJSON.Geometry>;
  };
};

type UpdateDraftAction = {
  type: typeof UpdateDraftType;
  payload: {
    draft: string;
  };
};

type FixAction = {
  type: typeof FixType;
  payload: {};
};

export type GeoJSONAction = UpdateGeoJsonAction | UpdateDraftAction | FixAction;

const isUpdateAction = (action: GeoJSONAction): action is UpdateGeoJsonAction =>
  action.type === UpdateGeoJsonType;
const isUpdateDraftAction = (
  action: GeoJSONAction
): action is UpdateDraftAction => action.type === UpdateDraftType;
const isFixAction = (action: GeoJSONAction): action is FixAction =>
  action.type === FixType;

export const initialState: GeoJsonState = {
  draft: "",
  data: { type: "FeatureCollection", features: [] },
  error: false
};

export const createActions = {
  update: (
    geojson: GeoJSON.FeatureCollection<GeoJSON.Geometry>
  ): UpdateGeoJsonAction => ({
    type: UpdateGeoJsonType,
    payload: { geojson }
  }),
  updateDraft: (draft: string): UpdateDraftAction => ({
    type: UpdateDraftType,
    payload: { draft }
  }),
  fix: (): FixAction => ({ type: FixType, payload: {} })
};

export const reducer = (
  state = initialState,
  action: GeoJSONAction
): GeoJsonState => {
  if (isUpdateAction(action)) {
    const { geojson } = action.payload;
    return { ...state, data: geojson };
  } else if (isUpdateDraftAction(action)) {
    const { draft } = action.payload;
    return { ...state, draft };
  } else if (isFixAction(action)) {
    const { draft } = state;
    if (draft === "") {
      return state;
    }
    try {
      const geojson = JSON.parse(draft);
      return { ...state, draft: "", data: geojson, error: false };
    } catch (error) {
      return { ...state, error };
    }
  } else {
    return state;
  }
};
