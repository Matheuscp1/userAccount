import { Routes, Route } from "react-router-dom";
import React from "react";
import Router from "./Route";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

import Dashboard from "../pages/Dashboard";

export default function Routers() {
  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <Router>
            <SignIn></SignIn>
          </Router>
        }
      />
      <Route
        exact
        path="/register"
        element={
          <Router>
            <SignUp></SignUp>
          </Router>
        }
      />
    </Routes>
  );
}
