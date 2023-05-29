import "./App.css";
import capa from "./assets/certo.png";
import logo from "./assets/logo.png";

//import React, { useState, useEffect } from "react";

function App() {
  //const [email, setEmail] = useState();
  //const [password, setPassword] = useState();

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
            <button className="btn-login"> Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
