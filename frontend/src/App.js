import Routers from "./routes";
import { BrowserRouter } from "react-router-dom";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Routers />
    </BrowserRouter>
  );
}

export default App;
