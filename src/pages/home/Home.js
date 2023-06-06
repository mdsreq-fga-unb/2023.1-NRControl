import "./Home.css";
import React from "react";
import logo from "./../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import {
  BsFillPersonPlusFill,
  BsFillPersonDashFill,
  BsPersonBadge,
  BsPersonFillGear,
} from "react-icons/bs";

function HomePage() {
  const navigate = useNavigate();
  const goToRegister = () => {
    navigate("/register");
  };
  return (
    <div className="main-home">
      <div className="sonda">
        <img src={logo} alt="logo" className="logo-img" />
        <div className="img-titulo">
          <h1>
            Sonda <br></br>Engenharia
          </h1>
        </div>
        <div className="sidebar">
          <div className="icons-sidebar">
            <BsFillPersonPlusFill onClick={goToRegister} />
            <BsFillPersonDashFill />
            <BsPersonFillGear />
            <BsPersonBadge />
          </div>
        </div>
      </div>
      <div className="main-card">
        <h1> Operários</h1>
        <div className="Tabela">
          <table>
            <tr>
              <td>Nome</td>
              <td>CPF</td>
            </tr>
            <tr>
              <td>TESTE</td>
              <td>123.456.789.00</td>
            </tr>
            <tr>
              <td>TESTE</td>
              <td>123.456.789.00</td>
            </tr>
            <tr>
              <td>TESTE</td>
              <td>123.456.789.00</td>
            </tr>
            <tr>
              <td>TESTE</td>
              <td>123.456.789.00</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
