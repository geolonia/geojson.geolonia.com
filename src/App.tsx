import React from "react";
import "./App.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Header from "./components/header";
import Map from "./components/map";
import GeoJsonEditor from "./components/geojson-editor";
import Footer from "./components/footer";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  box-sizing: border-box;
  padding-top: 30px;
  padding-bottom: 30px;
`;

const App: React.FC = () => {
  return (
    <div className="App">
      <Header></Header>
      <AppContainer>
        <Map></Map>
        <GeoJsonEditor></GeoJsonEditor>
      </AppContainer>
      <Footer></Footer>
    </div>
  );
};

export default App;
