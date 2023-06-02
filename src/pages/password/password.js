import "./password.css";
import logo from "./../../assets/images/logo.png";
import { GiPadlock } from "react-icons/gi";

function Password() {
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
          <h1>Recuperar a Senha</h1>
          <p>Insira o email para enviamos a sua senha!</p>
          <input
            type="text"
            className="input-password"
            placeholder="Insira o email"
          ></input>
          <button className="btn">Enviar o código</button>
        </div>
        <div className="img-right">
          <GiPadlock className="icon-right" />
        </div>
      </div>
    </div>
  );
}

export default Password;
