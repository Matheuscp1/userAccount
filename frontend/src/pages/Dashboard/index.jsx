import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth";
import Header from "../../components/Header/";
import Title from "../../components/Title";
import "./dashboard.css";
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";

function Dashboard(props) {
  const { token } = useContext(AuthContext);
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();
  useEffect(() => {
    loadChamados();

    return () => {};
  }, []);

  async function loadChamados() {
    try {
      let response = await api.get("called", {
        headers: { Authorization: `Bearer ${token}` },
      });
      let lista = [];
      response.data.map((e) => {
        lista.push({
          id: e.id,
          name: e.clientId.name,
          complement: e.complement,
          createdDate: new Date(e.createdDate).toLocaleDateString("pt-br", {
            minute: "2-digit",
            hour: "2-digit",
          }),
          status: e.status,
          subject: e.subject,
        });
      });

      if (lista.length === 0) {
        toast.error("Você deve cadastrar um novo chamado");
        setChamados([]);
        setLoading(false);
        return;
      }
      setChamados(lista);
      setLoading(false);
    } catch (error) {
      toast.error("Algo deu errado");
      setLoading(false);
      setChamados([]);
    }
  }

  function togglePostModal(item) {
    setShowPostModal(!showPostModal); //trocando de true pra false
    setDetail(item);
  }
  if (loading) {
    return (
      <div>
        <Header />

        <div className="content">
          <Title name="Atendimentos">
            <FiMessageSquare size={25} />
          </Title>

          <div className="container dashboard">
            <span>Buscando chamados...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Atendimentos">
          <FiMessageSquare size={25} />
        </Title>

        {chamados.length === 0 ? (
          <div className="container dashboard">
            <span>Nenhum chamado registrado...</span>

            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>
          </div>
        ) : (
          <>
            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>

            <table>
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cadastrado em</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                {chamados.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td data-label="Cliente">{item.name}</td>
                      <td data-label="Assunto">{item.subject}</td>
                      <td data-label="Status">
                        <span
                          className="badge"
                          style={{
                            backgroundColor:
                              item.status === "Aberto" ? "#5cb85c" : "#999",
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td data-label="Cadastrado">{item.createdDate}</td>
                      <td data-label="#">
                        <button
                          className="action"
                          style={{ backgroundColor: "#3583f6" }}
                        >
                          <FiSearch
                            color="#FFF"
                            size={17}
                            onClick={() => togglePostModal(item)}
                          />
                        </button>
                        <Link
                          className="action"
                          style={{ backgroundColor: "#F6a935" }}
                          to={`/new/${item.id}`}
                        >
                          <FiEdit2 color="#FFF" size={17} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>

      {showPostModal && <Modal conteudo={detail} close={togglePostModal} />}
    </div>
  );
}
export default Dashboard;
