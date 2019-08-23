const simpleStyleKeys = [
  // "title",
  // "description",
  "marker-size",
  "marker-symbol",
  "marker-color",
  "stroke",
  "stroke-opacity",
  "stroke-width",
  "fill",
  "fill-opacity"
];

export const createFeaturePropertyTableHTML = (
  feature: GeoJSON.Feature<GeoJSON.Geometry>
): string => {
  const properties = feature.properties || {};

  const styles = simpleStyleKeys.reduce((prev, key) => {
    // @ts-ignore
    prev[key] = "";
    return prev;
  }, {});
  const props = { title: "", description: "" };

  Object.keys(properties).forEach(key => {
    if (key in simpleStyleKeys) {
      // @ts-ignore
      styles[key] = properties[key];
    } else {
      // @ts-ignore
      props[key] = properties[key];
    }
  });

  return `
  <div class="tab-wrap">
    <input type="radio" id="style" name="tab-items" checked>
    <label class="tab-label" for="style">Simplestyle</label>
    <input type="radio" id="props" name="tab-items">
    <label class="tab-label" for="props">User props</label>

    <table class="tab-content" id="style-content">
    ${Object.keys(styles)
      .map(
        key =>
          // @ts-ignore
          `<tr><td>${key}</td><td><input type="text" value="${styles[key]}"></td></tr>`
      )
      .join("")}
    </table>

    <table class="tab-content" id="props-content">
    ${Object.keys(props)
      .map(
        key =>
          // @ts-ignore
          `<tr><td>${key}</td><td><input type="text" value="${props[key]}"></td></tr>`
      )
      .join("")}
    </table>
  </div>`;
};
