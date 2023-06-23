import "./password.css";
import { GiPadlock } from "react-icons/gi";
import { useState } from "react";
import axios from "axios";
import logo from "./../../assets/images/logo.png";

function Password() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const enviarEmail = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:3005/api/password-reset`;
      const { data } = await axios.post(url, { email });
      setMsg(data.message);
      setError("");
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
      <img src={logo} alt="logo" className="sonda" />
      <div className="center-box">
        <div className="img-left">
          <GiPadlock className="icon-left" />
        </div>
        <div className="card-password">
          <h1>Recuperar a Senha</h1>
          <p>Insira o email para recuperar a sua senha!</p>
          <form onSubmit={enviarEmail}>
            <input
              type="email"
              className="input-password"
              placeholder="Insira o email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>

            <button className="btn">Enviar o código</button>
            {error && <div className="msg-error">{error}</div>}
            {msg && <div className="msg-success">{msg}</div>}
          </form>
        </div>
        <div className="img-right">
          <GiPadlock className="icon-right" />
        </div>
      </div>
    </div>
  );
}

export default Password;
