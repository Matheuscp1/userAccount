import Routers from "./routes/index";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import AuthProvider from "./context/auth";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
