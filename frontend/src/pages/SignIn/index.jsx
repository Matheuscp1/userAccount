import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import "./signin.css";
import logo from "../../assets/logo.png";

import { AuthContext } from "../../context/auth";
function SignIn() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    signIn(email, password);
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Sistema Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <input
            type="text"
            placeholder="Email ou nome de usuário"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span style={{ color: "red", margin: "10px" }} id="error">
            {" "}
          </span>
          <button type="submit">Acessar</button>
        </form>

        <Link to="/register">Criar uma conta</Link>
      </div>
    </div>
  );
}

export default SignIn;
