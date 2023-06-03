import { useState } from "react";
import React from "react";
import axios from "axios";
import "./Login.css";
import "../../App.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineSend } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();
  const [inputVisible, setInputVisible] = useState(false);

  const handleRecuperarSenha = () => {
    setInputVisible(true);
  };

  const loginUser = (e) => {
    e.preventDefault();
    const data = { email: email, password: password };
    axios
      .post("http://localhost:3005/auth/login", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          sessionStorage.setItem("accessToken", response.data);
          navigateTo("/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const RecuperarSenha = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const url = `http://localhost:3005/api/password-reset`;
  //     const { data } = await axios.post(url, { email });
  //   } catch (error) {
  //     if (
  //       error.response &&
  //       error.response.status >= 400 &&
  //       error.response.status <= 500
  //     ) {
  //     }
  //   }
  // };

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

        <a href="#" className="recuperar" onClick={handleRecuperarSenha}>
          Recuperar senha
        </a>
        {inputVisible && (
          <form onSubmit={RecuperarSenha}>
            <input
              type="email"
              name="recuperar-senha"
              placeholder="Informe o email"
              className="input-recuperar"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button type="submit">
              <AiOutlineSend className="icones" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
