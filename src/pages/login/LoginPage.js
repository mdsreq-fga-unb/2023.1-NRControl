import "./LoginPage.css";
import capa from "./../../assets/images/certo.png";
import logo from "./../../assets/images/logo.png";
import { AiOutlineSend } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [inputVisible, setInputVisible] = useState(false);
  const HandleClick = () => {
    setInputVisible(true);
  };

  const navigate = useNavigate();
  const goToHomePage = () => {
    navigate("/Home");
  };

  return (
    <div className="main-login">
      <div className="left-login">
        <h1>
          Sonda <br></br>Engenharia
        </h1>
        <img src={capa} alt="equipe" className="img" />
      </div>
      <div className="sonda">
        <img src={logo} alt="logo" />
      </div>
      <div className="right-login">
        <div className="card-login">
          <h1>Login</h1>
          <div className="textfield">
            <label for="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Informe o email"
            ></input>
            <label for="senha">Senha</label>

            <input
              type="password"
              name="senha"
              placeholder="Informe a senha"
            ></input>
            <a href="#" className="recuperar" onClick={HandleClick}>
              Recuperar senha
            </a>
            {inputVisible && (
              <input
                type="text"
                name="recuperar senha"
                placeholder="Informe o email"
                className="input-recuperar"
              ></input>
            )}
            {inputVisible && <AiOutlineSend className="icones" />}

            <button className="btn-login" onClick={goToHomePage}>
              {" "}
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
