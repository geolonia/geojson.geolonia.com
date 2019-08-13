declare module "@mapbox/geojson-extent" {
  declare function GeoJsonExtent(json: any): mapboxgl.LngLatBounds;
  export default GeoJsonExtent;
}
