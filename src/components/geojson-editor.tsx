import React, { useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { AppState } from "../store";
import { createActions as createGeoJsonActions } from "../store/reducers/geojson";
import { Dispatch } from "redux";

// state selector
const selectState = (state: AppState) => state.geoJson;

// auto-bind action creators
const delegateDispatch = (dispatch: Dispatch<any>) => ({
  updateDraft: (draft: string) =>
    dispatch(createGeoJsonActions.updateDraft(draft)),
  fix: () => dispatch(createGeoJsonActions.fix())
});

export const GeoJsonEditor: React.FC = () => {
  const { draft, data, error } = useSelector(selectState, shallowEqual);
  const dispatch = useDispatch();
  const displayValue = draft || JSON.stringify(data);

  // auto save
  useEffect(() => {
    const timerId = setTimeout(() => delegateDispatch(dispatch).fix(), 2000);
    return () => clearTimeout(timerId);
  }, [dispatch, draft]);

  return (
    <section>
      <textarea
        name="geojson-editor"
        id="geojson-editor"
        value={displayValue}
        onChange={e => delegateDispatch(dispatch).updateDraft(e.target.value)}
      ></textarea>
      <div>
        <button onClick={() => delegateDispatch(dispatch).fix()}>
          {"fix"}
        </button>
        <div>{error && <span>{"error"}</span>}</div>
      </div>
    </section>
  );
};

export default GeoJsonEditor;
