import React from "react";
import "./App.css";
import Header from "./components/header";
import Map from "./components/map";
import GeoJsonEditor from "./components/geojson-editor";

const App: React.FC = () => {
  return (
    <div className="App">
      <Header></Header>
      <Map></Map>
      <GeoJsonEditor></GeoJsonEditor>
    </div>
  );
};

export default App;
