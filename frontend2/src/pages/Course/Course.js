import React, { useEffect, useState } from "react";
import "./Course.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import moment from "moment";
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
      if (!data.name) {
        setEmployeeExistsError(
          "Só é possível adicionar um curso para um funcionário cadastrado"
        );
        setTimeout(() => {
          setEmployeeExistsError("");
        }, 3000);
        return;
      }
  
      const employeeExistsResponse = await axios.get(
        `https://2023-1-nr-control.vercel.app/employee/checkName/${data.name}`
      );
  
      if (employeeExistsResponse.data.exists) {
        const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  
        const formattedData = {
          ...data,
          conclusiondate: moment(data.conclusiondate, "DD/MM/YYYY").format("YYYY-MM-DD"),
          expirationdate: moment(data.expirationdate, "DD/MM/YYYY").format("YYYY-MM-DD"),
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
    name: Yup.string().required("O nome do funcionário é obrigatório"),
    course: Yup.string().required("O código do curso é obrigatório"),
    conclusiondate: Yup.string()
      .required("A data de conclusão do curso é obrigatória")
      .matches(
        /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
        "A data de conclusão do curso é inválida. Use o formato dd/mm/aaaa."
      )
      .test(
        "conclusiondate",
        "A data de conclusão do curso deve estar entre 2010 e a data atual",
        function (value) {
          const currentDate = moment();
          const conclusionDate = moment(value, 'DD/MM/YYYY', true);
  
          return (
            conclusionDate.isValid() &&
            conclusionDate.isSameOrAfter(moment("2010-01-01", "YYYY-MM-DD")) &&
            conclusionDate.isSameOrBefore(currentDate)
          );
        }
      ),
      expirationdate: Yup.string()
      .required("A data de expiração do curso é obrigatória")
      .test(
        "expirationdate",
        "A data de expiração do curso deve ser posterior à data atual",
        function (value) {
          const isValidFormat = /^\d{2}\/\d{2}\/\d{4}$/.test(value);
          const currentDate = moment();
          const selectedDate = moment(value, "DD/MM/YYYY");
    
          if (isValidFormat && selectedDate.isValid()) {
            if (!selectedDate.isValid()) {
              return this.createError({
                message: "Data de nascimento inválida",
                path: "expirationdate",
              });
            }
    
            if (selectedDate.isBefore(currentDate)) {
              return this.createError({
                message:
                  "A data de expiração do curso deve ser posterior à data atual",
                path: "expirationdate",
              });
            }
          }
    
          return true;
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
    <div className="page">
      <div className="header">
        <Header />
      </div>
      <div className="tam-container">
        <div className="container">
          <h1> Cadastrar curso</h1>
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
  <div className="field-container">
    {/* campo name */}
    <Field
      className="input-edit"
      type="text"
      name="name"
      placeholder="Nome do funcionário"
    />
    <div className="error-container">
      {touched.name && errors.name && (
        <div className="error-message">{errors.name}</div>
      )}
    </div>
  </div>

  <div className="field-container">
    {/* campo course */}
    <Field
      className="input-edit"
      type="text"
      name="course"
      placeholder="Código do curso"
    />
    <div className="error-container">
      {touched.course && errors.course && (
        <div className="error-message">{errors.course}</div>
      )}
    </div>
  </div>

  <div className="field-container">
    {/* campo info */}
    <Field
      className="input-edit"
      type="text"
      name="info"
      placeholder="Informações do curso"
    />
    <div className="error-container">
      {touched.info && errors.info && (
        <div className="error-message">{errors.info}</div>
      )}
    </div>
  </div>
</div>


                    <div className="right-card-add-course">
                      <div className="field-group">
                        {/* campo conclusiondate */}
                        <Field
                          className="input-edit"
                          id="inputCreatePost"
                          name="conclusiondate"
                          placeholder="Data de conclusão"
                          as={InputMask}
                          mask="99/99/9999"
                        />
                        <div className="error-container">
                          {touched.conclusiondate && errors.conclusiondate && (
                            <div className="error-message">
                              {errors.conclusiondate}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="field-group">
                        {/* campo expirationdate */}
                        <Field
                          className="input-edit"
                          id="inputCreatePost"
                          name="expirationdate"
                          placeholder="Data de expiração"
                          as={InputMask}
                          mask="99/99/9999"
                        />
                        <div className="error-container">
                          {touched.expirationdate && errors.expirationdate && (
                            <div className="error-message">
                              {errors.expirationdate}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="baixo">
                        {/* botão submit */}
                        <button type="submit" className="cadastrar">
                          Adicionar
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            {/* sucesso e mensagem de erro */}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
            {employeeExistsError && (
              <div className="error-message">{employeeExistsError}</div>
            )}
          </div>
        </div>
      </div>

  );
};

export default Course;
