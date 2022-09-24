import "./profile.css";
import Header from "../../components/Header";
import Title from "../../components/Title";
import React, { useContext, useState } from "react";
import { FiSettings, FiUpload } from "react-icons/fi";
import { AuthContext } from "../../context/auth";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function Profile() {
  const { user, logout, setUser, setToken, token } = useContext(AuthContext);

  const [name, setName] = useState(user && user.name);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let response = await api.put(
        "update",
        {
          name,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      let data = {
        ...user,
        name,
      };
      setUser(data);
      setToken(response.data.token);
      localStorage.setItem(
        "SystemUser",
        JSON.stringify({ token: response.data.token, user: data })
      );
      toast.success("Usuário editado com sucesso");
    } catch (error) {
      if (error.message === "timeout of 1000ms exceeded") {
        toast.error("Erro interno do servidor");
      }
    }
  }
  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Meu perfil">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSubmit}>
            <label>Nome</label>
            <input
              maxLength={100}
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Nome de usuário</label>
            <input type="text" value={user.userName} disabled={true} />

            <label>Email</label>
            <input type="text" value={user.email} disabled={true} />

            <label>Cpf</label>
            <input type="text" value={user.cpf} disabled={true} />

            <button type="submit">Salvar</button>
          </form>
        </div>

        <div className="container">
          <button className="logout-btn" onClick={logout}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
