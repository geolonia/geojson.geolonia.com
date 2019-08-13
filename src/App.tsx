import React from "react";
import "./App.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import AppContainer from "./components/app-container";

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
      <AppContainer></AppContainer>
    </div>
  );
};

export default App;
