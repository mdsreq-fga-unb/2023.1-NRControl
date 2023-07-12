import React, { useEffect, useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsFillPersonDashFill, BsPersonVcard } from "react-icons/bs";
import "./Register.css";
import InputMask from "react-input-mask";
import moment from "moment";
import logo from "./../../assets/images/logo.png";

function Register() {
  const [successMessage, setSuccessMessage] = useState("");
  const [cpfExistsError, setCpfExistsError] = useState("");
  const navigateTo = useNavigate();
  const timeoutRef = useRef(null); 

  const goToEmployees = () => {
    navigateTo("/employees");
  };

  const goToCursos = () => {
    navigateTo("/cursos");
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigateTo("/");
    }
  }, [navigateTo]);

  const initialValues = {
    name: "",
    cpf: "",
    email: "",
    address: "",
    phonenumber: "",
    birthday: "",
    admissiondate: "",
    asodate: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("O nome é obrigatório")
      .test(
        "fullName",
        "Informe pelo menos um nome e um sobrenome",
        (value) => {
          if (value) {
            const names = value.trim().split(" ");
            return names.length >= 2;
          }
          return false;
        }
      ),
    cpf: Yup.string()
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
      .required("Campo obrigatório")
      .test("cpf", "CPF inválido", (value) => {
        const cleanedCPF = value.replace(/[.-]/g, "");

        let sum = 0;
        let remainder;

        if (
          cleanedCPF === "00000000000" ||
          cleanedCPF === "11111111111" ||
          cleanedCPF === "22222222222" ||
          cleanedCPF === "33333333333" ||
          cleanedCPF === "44444444444" ||
          cleanedCPF === "55555555555" ||
          cleanedCPF === "66666666666" ||
          cleanedCPF === "77777777777" ||
          cleanedCPF === "88888888888" ||
          cleanedCPF === "99999999999"
        ) {
          return false;
        }

        for (let i = 1; i <= 9; i++) {
          sum += parseInt(cleanedCPF.substring(i - 1, i)) * (11 - i);
        }

        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) {
          remainder = 0;
        }

        if (remainder !== parseInt(cleanedCPF.substring(9, 10))) {
          return false;
        }

        sum = 0;

        for (let i = 1; i <= 10; i++) {
          sum += parseInt(cleanedCPF.substring(i - 1, i)) * (12 - i);
        }

        remainder = (sum * 10) % 11;

        if (remainder === 10 || remainder === 11) {
          remainder = 0;
        }

        if (remainder !== parseInt(cleanedCPF.substring(10, 11))) {
          return false;
        }

        return true;
      }),
    email: Yup.string().email("Email inválido").required("O email é obrigatório"),
    address: Yup.string().required("O endereço é obrigatório"),

    phonenumber: Yup.string()
      .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "O telefone é obrigatório")
      .required("O telefone é obrigatório"),

    birthday: Yup.string()
      .test("birthday", "Data de nascimento inválida", function (value) {
        const isValidFormat = /^\d{2}\/\d{2}\/\d{4}$/.test(value);
        const currentDate = moment();
        const selectedDate = moment(value, "DD/MM/YYYY");
        const minAge = 18;
        const maxAge = 80;

        if (isValidFormat && selectedDate.isValid()) {
          if (!selectedDate.isValid()) {
            return this.createError({
              message: "Data de nascimento inválida",
              path: "birthday",
            });
          }

          if (selectedDate.isAfter(currentDate)) {
            return this.createError({
              message: "A data de nascimento não pode ser futura",
              path: "birthday",
            });
          }

          const age = currentDate.diff(selectedDate, "years");
          if (age < minAge || age > maxAge) {
            return this.createError({
              message: `A idade mínima é de ${minAge} anos e a máxima é de ${maxAge} anos`,
              path: "birthday",
            });
          }
        } else if (value) {
          return this.createError({
            message: "Data de nascimento inválida",
            path: "birthday",
          });
        }

        return true;
      })
      .required("A data de nascimento é obrigatória"),

    admissiondate: Yup.string()
      .test("admissiondate", "A data de admissão é obrigatória", function (value) {
        const isValidFormat = /^\d{2}\/\d{2}\/\d{4}$/.test(value);
        const currentDate = moment();
        const selectedDate = moment(value, "DD/MM/YYYY");
        const minDate = moment("1971-10-01", "YYYY-MM-DD");
        const ageRequirementDate = moment().subtract(18, "years");

        if (isValidFormat && selectedDate.isValid()) {
          if (!selectedDate.isValid()) {
            return this.createError({
              message: "Data de admissão inválida",
              path: "admissiondate",
            });
          }

          if (selectedDate.isBefore(minDate)) {
            throw this.createError({
              message: "Data de admissão inválida",
              path: "admissiondate",
            });
          }

          if (selectedDate.isAfter(currentDate)) {
            throw this.createError({
              message: "A data de admissão não pode ser futura",
              path: "admissiondate",
            });
          }

          if (selectedDate.isBefore(ageRequirementDate)) {
            throw this.createError({
              message:
                "O funcionário deve ter pelo menos 18 anos na data de admissão",
              path: "admissiondate",
            });
          }
        } else if (value) {
          return this.createError({
            message: "Data de admissão inválida",
            path: "admissiondate",
          });
        }

        return true;
      })
      .required("A data de admissão é obrigatória"),

    asodate: Yup.string()
      .test("asodate", "A data de ASO é obrigatória", function (value) {
        const isValidFormat = /^\d{2}\/\d{2}\/\d{4}$/.test(value);
        const currentDate = moment();
        const selectedDate = moment(value, "DD/MM/YYYY");
        const maxDate = moment().endOf("day");
        const minDate = moment().subtract(12, "months").startOf("day");

        if (isValidFormat && selectedDate.isValid()) {
          if (!selectedDate.isValid()) {
            return this.createError({
              message: "Data de ASO inválida",
              path: "asodate",
            });
          }

          if (selectedDate.isAfter(maxDate)) {
            return this.createError({
              message: "A data de ASO não pode ser futura",
              path: "asodate",
            });
          }

          if (selectedDate.isBefore(minDate)) {
            return this.createError({
              message: "A validade do ASO é de 12 meses",
              path: "asodate",
            });
          }
        } else if (value) {
          return this.createError({
            message: "Data de ASO inválida",
            path: "asodate",
          });
        }

        return true;
      })
      .required("A data de ASO é obrigatória"),
  });

  const onSubmit = async (data, { resetForm }) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigateTo("/");
      return;
    }

    const formattedData = {
      ...data,
      birthday: moment(data.birthday, "DD/MM/YYYY").format("YYYY-MM-DD"),
      admissiondate: moment(data.admissiondate, "DD/MM/YYYY").format(
        "YYYY-MM-DD"
      ),
      asodate: moment(data.asodate, "DD/MM/YYYY").format("YYYY-MM-DD"),
    };

    try {
      const cpfExistsResponse = await axios.get(
        `http://localhost:3005/employeeinfo/checkCpf/${formattedData.cpf}`,
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      );

      if (cpfExistsResponse.data.exists) {
        setCpfExistsError("CPF já existe no sistema");

        // Limpa a mensagem de erro após 3000 milissegundos (3 segundos)
        timeoutRef.current = setTimeout(() => {
          setCpfExistsError("");
        }, 3000);
        return;
      } else {
        const createdEmployee = await axios.post(
          "http://localhost:3005/employeeinfo",
          formattedData,
          {
            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        );

        console.log("Funcionário cadastrado com sucesso");
        setSuccessMessage("Funcionário cadastrado com sucesso!");
        resetForm();
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        setCpfExistsError("CPF não encontrado");
      } else {
        setCpfExistsError("Ocorreu um erro ao verificar o CPF");
      }
    }
  };

  return (
    <div className="page">
      <div className="header">
        <div className="logo" onClick={goToEmployees}>
          <img src={logo} alt="SONDA Engenharia" className="sonda" />
        </div>
        <div className="sidebar">
        </div>
      </div>
      <div className="tam-container">
        <div className="container">
          <h1> Cadastrar Funcionário</h1>
          <div className="createPostPage">
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
            >
              <Form className="formContainer">
                <div className="left-card">
                  <Field
                    id="inputCreatePost"
                    name="name"
                    placeholder="Nome completo"
                  />
                  <div className="error-container">
                    <ErrorMessage name="name" component="span" className="error-message" />
                  </div>

                  <Field
                    name="cpf"
                    id="inputCreatePost"
                    placeholder="CPF"
                    as={InputMask}
                    mask="999.999.999-99"
                    type="text"
                  />
                  <div className="error-container">
                    <ErrorMessage name="cpf" component="span" className="error-message" />
                  </div>
                  {cpfExistsError && (
                    <div className="error-message">{cpfExistsError}</div>
                  )}

                  <Field
                    id="inputCreatePost"
                    name="email"
                    placeholder="Email"
                  />
                  <div className="error-container">
                    <ErrorMessage name="email" component="span" className="error-message" />
                  </div>

                  <Field
                    id="inputCreatePost"
                    name="address"
                    placeholder="Endereço"
                  />
                  <div className="error-container">
                    <ErrorMessage name="address" component="span" className="error-message" />
                  </div>
                </div>

                <div className="right-card">
                  <Field
                    name="phonenumber"
                    id="inputCreatePost"
                    placeholder="Telefone"
                    as={InputMask}
                    mask="(99) 99999-9999"
                  />
                  <div className="error-container">
                    <ErrorMessage name="phonenumber" component="span" className="error-message" />
                  </div>

                  <Field
                    id="inputCreatePost"
                    name="birthday"
                    placeholder="Data de nascimento"
                    as={InputMask}
                    mask="99/99/9999"
                  />
                  <div className="error-container">
                    <ErrorMessage name="birthday" component="span" className="error-message" />
                  </div>

                  <Field
                    id="inputCreatePost"
                    name="admissiondate"
                    placeholder="Data de admissão"
                    as={InputMask}
                    mask="99/99/9999"
                  />
                  <div className="error-container">
                    <ErrorMessage name="admissiondate" component="span" className="error-message" />
                  </div>

                  <Field
                    id="inputCreatePost"
                    name="asodate"
                    placeholder="Data de ASO"
                    as={InputMask}
                    mask="99/99/9999"
                  />
                  <div className="error-container">
                    <ErrorMessage name="asodate" component="span" className="error-message" />
                  </div>
                </div>
                <div className="baixo">
                  <button type="submit" className="cadastrar">
                    Cadastrar
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Register;
