import "./Home.css";
import React from "react";
import logo from "./../../assets/images/logo.png";
import InputMask from "react-input-mask";

function HomePage() {
  return (
    <div className="page">
      <div className="header">
        <img src={logo} alt="logo" className="sonda" />
        <h1>
          Sonda <br></br>Engenharia
        </h1>
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

export default HomePage;
