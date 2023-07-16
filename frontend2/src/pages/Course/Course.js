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

    const formattedData = {
      ...data,
      conclusiondate: data.conclusiondate,
      expirationdate: data.expirationdate,
    };

    try {
      const employeeExistsResponse = await axios.get(
        `http://localhost:3005/employee/checkName/${data.name}`
      );

      if (employeeExistsResponse.data.exists) {
        const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        await axios.post("http://localhost:3005/course", formattedData);
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
    name: Yup.string().required("O nome do funcionário é obrigatório"),
    course: Yup.string().required("O código do curso é obrigatório"),
    info: Yup.string().required("As informações do curso são obrigatórias"),
    conclusiondate: Yup.string().required("A data de conclusão do curso é obrigatória"),
    expirationdate: Yup.string().required("A data de expiração do curso é obrigatória"),
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
                        type="text"
                        name="name"
                        placeholder="Nome do funcionário"
                      />
                      {touched.name && errors.name && (
                        <div className="error-message">{errors.name}</div>
                      )}

                      <Field
                        type="text"
                        name="course"
                        placeholder="Código do curso"
                      />
                      {touched.course && errors.course && (
                        <div className="error-message">{errors.course}</div>
                      )}

                      <Field
                        type="text"
                        name="info"
                        placeholder="Informações do curso"
                      />
                      {touched.info && errors.info && (
                        <div className="error-message">{errors.info}</div>
                      )}

                      {employeeExistsError && (
                        <div className="error-message">{employeeExistsError}</div>
                      )}
                    </div>

                    <div className="right-card-add-course">
                      <div className="field-group">
                        <label>Data de Conclusão</label>
                        <Field
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
                        <label>Data de Expiração</label>
                        <Field
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
