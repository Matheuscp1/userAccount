import { Routes, Route } from "react-router-dom";
import React, { Profiler } from "react";
import Router from "./Route";

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Clients from "../pages/Clients";
import New from "../pages/New";

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
      <Route
        exact
        path="/dashboard"
        element={
          <Router isPrivate>
            <Dashboard></Dashboard>
          </Router>
        }
      />

      <Route
        exact
        path="/profile"
        element={
          <Router isPrivate>
            <Profile></Profile>
          </Router>
        }
      />
      <Route
        exact
        path="/clients"
        element={
          <Router isPrivate>
            <Clients></Clients>
          </Router>
        }
      />

      <Route
        exact
        path="/new"
        element={
          <Router isPrivate>
            <New></New>
          </Router>
        }
      />

      <Route
        exact
        path="*"
        element={
          <Router>
            <SignIn></SignIn>
          </Router>
        }
      />
    </Routes>
  );
}
