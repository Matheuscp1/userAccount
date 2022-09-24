
import { useContext } from 'react';
import { AuthContext } from '../../context/auth';
import React from "react";
import Header from '../../components/Header';

export default function Dashboard(){
  const { logout } = useContext(AuthContext);

  return(
    <div>
      <Header/>

      <h1>PAGINA DASHBOARD</h1>
      <button onClick={logout}>Fazer logout</button>
    </div>
  )
}