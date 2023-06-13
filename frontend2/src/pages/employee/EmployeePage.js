import "./EmployeePage.css";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmployeePage() {
  const navigateTo = useNavigate();

  let { id } = useParams();
  const [employeeObject, setEmployeeObject] = useState({});
  const [showCursos, setShowCursos] = useState([]);
  const [cursos, setCursos] = useState([]);
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

  const mostrarCursos = () => {
    axios
      .get(`http://localhost:3005/funcionario?name=${employeeObject.name}`)
      .then((response) => {
        const cursosDoFuncionario = response.data.filter(
          (curso) => curso.name === employeeObject.name
        );
        setCursos(cursosDoFuncionario.map((curso) => curso.info));
        setShowCursos(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="postPage">
      <div className="header">
        <h1 onClick={goToEmployees}>
          Sonda <br /> Engenharia
        </h1>
      </div>
      <div className="post" id="individual">
        <h1>Funcionário</h1>
        <div className="name">Nome: {employeeObject.name}</div>
        <div className="cpf">CPF: {employeeObject.cpf}</div>
        <div className="email">Email: {employeeObject.email}</div>
        <div className="address">Endereço: {employeeObject.address}</div>
        <div className="phonenumber">
          Telefone: {employeeObject.phonenumber}
        </div>
        <div className="birthday">
          Data de nascimento: {employeeObject.birthday}
        </div>
        <div className="admissiondate">
          Data de admissão: {employeeObject.admissiondate}
        </div>
        <div className="asodate">Data de ASO: {employeeObject.asodate}</div>
        <div>
          <div className="box-bnt ">
            {" "}
            <button
              className="bnt-cursos"
              onClick={() => navigateTo(`/cursosdooperario/${id}`)}
            >
              Cursos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeePage;
