import React from "react";
import "./header.css";
import logo from "./../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigateTo = useNavigate();

    const goToEmployees = () => {
        navigateTo("/employees");
      };
    
  return (
    <>
      <header className="header">
        <div className="logo">
          <img src={logo} alt="SONDA Engenharia" className="sonda" onClick={goToEmployees}/>
        </div>
        <nav className="nav-links">
          <ul>
            <li>
              <a href="/cursos">Adicionar curso</a>
            </li>
            <li>
              <a href="/register">Adicionar operário</a>
            </li>
            <li>
              <a href="/listadecursos">Lista de cursos</a>
            </li>
            <li>
              <a href="/employees">Lista de operários</a>
            </li>
            <li>
              <a href="/enviaremail">Enviar e-mail</a>
            </li>
          </ul>
        </nav>
      </header>
      <div className="content">
        {/* Conteúdo principal da página */}
      </div>
    </>
  );
}

export default Header;
