import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import logo from "./../../assets/images/logo.png";
import "./listOfCourses.css";

const ListOfCourses = () => {
  const navigateTo = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  const goToEmployees = () => {
    navigateTo("/employees");
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = Math.ceil(users.length / usersPerPage);
  const pages = Array.from({ length: pageNumbers }, (_, i) => i + 1);

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
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
      .then((response) => {
        const sortedUsers = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setUsers(sortedUsers);
      })
      .catch((err) => console.log(err));
  }, []);

 
  return (
    <div className="page-container">
      <div className="content-container">
        <div className="logo" onClick={goToEmployees}>
          <img src={logo} alt="SONDA Engenharia" className="sonda" />
        </div>
        <div className="title">
          <h1>Lista de cursos</h1>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
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
                  <td>{user.name}</td>
                  <td className="course-column">{user.course}</td>
                  <td>{user.info}</td>
                  <td>{formatDate(user.conclusiondate)}</td>
                  <td>{formatDate(user.expirationdate)}</td>
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

export default ListOfCourses;
