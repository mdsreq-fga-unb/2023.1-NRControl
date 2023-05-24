import { useState } from "react";
import React from "react";
import Axios from "axios";
import "./Login.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginUserName, setLoginUserName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigateTo = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3005/login", {
      LoginUserName: loginUserName,
      LoginPassword: loginPassword,
    }).then((response) => {
      console.log();

      if (response.data.message || loginUserName == "" || loginPassword == "") {
        alert("Usuario ou senha incorretos");
      } else navigateTo("/home");
    });
  };

  return (
    <div className="App">
      <div className="Login">
        <h1>Login</h1>
        <div>
          <label>Usuário</label>
          <input
            type="text"
            id="username"
            onChange={(e) => {
              setLoginUserName(e.target.value);
            }}
          />
        </div>

        <div>
          <label>Senha</label>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              setLoginPassword(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn" onClick={loginUser}>
          Entrar
        </button>
      </div>
    </div>
  );
};

export default Login;
