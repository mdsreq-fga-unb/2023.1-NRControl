import React, { useEffect, useState } from "react";
import "./Course.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InputMask from "react-input-mask";
import logo from "./../../assets/images/logo.png";

const Course = () => {
  const navigateTo = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  const goToEmployees = () => {
    navigateTo("/employees");
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigateTo("/");
    }
  }, [navigateTo]);

  useEffect(() => {
    axios
      .get("http://localhost:3005/course")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, []);

  const sendData = async (values, { resetForm }) => {
    try {
      const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
      const response = await axios.post("http://localhost:3005/course", {
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
      .max(new Date(), "A data de conclusão não pode ser futura")
      .required("A data de conclusão do curso é obrigatória"),
    expirationdate: Yup.string()
      .max(new Date(), "A data de expiração não pode ser futura")
      .required("A data de expiração do curso é obrigatória"),
  });

  const initialValues = {
    name: "",
    course: "",
    info: "",
    conclusiondate: "",
    expirationdate: "",
  };

  const topics = (course) => {
    if (course && course.length > 0) {
      return course.split(",").map((topics, index) => (
        <div key={index}>{topics}</div>
      ));
    }
    return "";
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = Math.ceil(users.length / usersPerPage);
  const pages = Array.from({ length: pageNumbers }, (_, i) => i + 1);

  return (
    <div className="page-container">
      <div className="content-container">
      <div className="logo" onClick={goToEmployees}>
          <img src={logo} alt="SONDA Engenharia" className="sonda" />
          </div>
        <div className="form">
          <Formik
            initialValues={initialValues}
            onSubmit={sendData}
            validationSchema={validationSchema}
          >
            <Form>
              <Field type="text" name="name" placeholder="  Nome do funcionário" />
              <ErrorMessage name="name" component="span" />

              <Field type="text" name="course" placeholder="  Código do curso" />
              <ErrorMessage name="course" component="span" />

              <Field type="text" name="info" placeholder="  Informações do curso" />
              <ErrorMessage name="info" component="span" />

              <Field
                id="inputCreatePost"
                name="conclusiondate"
                placeholder="  Data de conclusão"
                as={InputMask}
                mask="99/99/9999"
              />
              <ErrorMessage name="conclusiondate" component="span" />

              <Field
                id="inputCreatePost"
                name="expirationdate"
                placeholder=" Data de expiração"
                as={InputMask}
                mask="99/99/9999"
              />
              <ErrorMessage name="expirationdate" component="span" />

              <button className="btn-add" type="submit">
                Adicionar
              </button>
            </Form>
          </Formik>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Funcionário</th>
                <th>Código do curso</th>
                <th>Info</th>
                <th>Data de Conclusão</th>
                <th>Data de Expiração</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td className="course-column">{topics(user.course)}</td>
                  <td>{user.info}</td>
                  <td>{user.conclusiondate}</td>
                  <td>{user.expirationdate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination2">
          {pages.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => paginate(pageNumber)}
              className={currentPage === pageNumber ? "active" : ""}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Course;