import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header/header";
import "./Competence.css";

function Competence() {
  const navigateTo = useNavigate();
  const [listOfEmployees, setListOfEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 6;

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

  const currentEmployees = sortedCompetences
    .flatMap((competence) => employeesByCompetence[competence])
    .slice(
      (currentPage - 1) * employeesPerPage,
      currentPage * employeesPerPage
    );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = Math.ceil(
    sortedCompetences.flatMap((competence) => employeesByCompetence[competence])
      .length / employeesPerPage
  );
  const pages = Array.from({ length: pageNumbers }, (_, i) => i + 1);

  return (
    <div className="main">
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
                  className="employee-box"
                  onClick={() => navigateTo(`/employee/${value.id}`)}
                >
                  <div className="name">{value.name}</div>
                  <div className="cpf">CPF: {value.cpf}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="pagination">
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
}

export default Competence;
