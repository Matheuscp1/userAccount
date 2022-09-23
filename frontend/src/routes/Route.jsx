import { Navigate } from "react-router-dom";
import React from "react";
export default function RouteWrapper({ children, isPrivate }) {
  const loading = false;
  const signed = false;

  if (loading) {
    return <div></div>;
  }

  if (!signed && isPrivate) {
    return <Navigate to="/" />;
  }

  if (signed && !isPrivate) {
    return <Navigate to="/dashboard" />;
  }
  console.log(isPrivate)
  return children;
}
