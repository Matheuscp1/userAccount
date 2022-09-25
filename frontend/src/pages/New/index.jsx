import React, { useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import "./new.css";
import { FiPlusCircle } from "react-icons/fi";
import { AuthContext } from "../../context/auth";
import api from "../../services/api";
import { toast } from "react-toastify";

export default function New() {
  const [loadCustomers, setLoadCustomers] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [customerSelected, setCustomerSelected] = useState(0);

  const [subject, setSubject] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");
  const [complement, setComplement] = useState("");

  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    async function loadCustomers() {
      try {
        let response = await api.get("client", {
          headers: { Authorization: `Bearer ${token}` },
        });
        let lista = [];
        response.data.map((e) => {
          lista.push({ id: e.id, name: e.name });
        });

        if (lista.length === 0) {
          toast.error(
            "Você deve cadastrar um cliente para fazer um novo chamado"
          );
          setCustomers([]);
          setLoadCustomers(false);
          return;
        }

        setCustomers(lista);
        console.log(customers);
        setLoadCustomers(false);
        setCustomerSelected(response.data[0].id);
      } catch (error) {
        toast.error("Algo deu errado");
        setLoadCustomers(false);
        setCustomers([]);
      }
    }

    loadCustomers();
  }, []);

  async function handleRegister(e) {
    e.preventDefault();
    try {
      let response = await api.post(
        "called",
        {
          name: customers[customerSelected].name,
          clientId: customers[customerSelected].id,
          subject,
          status,
          complement,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Chamado criado!");
      setComplement("");
    } catch (error) {
      toast.error("Algo deu errado!");
    }
  }

  //Chamado quando troca o assunto
  function handleChangeSelect(e) {
    setSubject(e.target.value);
  }

  //Chamado quando troca o status
  function handleOptionChange(e) {
    setStatus(e.target.value);
  }

  //Chamado quando troca de cliente
  function handleChangeCustomers(e) {
    setCustomerSelected(e.target.value);
    console.log(customerSelected);
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Novo chamado">
          <FiPlusCircle size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Cliente</label>

            {loadCustomers ? (
              <input
                type="text"
                disabled={true}
                value="Carregando clientes..."
              />
            ) : (
              <select
                required
                value={customerSelected}
                onChange={handleChangeCustomers}
              >
                {customers.map((item, index) => {
                  return (
                    <option key={item.id} value={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            )}

            <label>Assunto</label>
            <select value={subject} onChange={handleChangeSelect}>
              <option value="Suporte">Suporte</option>
              <option value="Visita Tecnica">Visita Tecnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Aberto"
                onChange={handleOptionChange}
                checked={status === "Aberto"}
              />
              <span>Em Aberto</span>

              <input
                type="radio"
                name="radio"
                value="Progresso"
                onChange={handleOptionChange}
                checked={status === "Progresso"}
              />
              <span>Progresso</span>

              <input
                type="radio"
                name="radio"
                value="Atendido"
                onChange={handleOptionChange}
                checked={status === "Atendido"}
              />
              <span>Atendido</span>
            </div>

            <label>Complemento</label>
            <textarea
              type="text"
              placeholder="Descreva seu problema (opcional)."
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />

            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
