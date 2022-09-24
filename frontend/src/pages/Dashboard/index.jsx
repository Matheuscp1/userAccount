import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";

function Dashboard(props) {
  const { signed, loading, user } = useContext(AuthContext);
  return (
    <div>
      <h1>TELA DE CADASTRO {user.email}</h1>
    </div>
  );
}

export default Dashboard;
