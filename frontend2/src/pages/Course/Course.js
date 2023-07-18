import React, { useEffect, useState } from "react";
import "./Course.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import Header from "../Header/header";

const Course = () => {
  const navigateTo = useNavigate();
  const [users, setUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [employeeExistsError, setEmployeeExistsError] = useState("");

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigateTo("/");
    }
  }, [navigateTo]);

  const onSubmit = async (data, { resetForm }) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigateTo("/");
      return;
    }

    try {
      const employeeExistsResponse = await axios.get(
        `https://2023-1-nr-control.vercel.app/employee/checkName/${data.name}`
      );

      if (employeeExistsResponse.data.exists) {
        const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;

        const formattedData = {
          ...data,
          conclusiondate: data.conclusiondate,
          expirationdate: data.expirationdate,
        };

        await axios.post(
          "https://2023-1-nr-control.vercel.app/course",
          formattedData
        );
        console.log("Curso cadastrado com sucesso");
        setSuccessMessage("Curso cadastrado com sucesso!");
        resetForm();
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      } else {
        setEmployeeExistsError(
          "Só é possível adicionar um curso para um funcionário cadastrado"
        );
        setTimeout(() => {
          setEmployeeExistsError("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        setEmployeeExistsError(
          "Só é possível adicionar um curso a um funcionário já cadastrado no sistema"
        );
      } else {
        setEmployeeExistsError(
          "Ocorreu um erro ao verificar se o funcionário está cadastrado"
        );
      }
    }
  };

  const validationSchema = Yup.object().shape({
    course: Yup.string().required("O código do curso é obrigatório"),
    conclusiondate: Yup.string()
      .required("A data de conclusão do curso é obrigatória")
      .matches(
        /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(20\d{2}|19\d{2}|18\d{2}|17\d{2}|16\d{2}|15\d{2}|14\d{2}|13\d{2}|12\d{2}|11\d{2}|10\d{2}|09\d{2}|08\d{2}|07\d{2}|06\d{2}|05\d{2}|04\d{2}|03\d{2}|02\d{2}|01\d{2})$/,
        "A data de conclusão do curso é inválida"
      )
      .test(
        "conclusiondate",
        "A data de conclusão do curso deve estar entre 2010 e a data atual",
        (value) => {
          const currentDate = new Date();
          const conclusionDate = new Date(value.split("/").reverse().join("/"));
  
          return (
            conclusionDate >= new Date("2010-01-01") &&
            conclusionDate <= currentDate
          );
        }
      ),
    expirationdate: Yup.string()
      .required("A data de expiração do curso é obrigatória")
      .matches(
        /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(20\d{2}|19\d{2}|18\d{2}|17\d{2}|16\d{2}|15\d{2}|14\d{2}|13\d{2}|12\d{2}|11\d{2}|10\d{2}|09\d{2}|08\d{2}|07\d{2}|06\d{2}|05\d{2}|04\d{2}|03\d{2}|02\d{2}|01\d{2})$/,
        "A data de expiração do curso é inválida"
      )
      .test(
        "expirationdate",
        "A data de expiração do curso deve ser posterior à data de conclusão e não pode ser anterior à data atual",
        function (value) {
          const currentDate = new Date();
          const conclusionDate = new Date(
            this.resolve(Yup.ref("conclusiondate"))
          );
          const expirationDate = new Date(value.split("/").reverse().join("/"));
  
          return (
            expirationDate >= conclusionDate && expirationDate <= currentDate
          );
        }
      ),
    info: Yup.string().required("As informações do curso são obrigatórias"),
  });
  

  const initialValues = {
    name: "",
    course: "",
    info: "",
    conclusiondate: "",
    expirationdate: "",
  };

  return (
    <div className="page-container">
      <div className="page">
        <div className="header">
          <Header />
        </div>
        <div className="tam-container">
          <div className="container-add">
            <h1>Cadastro de Curso</h1>
            <div className="createPostPage">
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                validateOnChange={false}
              >
                {({ errors, touched }) => (
                  <Form className="formContainer">
                    <div className="left-card-add-course">
                      <Field
                        className="input-edit"
                        type="text"
                        name="name"
                        placeholder="Nome do funcionário"
                      />
                      {touched.name && errors.name && (
                        <div className="error-message">{errors.name}</div>
                      )}

                      <Field
                        className="input-edit"
                        type="text"
                        name="course"
                        placeholder="Código do curso"
                      />
                      {touched.course && errors.course && (
                        <div className="error-message">{errors.course}</div>
                      )}

                      <Field
                        className="input-edit"
                        type="text"
                        name="info"
                        placeholder="Informações do curso"
                      />
                      {touched.info && errors.info && (
                        <div className="error-message">{errors.info}</div>
                      )}

                      {employeeExistsError && (
                        <div className="error-message">
                          {employeeExistsError}
                        </div>
                      )}
                    </div>

                    <div className="right-card-add-course">
                      <div className="field-group">
                        <Field
                          className="input-edit"
                          id="inputCreatePost"
                          name="conclusiondate"
                          placeholder="Data de conclusão"
                          as={InputMask}
                          mask="99/99/9999"
                        />
                        {touched.conclusiondate && errors.conclusiondate && (
                          <div className="error-message">
                            {errors.conclusiondate}
                          </div>
                        )}
                      </div>

                      <div className="field-group">
                        <Field
                          className="input-edit"
                          id="inputCreatePost"
                          name="expirationdate"
                          placeholder="Data de expiração"
                          as={InputMask}
                          mask="99/99/9999"
                        />
                        {touched.expirationdate && errors.expirationdate && (
                          <div className="error-message">
                            {errors.expirationdate}
                          </div>
                        )}
                      </div>

                      <div className="baixo">
                        <button type="submit" className="cadastrar">
                          Adicionar
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
