import React, { useContext } from "react";
import "./header.css";
import { AuthContext } from "../../context/auth";
import avatar from "../../assets/avatar.png";

import { NavLink } from "react-router-dom";
import { FiHome, FiUser, FiSettings } from "react-icons/fi";

export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div>
        <img src={avatar} alt="Foto avatar" />
      </div>

      <NavLink to="/dashboard">
        <FiHome color="#FFF" size={24} />
        Chamados
      </NavLink>
      <NavLink to="/clients">
        <FiUser color="#FFF" size={24} />
        Clientes
      </NavLink>
      <NavLink to="/profile">
        <FiSettings color="#FFF" size={24} />
        Configurações
      </NavLink>
    </div>
  );
}
