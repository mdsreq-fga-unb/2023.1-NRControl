import "./LoginPage.css";
import capa from "./../../assets/images/certo.png";
import logo from "./../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";


import YupPassword from "yup-password";
YupPassword(yup);

function LoginPage() {
  const navigateTo = useNavigate();

  const loginUser = (values) => {
    const data = { email: values.email || "", password: values.password || "" };
    axios
      .post("http://localhost:3005/auth/login", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          sessionStorage.setItem("accessToken", response.data);
          navigateTo("/employees");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email("Email inválido")
      .required("O email é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve conter pelo menos 8 caracteres")
      .minSymbols(1, "A senha deve conter ao menos um símbolo")
      .minNumbers(1, "A senha deve conter ao menos um número")
      .required("A senha é obrigatória"),
  });

  const initialValues = {
    email: "",
    password: ""
  }

  return (
    <div className="main-login">
      <div className="left-login">
        <img src={capa} alt="equipe" className="img" />
        <img src={logo} alt="logo" className="sonda" />
      </div>
      <div className="right-login">
        <div className="card-login">
          <h1>Login</h1>
          <Formik
            initialValues={initialValues}
            onSubmit={loginUser}
            validationSchema={validationLogin}
          >
            <Form className="login-form">
              <div className="login-form-group">
                <Field
                  name="email"
                  className="form-field"
                  placeholder="Email"  
                />
                <ErrorMessage
                  component="span"
                  name="email"
                  className="form-error"
                />
                 <Field
                 type="password"
                 name="password"
                 className="form-field"
                 placeholder="Senha"
               />
                <ErrorMessage
                  component="span"
                  name="password"
                  className="form-error"
                />
              </div>
              <a href="/recuperarsenha" className="recover">
                Recuperar senha
              </a>

              <button type="submit" className="btn-login">
                Login
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
