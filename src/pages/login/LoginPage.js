import "./LoginPage.css";
import capa from "./../../assets/images/certo.png";
import logo from "./../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import YupPassword from "yup-password";
YupPassword(yup);

function LoginPage() {
  const navigate = useNavigate();
  const goToHomePage = () => {
    navigate("/Home");
  };

  const handleClickLogin = (values) => console.log(values);

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

  return (
    <div className="main-login">
      <div className="left-login">
        <h1>
          Sonda <br></br>Engenharia
        </h1>
        <img src={capa} alt="equipe" className="img" />
      </div>
      <img src={logo} alt="logo" className="sonda" />

      <div className="right-login">
        <div className="card-login">
          <h1>Login</h1>
          <Formik
            initialValues={{}}
            onSubmit={handleClickLogin}
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
              <a href="/senha" className="recuperar">
                Recuperar senha
              </a>

              <button className="btn-login" onClick={goToHomePage}>
                {" "}
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
