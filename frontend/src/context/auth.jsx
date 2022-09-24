import React, { createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../services/api";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorage = () => {
      const storageUser = localStorage.getItem("SystemUser");
      if (storageUser) {
        const { token, user } = JSON.parse(storageUser);
        setUser(user);
        setToken(token);
        setLoading(false);
        const decodedJwt = parseJwt(token);
        console.log("token ae", decodedJwt.exp * 1000 < Date.now());
        if (decodedJwt.exp * 1000 < Date.now()) {
          window.confirm("Sua sessão expirou faça login novamente");
          setUser(null);
          logout();
        }
      }

      setLoading(false);
    };
    loadStorage();
  }, []);

  const parseJwt = (token) => {
    try {
      return JSON.parse(Buffer.from(token.split(".")[1], "base64"));
    } catch (e) {
      return null;
    }
  };
  const signIn = async (emailOrUser, password) => {
    setLoadingAuth(true);
    try {
      let response = await api.post("login", {
        emailOrUser,
        password,
      });
      setUser(response.data);
      localStorage.setItem("SystemUser", JSON.stringify(response.data));
      console.log("enviado", response.data);
    } catch (error) {
      console.log(error.message);
      if (error.message === "timeout of 1000ms exceeded")
        document.getElementById("error").innerText = "Erro interno do servidor";
      else document.getElementById("error").innerText = error.response.data;
      setLoadingAuth(false);
    }
    setLoadingAuth(false);
  };

  const logout = () => {
    localStorage.removeItem("SystemUser");
    return <Navigate to="/dashboard" />;
  };

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user: user, signIn, loading, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
