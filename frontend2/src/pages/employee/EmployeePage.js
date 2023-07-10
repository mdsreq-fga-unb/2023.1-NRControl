import "./EmployeePage.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "./../../assets/images/logo.png";
import moment from "moment";

function EmployeePage() {
  const navigateTo = useNavigate();

  let { id } = useParams();
  const [employeeObject, setEmployeeObject] = useState({});
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
    if (id) {
      axios
        .get(`http://localhost:3005/employeeinfo/byId/${id}`)
        .then((response) => {
          setEmployeeObject(response.data);
        });
    }
  }, [id]);

  const editEmployeeData = () => {
    navigateTo(`/editEmployee/${id}`);
  };

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  return (
    <div className="postPage">
      <div className="header">
        <div className="logo" onClick={goToEmployees}>
          <img src={logo} alt="SONDA Engenharia" className="sonda" />
        </div>
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
          <div className="asodate">Data de ASO: {employeeObject.asodate}</div>
        </div>
        <div>
          <div className="box-bnt ">
            <button
              className="bnt-courses"
              onClick={() => navigateTo(`/cursosdooperario/${id}`)}
            >
              Cursos
            </button>
            <button className="bnt-courses" onClick={editEmployeeData}>
              Editar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeePage;
