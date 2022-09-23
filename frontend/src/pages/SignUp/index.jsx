import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import api, { viaCepApi } from "../../services/api";
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
  async function onBlur(e) {
    console.log();
    switch (e.target.name) {
      case "zipCode":
        try {
          let reponse = await viaCepApi.get(`${zipCode}/json`);
          console.log(reponse.data);
          const {
            logradouro,
            complemento,
            bairro,
            localidade,
            uf,
          } = reponse.data;
          setPublicPlace(logradouro);
          setComplement(complemento);
          setDistrict(bairro);
          setLocality(localidade);
          setUf(uf);
          document.getElementById("error").innerText = "";
        } catch (error) {
          setPublicPlace("");
          setComplement("");
          setDistrict("");
          setLocality("");
          setUf("");
          document.getElementById("error").innerText = "Cep não encontrado";
        }
        break;

      default:
        break;
    }
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
              required
              type="text"
              placeholder="Nome"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              required
              type="text"
              placeholder="Nome de Usuário"
              name="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              required
              type="text"
              placeholder="CPF"
              name="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
            <input
              required
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              required
              type="password"
              placeholder="Senha"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              required
              type="text"
              placeholder="Cep"
              name="zipCode"
              onBlur={onBlur}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
            <input
              required
              data-readonly
              type="text"
              placeholder="Logradouro"
              name="publicPlace"
              value={publicPlace}
              onChange={(e) => setPublicPlace(e.target.value)}
            />

            <input
              type="text"
              placeholder="Complemento"
              name="complement"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />

            <input
              required
              data-readonly
              type="text"
              placeholder="Bairro"
              name="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />

            <input
              required
              data-readonly
              type="text"
              placeholder="Localidade"
              name="locality"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
            />

            <input
              required
              data-readonly
              type="text"
              placeholder="UF"
              name="uf"
              value={uf}
              onChange={(e) => e}
            />
            <span style={{ color: "red", margin: "10px" }} id="error"></span>
          </div>

          <button type="submit">Acessar</button>
        </form>

        <Link to="/">Login</Link>
      </div>
    </div>
  );
}

export default SignUp;
