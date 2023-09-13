import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import {Buffer} from 'buffer';
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

        if (decodedJwt.exp * 1000 < Date.now()) {
          window.confirm("Sua sessão expirou faça login novamente");
          setUser(null);
          setToken(null);
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
      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem("SystemUser", JSON.stringify(response.data));

      toast.success("Bem vindo!");
    } catch (error) {
      if (error.message === "timeout of 1000ms exceeded")
        toast.error("Erro interno do servidor");
      else toast.error(error.response.data);
      setLoadingAuth(false);
    }
    setLoadingAuth(false);
  };

  const logout = () => {
    localStorage.removeItem("SystemUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user: user,
        signIn,
        loading,
        token,
        loadingAuth,
        logout,
        setUser,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;