import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { MdAssignmentAdd } from "react-icons/md";
import logo from "./../../assets/images/logo.png";
import "./Home.css";

function Home() {
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
    axios.get("http://localhost:3005/employeeinfo").then((response) => {
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

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = listOfEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = Math.ceil(listOfEmployees.length / employeesPerPage);
  const pages = Array.from({ length: pageNumbers }, (_, i) => i + 1);

  return (
    <div className="main">
      <div className="header">
        <div className="logo">
          <img src={logo} alt="SONDA Engenharia" className="sonda" />
        </div>
        <div className="button-wrapper">
          <div className="icons-sidebar">
            <BsFillPersonPlusFill onClick={goToRegister} />
            <MdAssignmentAdd onClick={goToCursos} />
          </div>
        </div>
      </div>
      <div className="box">
        <h1>Funcionários</h1>
        <div className="info">
          {currentEmployees.map((value, key) => (
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

export default Home;
