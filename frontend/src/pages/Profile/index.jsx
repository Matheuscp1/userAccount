import "./profile.css";
import Header from "../../components/Header";
import Title from "../../components/Title";
import React, { useContext, useState } from "react";
import { FiSettings, FiUpload } from "react-icons/fi";
import { AuthContext } from "../../context/auth";

export default function Profile() {
  const { user, logout } = useContext(AuthContext);

  const [nome, setNome] = useState(user && user.name);
  console.log(user);
  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Meu perfil">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile">
            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
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
