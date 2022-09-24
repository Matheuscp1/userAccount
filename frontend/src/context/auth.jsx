import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStorage = () => {
      const storageUser = localStorage.getItem("SystemUser");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);
    };
    loadStorage();
  }, []);

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
      document.getElementById("error").innerText = error.response.data;
      console.log("so erro de msg", error.response.data);
      setLoadingAuth(false);
    }
    setLoadingAuth(false);
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
