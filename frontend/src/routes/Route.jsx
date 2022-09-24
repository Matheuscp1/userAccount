import { Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
export default function RouteWrapper({ children, isPrivate }) {
  const { signed, loading } = useContext(AuthContext);

  if (loading) {
    return <div></div>;
  }

  if (!signed && isPrivate) {
    return <Navigate to="/" />;
  }

  if (signed && !isPrivate) {
    return <Navigate to="/dashboard" />;
  }
  console.log(isPrivate);
  return children;
}
