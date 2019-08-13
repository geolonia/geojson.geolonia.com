import React from "react";
import styled from "styled-components";

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

type Props = {
  draft: string;
  disabled: boolean;
  onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
};

export const GeoJsonEditor: React.FC<Props> = props => {
  const { draft, disabled, onChange } = props;
  const displayValue = draft || "";

  return (
    <section
      style={{ width: "100%", height: "100%", border: "1px solid #ccc" }}
    >
      <TextArea
        error={false}
        style={{ width: "100%", height: "100%" }}
        name="geojson-editor"
        id="geojson-editor"
        value={displayValue}
        onChange={onChange}
        disabled={disabled}
      ></TextArea>
      <div></div>
    </section>
  );
};

export default GeoJsonEditor;
