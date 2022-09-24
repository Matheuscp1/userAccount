import Routers from "./routes/index";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { BrowserRouter } from "react-router-dom";
import React from "react";
import AuthProvider from "./context/auth";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer autoClose={3000} />
        <Routers />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
