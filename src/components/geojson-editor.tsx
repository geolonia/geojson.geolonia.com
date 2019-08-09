import React, { useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { AppState } from "../store";
import { createActions as createGeoJsonActions } from "../store/reducers/geojson";
import { Dispatch } from "redux";
import styled from "styled-components";

const TextArea = styled.textarea`
  border: none;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  resize: none;
  padding: 8px;
  font-family: Courier New, Consolas, monospace;
  font-size: 14px;
  color: #2b2b2b;
`;

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
    <section
      style={{ width: "100%", height: "100%", border: "1px solid #ccc" }}
    >
      <TextArea
        style={{ width: "100%", height: "100%" }}
        name="geojson-editor"
        id="geojson-editor"
        value={displayValue}
        onChange={e => delegateDispatch(dispatch).updateDraft(e.target.value)}
      ></TextArea>
      <div>
        <div>{error && <span>{"error"}</span>}</div>
      </div>
    </section>
  );
};

export default GeoJsonEditor;
