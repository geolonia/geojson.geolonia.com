export type SimpleStyle = MarkerSize | Properties;
export enum MarkerSize {
  Small = "small",
  Medium = "medium",
  Large = "large"
}

export interface Properties {
  title?: string;
  description?: string;
  "marker-size"?: MarkerSize;
  "marker-symbol"?: string;
  "marker-color"?: string;
  stroke?: string;
  "stroke-opacity"?: number;
  "stroke-width"?: number;
  fill?: string;
  "fill-opacity"?: number;
}

export as namespace SimpleStyle;
