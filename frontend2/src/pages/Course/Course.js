import React, { useEffect, useState } from "react";
import "./Course.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import logo from "./../../assets/images/logo.png";
import moment from "moment";

const Course = () => {
  const navigateTo = useNavigate();
  const [users, setUsers] = useState([]);


  const goToEmployees = () => {
    navigateTo("/employees");
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigateTo("/");
    }
  }, [navigateTo]);

  const sendData = async (values, { resetForm }) => {
    try {
      const formattedData = {
        ...values,
        conclusiondate: moment(values.conclusiondate, "DD/MM/YYYY").format("YYYY-MM-DD"),
        expirationdate: moment(values.expirationdate, "DD/MM/YYYY").format("YYYY-MM-DD"),
      };
      
      const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
      const response = await axios.post("http://localhost:3005/course", formattedData, {
        id: id,
        name: values.name,
        course: values.course,
        info: values.info,
        conclusiondate: values.conclusiondate,
        expirationdate: values.expirationdate,
      });

      if (response.status === 201) {
        setUsers([...users, response.data]);
        resetForm();
      } else {
        console.log("Ocorreu um erro ao adicionar o curso.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("O nome do funcionário é obrigatório"),
    course: Yup.string().required("O código do curso é obrigatório"),
    info: Yup.string().required("As informações do curso são obrigatórias"),
    conclusiondate: Yup.string()
  .required("A data de conclusão do curso é obrigatória")
  .test("conclusiondate", "Data de conclusão inválida", function(value) {
    const currentDate = moment().startOf("day");
    const conclusionDate = moment(value, "DD/MM/YYYY", true).startOf("day");
    const maxDate = moment().subtract(10, "years").startOf("day");

    if (!value) {
      return this.createError({
        message: "A data de conclusão do curso é obrigatória",
        path: "conclusiondate",
      });
    }

    if (!conclusionDate.isValid()) {
      return this.createError({
        message: "Data de conclusão inválida",
        path: "conclusiondate",
      });
    }

    if (conclusionDate.isAfter(currentDate)) {
      return this.createError({
        message: "A data de conclusão não pode ser futura",
        path: "conclusiondate",
      });
    }

    return conclusionDate.isSameOrAfter(maxDate);
  }),

  expirationdate: Yup.string()
  .required("A data de expiração do curso é obrigatória")
  .test("expirationdate", "Data de expiração inválida", function(value) {
    const conclusionDate = this.resolve(Yup.ref("conclusiondate"));
    const expirationDate = moment(value, "DD/MM/YYYY", true).startOf("day");

    if (!value) {
      return this.createError({
        message: "A data de conclusão do curso é obrigatória",
        path: "conclusiondate",
      });
    }

    if (!expirationDate.isValid()) {
      return this.createError({
        message: "Data de expiração inválida",
        path: "expirationdate",
      });
    }

    return moment(conclusionDate, "DD/MM/YYYY").isSameOrBefore(expirationDate);
  })

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
        <div className="logo" onClick={goToEmployees}>
          <img src={logo} alt="SONDA Engenharia" className="sonda" />
        </div>
      </div>
      <div className="tam-container">
        <div className="container">
          <h1>Cadastro de Curso</h1>
          <div className="createPostPage">
            <Formik
              initialValues={initialValues}
              onSubmit={sendData}
              validationSchema={validationSchema}
              validateOnChange={false}
            >
              <Form className="formContainer">
                <div className="left-card">
                  <Field
                    type="text"
                    name="name"
                    placeholder="Nome do funcionário"
                  />
                  <ErrorMessage
                    name="name"
                    component="span"
                    className="error-message"
                  />

                  <Field
                    type="text"
                    name="course"
                    placeholder="Código do curso"
                  />
                  <ErrorMessage
                    name="course"
                    component="span"
                    className="error-message"
                  />

                  <Field
                    type="text"
                    name="info"
                    placeholder="Informações do curso"
                  />
                  <ErrorMessage
                    name="info"
                    component="span"
                    className="error-message"
                  />
                </div>

                <div className="right-card">
                  <div className="field-group">
                    <label>Data de Conclusão</label>
                    <Field
                      id="inputCreatePost"
                      name="conclusiondate"
                      placeholder="Data de conclusão"
                      as={InputMask}
                      mask="99/99/9999"
                    />
                    <ErrorMessage
                      name="conclusiondate"
                      component="span"
                      className="error-message"
                    />
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
                    <ErrorMessage
                      name="expirationdate"
                      component="span"
                      className="error-message"
                    />
                  </div>
                </div>

                <div className="baixo">
                  <button type="submit" className="cadastrar">
                    Adicionar
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Course;