import React from "react";
import "./App.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Header from "./components/header";
import AppContainer from "./components/app-container";
import Footer from "./components/footer";

// // ===== debug =====
// // @ts-ignore
// console.warn = () => {};
// // @ts-ignore
// console.error = (x: any) => {
//   if (x.message === "Failed to fetch") {
//     return void 0;
//   } else {
//     console.log(x);
//   }
// };

export const App: React.FC = () => {
  return (
    <div className="App">
      <Header></Header>
      <AppContainer></AppContainer>
      <Footer></Footer>
    </div>
  );
};

export default App;
