import "./Home.css";
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigateTo = useNavigate();

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
    name: Yup.string().required("O nome é obrigatório"),
    cpf: Yup.string().required("O CPF é obrigatório"),
    email: Yup.string()
      .email("Email inválido")
      .required("O email é obrigatório"),
    address: Yup.string().required("O endereço é obrigatório"),
    phonenumber: Yup.string().required("O telefone é obrigatório"),
    birthday: Yup.date().required("A data de nascimennto é obrigatória"),
    admissiondate: Yup.date().required("A data de admissão é obrigatória"),
    asodate: Yup.date().required("A data de ASO é obrigatória"),
  });

  const onSubmit = (data) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigateTo("/");
      return;
    }

    axios
      .post("http://localhost:3005/register", data, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        console.log("IT WORKED");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Nome completo: </label>
          <ErrorMessage name="name" component="span" />
          <Field id="inputCreatePost" name="name" placeholder="Nome completo" />
          <label>CPF: </label>
          <ErrorMessage name="cpf" component="span" />
          <Field id="inputCreatePost" name="cpf" placeholder="CPF" />
          <label>Email: </label>
          <ErrorMessage name="email" component="span" />
          <Field id="inputCreatePost" name="email" placeholder="Email" />
          <label>Endereço: </label>
          <ErrorMessage name="address" component="span" />
          <Field id="inputCreatePost" name="address" placeholder="Endereço" />
          <label>Telefone: </label>
          <ErrorMessage name="phonenumber" component="span" />
          <Field
            id="inputCreatePost"
            name="phonenumber"
            placeholder="Telefone"
          />
          <label>Data de nascimento: </label>
          <ErrorMessage name="birthday" component="span" />
          <Field
            id="inputCreatePost"
            name="birthday"
            placeholder="Data de nascimento"
          />
          <label>Data de admissão: </label>
          <ErrorMessage name="admissiondate" component="span" />
          <Field
            id="inputCreatePost"
            name="admissiondate"
            placeholder="Data de admissão"
          />
          <label>Data de ASO: </label>
          <ErrorMessage name="asodate" component="span" />
          <Field
            id="inputCreatePost"
            name="asodate"
            placeholder="Data de ASO"
          />
          <button type="submit">Cadastrar</button>
        </Form>
      </Formik>
    </div>
  );
};

export default HomePage;
