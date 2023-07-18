import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header/header";
import "./Competence.css";

function Competence() {
  const navigateTo = useNavigate();
  const [listOfEmployees, setListOfEmployees] = useState([]);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigateTo("/");
    }
  }, [navigateTo]);

  useEffect(() => {
    axios
      .get("https://2023-1-nr-control.vercel.app/employee")
      .then((response) => {
        const sortedEmployees = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setListOfEmployees(sortedEmployees);
      });
  }, []);

  const goToRegister = () => {
    navigateTo("/register");
  };

  const goToCursos = () => {
    navigateTo("/cursos");
  };

  const goToEmail = () => {
    navigateTo("/enviaremail");
  };

  const employeesByCompetence = listOfEmployees.reduce((result, employee) => {
    const { competence } = employee;
    if (!result[competence]) {
      result[competence] = [];
    }
    result[competence].push(employee);
    return result;
  }, {});

  // Ordenar as competências em ordem alfabética
  const sortedCompetences = Object.keys(employeesByCompetence).sort();

  return (
    <div className="main-competence">
      <div className="header">
        <Header />
      </div>
      <div className="box-competence">
        <h1>Competências</h1>
        {sortedCompetences.map((competence) => (
          <div key={competence} className="competence-section">
            <h2>{competence}</h2>
            <div className="info-competence">
              {employeesByCompetence[competence].map((value, key) => (
                <div
                  key={key}
                  className="employee-box-competence"
                  onClick={() => navigateTo(`/employee/${value.id}`)}
                >
                  <div className="name">{value.name}</div>
                  <div className="cpf">CPF: {value.cpf}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Competence;
