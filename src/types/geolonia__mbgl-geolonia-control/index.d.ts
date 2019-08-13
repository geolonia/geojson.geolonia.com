declare module "@geolonia/mbgl-geolonia-control" {
  class GeoloniaControl {
    constructor();
    onAdd(map: mapboxgl.Map): HTMLElement;
    onRemove(): void;
  }
  export default GeoloniaControl;
}
