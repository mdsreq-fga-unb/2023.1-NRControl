import "./App.css";
import capa from "./assets/certo.png";
import logo from "./assets/logo.png";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as yup from "yup";

//import React, { useState, useEffect } from "react";

function App() {
  //const [email, setEmail] = useState();
  //const [password, setPassword] = useState();

  const handleClickLogin = (values) => console.log(values);
  
  const validationLogin = yup.object().shape({
    email: yup.string().email("Email inválido").required("O email é obrigatório"),
    password: yup.string().min(8, "A senha deve ter pelo menos 8 caracteres").required("A senha é obrigatória"),
  });
  
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
          <Formik initialValues={{}} onSubmit={handleClickLogin} validationSchema={validationLogin}>
            <Form className="login-form">
              <div className="login-form-group">
                <Field name="email" className="form-field" placeholder="Email"/>
                <ErrorMessage
                  component="span"
                  name="email"
                  className="form-error"
                />
              </div>
              <div className="form-group">
                <Field name="password" className="form-field" placeholder="Senha"/>
                <ErrorMessage
                  component="span"
                  name="password"
                  className="form-error"
                />
              </div>
              <button className="button" type="submit">
                Login
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default App;