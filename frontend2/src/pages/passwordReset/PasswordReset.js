import React, { useEffect, useState, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./../../assets/images/logo.png";
import { GiPadlock } from "react-icons/gi";
import "./passwordReset.css";

const PasswordReset = () => {
  const [validUrl, setValidUrl] = useState(false);
  const [password, setPassword] = useState("");
  const [sentToken, setToken] = useState("");
  const param = useParams();
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const url = `http://localhost:3005/api/password-reset/${param.id}/${param.token}`;

  useEffect(() => {
    const verifyUrl = async () => {
      try {
        await axios.get(url);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
  }, [param, url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");

      const complexityRegex =
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!complexityRegex.test(password)) {
        setError(
          "A senha deve conter pelo menos 8 caracteres, incluindo símbolos, números, letras minúsculas e maiúsculas."
        );
        return;
      }

      const { data } = await axios.post(url, { password, sentToken });
      setMsg(data.message);
      setPassword("");
      setToken("");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        setMsg("");
      }
    }
  };

  return (
    <div className="main-page">
      <div className="header">
        <img src={logo} alt="logo" className="sonda" />
        <h1>
          Sonda <br></br>Engenharia
        </h1>
      </div>

      <div className="center-box">
        <div className="img-left">
          <GiPadlock className="icon-left" />
        </div>
        <div className="card-password">
          {validUrl ? (
            <Fragment>
              <h1>Adicionar Nova Senha</h1>
              <p>Insira a nova senha abaixo:</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="password"
                  placeholder="Senha"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  className="input-password"
                />
                {error && <div className="msg-error">{error}</div>}
                {msg && <div className="msg-success">{msg}</div>}
                {msg && (
                  <div className="redirect-msg">
                    Redirecionando para a página principal...
                  </div>
                )}
                <button type="submit" className="btn">
                  Enviar
                </button>{" "}
              </form>
            </Fragment>
          ) : (
            <h1>404 Não Encontrado</h1>
          )}
        </div>
        <div className="img-right">
          <GiPadlock className="icon-right" />
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
