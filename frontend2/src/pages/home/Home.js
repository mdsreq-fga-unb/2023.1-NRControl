import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { MdAssignmentAdd } from "react-icons/md";

function Home() {
  const navigateTo = useNavigate();
  const goToRegister = () => {
    navigateTo("/register");
  };
  const goToCursos = () => {
    navigateTo("/cursos");
  };

  const [listOfEmployees, setListOfEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);

  
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
  const pages = [];
  for (let i = 1; i <= pageNumbers; i++) {
    pages.push(i);
  }

  return (
    <div className="main">
      <div className="header">
        <h1>
          Sonda <br></br>Engenharia
        </h1>
        <div className="icons-sidebar">
          <BsFillPersonPlusFill onClick={goToRegister} />
          <MdAssignmentAdd onClick={goToCursos} />
        </div>
      </div>
      <div className="box">
        <h1>Funcionários</h1>
        <div className="info">
          <div className="tabel">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((value, key) => (
                  <tr
                    key={key}
                    onClick={() => navigateTo(`/employee/${value.id}`)}
                  >
                    <td>
                      <div className="name">{value.name}</div>
                    </td>
                    <td>
                      <div className="cpf">{value.cpf}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
