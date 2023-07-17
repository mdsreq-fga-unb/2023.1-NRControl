import "./EmployeePage.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Header from "../Header/header";

function EmployeePage() {
  const navigateTo = useNavigate();

  let { id } = useParams();
  const [employeeObject, setEmployeeObject] = useState({});

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigateTo("/");
    }
  }, [navigateTo]);

  useEffect(() => {
    if (id) {
      axios
        .get(`https://2023-1-nr-control.vercel.app/employee/byId/${id}`)
        .then((response) => {
          setEmployeeObject(response.data);
        });
    }
  }, [id]);

  const editemployeeData = () => {
    navigateTo(`/editemployee/${id}`);
  };

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  return (
    <div className="postPage">
      <div className="header">
        <Header />
      </div>
      <div className="post" id="individual">
        <h1>Funcionário</h1>
        <div className="employee-data">
          <div className="name">Nome: {employeeObject.name}</div>
          <div className="cpf">CPF: {employeeObject.cpf}</div>
          <div className="email">Email: {employeeObject.email}</div>
          <div className="address">Endereço: {employeeObject.address}</div>
          <div className="phonenumber">
            Telefone: {employeeObject.phonenumber}
          </div>
          <div className="birthday">
            Data de nascimento: {formatDate(employeeObject.birthday)}
          </div>
          <div className="admissiondate">
            Data de admissão: {formatDate(employeeObject.admissiondate)}
          </div>
          <div className="asodate">
            Data de ASO: {formatDate(employeeObject.asodate)}
          </div>
          <div className="competence">
            Competência: {employeeObject.competence}
          </div>
        </div>
        <div>
          <div className="box-bnt ">
            <button
              className="bnt-courses"
              onClick={() => navigateTo(`/cursosdooperario/${id}`)}
            >
              Cursos
            </button>
            <button className="bnt-courses" onClick={editemployeeData}>
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeePage;
