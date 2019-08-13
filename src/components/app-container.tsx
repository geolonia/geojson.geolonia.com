import React, { useState, useReducer, useEffect } from "react";
import Map from "./map";
import GeoJsonEditor from "./geojson-editor";
import styled from "styled-components";
import { asyncLocalStorage } from "../lib/local-storage";

// reducer
import {
  GeoJSONAction,
  createActions as createGeoJsonActions,
  reducer as geoJsonReducer,
  initialState as initialGeoJsonState
} from "../reducers/geojson";

// auto-bind action creators
const delegateDispatch = (dispatch: React.Dispatch<GeoJSONAction>) => ({
  updateDraft: (draft: string) => {
    asyncLocalStorage.setItem("geojson-draft", draft);
    dispatch(createGeoJsonActions.updateDraft(draft));
  },
  fix: () => dispatch(createGeoJsonActions.fix())
});

const StyledAppContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  box-sizing: border-box;
  padding-top: 30px;
  padding-bottom: 30px;
`;

export const AppContainer: React.FC = () => {
  const [disabled, setDisabled] = useState(true);

  const [geoJsonState, dispatch] = useReducer(
    geoJsonReducer,
    initialGeoJsonState
  );
  const { draft } = geoJsonState;

  // auto save
  // useEffect(() => {
  //   const timerId = setTimeout(() => delegateDispatch(dispatch).fix(), 2000);
  //   return () => clearTimeout(timerId);
  // }, [dispatch, draft]);

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

  const updateDraft = (draft: string) =>
    delegateDispatch(dispatch).updateDraft(draft);

  return (
    <StyledAppContainer>
      <Map draft={draft} disabled={disabled} updateDraft={updateDraft}></Map>
      <GeoJsonEditor
        draft={draft}
        disabled={disabled}
        updateDraft={updateDraft}
      ></GeoJsonEditor>
    </StyledAppContainer>
  );
};

export default AppContainer;
