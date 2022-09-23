import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";

import logo from "../../assets/logo.png";

function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");

  const [zipCode, setZipCode] = useState("");
  const [publicPlace, setPublicPlace] = useState("");
  const [complement, setComplement] = useState("");
  const [district, setDistrict] = useState("");
  const [locality, setLocality] = useState("");
  const [uf, setUf] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    alert("CLICOU");
  }

  return (
    <div className="container-center">
      <div className="create">
        <div className="login-area">
          <img src={logo} alt="Sistema Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Criar uma conta</h1>
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            <input
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nome de Usuário"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              type="text"
              placeholder="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <input
              type="text"
              placeholder="email@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Cep"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            <input
              type="text"
              placeholder="Logradouro"
              value={publicPlace}
              onChange={(e) => setPublicPlace(e.target.value)}
            />

            <input
              type="text"
              placeholder="Complemento"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />

            <input
              type="text"
              placeholder="Bairro"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />

            <input
              type="text"
              placeholder="Localidade"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
            />

            <input
              type="text"
              placeholder="UF"
              value={uf}
              onChange={(e) => setUf(e.target.value)}
            />
          </div>

          <button type="submit">Acessar</button>
        </form>

        <Link to="/">Login</Link>
      </div>
    </div>
  );
}

export default SignUp;
