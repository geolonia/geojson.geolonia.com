import React from "react";
type Props = {
  src: GeoJSON.Feature<GeoJSON.Geometry>;
};

export const Feature: React.FC<Props> = (props: Props) => {
  const { properties } = props.src;

  return null;
};
