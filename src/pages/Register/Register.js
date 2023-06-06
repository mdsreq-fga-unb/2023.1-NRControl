import "./Register.css";
import React from "react";
import logo from "./../../assets/images/logo.png";
import InputMask from "react-input-mask";
import { useNavigate } from "react-router-dom";

function RegisterWorker() {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/home");
  };

  return (
    <div className="page">
      <div className="sonda">
        <img src={logo} alt="logo" onClick={goToHome} className="logo-img" />
        <div className="img-titulo">
          <h1>
            Sonda <br></br>Engenharia
          </h1>
        </div>
        <div className="sidebar">
          <div className="icons-sidebar"></div>
        </div>
      </div>

      <div className="container">
        <h1>Cadastrar Funcionário</h1>
        <div className="box-main">
          <div className="left-card">
            <InputMask mask="999.999.999-99" placeholder="CPF" />
            <input type="text" placeholder="Nome completo" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Endereço" />
          </div>
          <div className="right-card">
            <InputMask
              mask="(99)99999-9999"
              type="text"
              placeholder="Telefone"
            />
            <label for="Data" className="Date_nas">
              Data de Nascimento
            </label>
            <input type="date" />
            <label for="Data" className="Date_add">
              Data de Admissão
            </label>
            <input type="date" placeholder="Data de Admissão" />
            <label for="Data" className="Date_Aso">
              Data de ASO
            </label>
            <input type="date" placeholder="Data de ASO" />
          </div>
        </div>
        <button className="cadastrar">Cadastrar</button>
      </div>
    </div>
  );
}

export default RegisterWorker;
