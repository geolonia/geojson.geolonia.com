import React, { useState } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { AppState } from "../store";
import { createActions as createGeoJsonActions } from "../store/reducers/geojson";

export const GeoJsonEditor: React.FC = () => {
  const value = useSelector(
    (state: AppState) => state.geoJson.data,
    shallowEqual
  );
  const dispatch = useDispatch();
  const dispatchSetValueWithText = (text: string) => {
    try {
      const value = JSON.parse(text);
      dispatch(createGeoJsonActions.update(value));
    } catch (e) {
      return;
    }
  };
  const [editingText, setEditing] = useState<string | false>(false);

  const displayValue = editingText || JSON.stringify(value);

  return (
    <textarea
      name="geojson-editor"
      id="geojson-editor"
      value={displayValue}
      onFocus={() => setEditing(displayValue)}
      onChange={e => setEditing(e.target.value)}
      onBlur={e => {
        dispatchSetValueWithText(e.target.value);
        setEditing(false);
      }}
    ></textarea>
  );
};

export default GeoJsonEditor;
