import React, { useContext } from "react";
import { AuthContext } from "../../context/auth";
import Header from "../../components/Header/"
function Dashboard(props) {
  const { signed, loading, user, logout } = useContext(AuthContext);
  return (
    <div>
      <Header></Header>
      <h1>Pagina de dash {user.email}</h1>
      <button onClick={logout}>sair</button>
    </div>
  );
}

export default Dashboard;
