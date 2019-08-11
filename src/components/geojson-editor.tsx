import React, { useState, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { AppState } from "../store";
import { createActions as createGeoJsonActions } from "../store/reducers/geojson";
import { Dispatch } from "redux";
import styled from "styled-components";
import { asyncLocalStorage } from "../lib/local-storage";

const TextArea = styled.textarea<{ error: boolean }>`
  ${props => (props.error ? "outline-color: red" : "")};
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
  updateDraft: (draft: string) => {
    asyncLocalStorage.setItem("geojson-draft", draft);
    dispatch(createGeoJsonActions.updateDraft(draft));
  },
  fix: () => dispatch(createGeoJsonActions.fix())
});

export const GeoJsonEditor: React.FC = () => {
  const [disabled, setDisabled] = useState(true);
  const { draft, data, error } = useSelector(selectState, shallowEqual);
  const dispatch = useDispatch();
  const displayValue = draft || "";

  // auto save
  useEffect(() => {
    const timerId = setTimeout(() => delegateDispatch(dispatch).fix(), 2000);
    return () => clearTimeout(timerId);
  }, [dispatch, draft]);

  // localStorage
  useEffect(() => {
    asyncLocalStorage.getItem("geojson-draft").then(data => {
      if (data !== null) {
        delegateDispatch(dispatch).updateDraft(data);
      } else {
        delegateDispatch(dispatch).updateDraft(
          '{ "type": "FeatureCollection", "features": [] }'
        );
      }
      setDisabled(false);
    });
  }, [dispatch]);

  return (
    <section
      style={{ width: "100%", height: "100%", border: "1px solid #ccc" }}
    >
      <TextArea
        error={!!error}
        style={{ width: "100%", height: "100%" }}
        name="geojson-editor"
        id="geojson-editor"
        value={displayValue}
        onChange={e => delegateDispatch(dispatch).updateDraft(e.target.value)}
        disabled={disabled}
      ></TextArea>
      <div></div>
    </section>
  );
};

export default GeoJsonEditor;
