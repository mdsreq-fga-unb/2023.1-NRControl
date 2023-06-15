import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./employeeCourses.css";
import logo from "./../../assets/images/logo.png";

function EmployeeCourses() {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [courses, setCourses] = useState([]);

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
          showCourses(response.data.name);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const showCourses = (name) => {
    axios
      .get(`http://localhost:3005/course?name=${name}`)
      .then((response) => {
        const employeeCourses = response.data.filter(
          (course) => course.name === name
        );
        setCourses(employeeCourses);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="main-table">
        <div className="table-employees">
          <div className="header" onClick={goToEmployees}>
          <div className="logo" onClick={goToEmployees}>
          <img src={logo} alt="SONDA Engenharia" className="sonda" />
          </div>
          </div>
          <h2>Cursos do Funcionário</h2>
          <table>
            <thead>
              <tr>
                <th>Curso</th>
                <th>Informações</th>
                <th>Data de conclusão</th>
                <th>Data de expiração</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, key) => (
                <tr key={key}>
                  <td>
                    <div className="name">{course.course}</div>
                  </td>
                  <td>
                    <div className="info">{course.info}</div>
                  </td>
                  <td>
                    <div className="conclusiondate">{course.conclusiondate}</div>
                  </td>
                  <td>
                    <div className="expirationdate">{course.expirationdate}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCourses;
