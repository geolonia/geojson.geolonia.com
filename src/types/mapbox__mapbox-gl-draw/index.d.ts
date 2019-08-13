// Type definitions for @mapbox/mapbox-gl-draw 1.1.2
// Project: https://github.com/mapbox/mapbox-gl-draw
// Definitions by: Kamata Ryo <https://github.com/kamataryo>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.5.3

declare module "@mapbox/mapbox-gl-draw" {
  const DRAW_LINE_STRING = "draw_line_string";
  const DRAW_POLYGON = "draw_polygon";
  const DRAW_POINT = "draw_point";
  const SIMPLE_SELECT = "simple_select";
  const DIRECT_SELECT = "direct_select";
  const STATIC = "static";

  type Mode =
    | typeof DRAW_LINE_STRING
    | typeof DRAW_POLYGON
    | typeof DRAW_POINT
    | typeof SIMPLE_SELECT
    | typeof DIRECT_SELECT
    | typeof STATIC;

  type options = {
    defaultMode?: Mode = typeof SIMPLE_SELECT;
    keybindings?: boolean = true;
    touchEnabled?: boolean = true;
    clickBuffer?: number = 2;
    touchBuffer?: number = 25;
    boxSelect?: boolean = true;
    displayControlsDefault?: boolean = true;
    styles: mapboxgl.Style[];
    modes?: function[] = [];
    controls: {
      point: boolean;
      line_string: boolean;
      polygon: boolean;
      trash: boolean;
      combine_features: boolean;
      uncombine_features: boolean;
    };
    userProperties?: boolean = false;
    boxSelect: boolean;
    userProperties: boolean;
  };

  class MapboxDraw {
    constructor(options: options);
    onAdd(map: mapboxgl.Map): HTMLElement;
    onRemove(): void;
    deleteAll(): MapboxDraw;
    set(json: GeoJSON.FeatureCollection<GeoJSON.Geometry>): void;
    getAll(): GeoJSON.FeatureCollection<GeoJSON.Geometry>;
  }

  export default MapboxDraw;
}
