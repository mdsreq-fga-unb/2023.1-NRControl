import { useState } from "react";
import React from "react";
import axios from "axios";
import "./Login.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    const data = { email: email, password: password };
    axios.post("http://localhost:3005/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        sessionStorage.setItem("acessToken", response.data);
        navigateTo("/home");
      }
      console.log(response.data);
      console.log(response.status);
    });
  };

  return (
    <div className="App">
      <div className="Login">
        <h1>Login</h1>
        <div>
          <label>Usuário</label>
          <input
            type="email"
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div>
          <label>Senha</label>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
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
