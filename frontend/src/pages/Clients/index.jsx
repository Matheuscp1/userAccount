import React, { useContext, useState } from "react";
import "./clients.css";
import Title from "../../components/Title";
import Header from "../../components/Header";
import { FiUser } from "react-icons/fi";

import { toast } from "react-toastify";
import api, { viaCepApi } from "../../services/api";
import { AuthContext } from "../../context/auth";
import { isValidCPF } from "../../utils/cpfValidator";
import Input from "../../components/Input";

export default function Clients() {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState({ value: "", valid: null });

  const [zipCode, setZipCode] = useState({ value: "", valid: null });
  const [publicPlace, setPublicPlace] = useState("");
  const [complement, setComplement] = useState("");
  const [district, setDistrict] = useState("");
  const [locality, setLocality] = useState("");
  const [uf, setUf] = useState("");

  async function handleAdd(e) {
    e.preventDefault();
    try {
      let response = await api.post(
        "client",
        {
          cpf: cpf.value,
          name,
          zipCode: zipCode.value,
          publicPlace,
          complement,
          district,
          locality,
          uf,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setName("");
      setCpf({ value: "", valid: null });
      setZipCode({ value: "", valid: null });

      setPublicPlace("");
      setComplement("");
      setDistrict("");
      setLocality("");
      setUf("");

      toast.success("Cliente cadastrado");
    } catch (error) {
      if (error.message === "timeout of 1000ms exceeded") {
        toast.error("Erro interno do servidor");
      } else {
        if (error.response.data.includes("index_cpf")) {
          toast.error("Cpf já cadastrado");
        }
      }
    }
  }
  async function onBlur(e) {
    switch (e.target.name) {
      case "zipCode":
        try {
          let reponse = await viaCepApi.get(`${zipCode.value}/json`);
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
          setZipCode({
            valid: true,
            value: e.target.value,
          });
        } catch (error) {
          setPublicPlace("");
          setComplement("");
          setDistrict("");
          setLocality("");
          setUf({ value: "", valid: null });
          setZipCode({
            valid: false,
            value: e.target.value,
          });
          toast.error("Cep não encontrado");
        }
        break;
      case "cpf":
        setCpf({
          value: e.target.value,
          valid: isValidCPF(e.target.value),
        });

        if (cpf.valid == false) toast.error("Cpf invalído");

      default:
        break;
    }
  }
  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Clientes">
          <FiUser size={25} />
        </Title>

        <div className="container">
          <form className="form-profile customers" onSubmit={handleAdd}>
            <label>Nome do cliente</label>
            <input
              type="text"
              placeholder="Nome do cliente"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>CPF</label>
            <Input
              value={cpf.value}
              style={
                cpf.valid == null || cpf.valid
                  ? { borderColor: "green" }
                  : { border: " 1px solid red" }
              }
              name="cpf"
              onBlur={onBlur}
              onChange={(e) => {
                setCpf({
                  value: e.target.value,
                  valid: isValidCPF(e.target.value),
                });
              }}
              mask="cpf"
              placeholder="999.999.999-99"
              required
              maxLength="14"
            />

            <label>Cep</label>
            <input
              required
              maxLength={8}
              type="text"
              placeholder="Cep"
              name="zipCode"
              style={
                zipCode.valid == null || zipCode.valid == true
                  ? {}
                  : { border: " 1px solid red" }
              }
              onBlur={onBlur}
              value={zipCode.value}
              onChange={(e) =>
                setZipCode({
                  value: e.target.value.replace(/\D/g, ""),
                })
              }
            />
            <label>Logradouro</label>
            <input
              required
              data-readonly
              type="text"
              placeholder="Logradouro"
              name="publicPlace"
              value={publicPlace}
              onChange={(e) => setPublicPlace(e.target.value)}
            />
            <label>Complemento</label>
            <input
              type="text"
              placeholder="Complemento"
              name="complement"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
            />
            <label>Bairro</label>
            <input
              required
              data-readonly
              type="text"
              placeholder="Bairro"
              name="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
            <label>Localidade</label>
            <input
              required
              data-readonly
              type="text"
              placeholder="Localidade"
              name="locality"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
            />
            <label>UF</label>
            <input
              required
              data-readonly
              type="text"
              placeholder="UF"
              name="uf"
              value={uf}
              onChange={(e) => e}
            />
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
