import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./employeeCourses.css";

function EmployeeCourses() {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [employeeObject, setEmployeeObject] = useState({});
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
          mostrarCursos(response.data.name);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const mostrarCursos = (name) => {
    axios
      .get(`http://localhost:3005/funcionario?name=${name}`)
      .then((response) => {
        const cursosDoFuncionario = response.data.filter(
          (curso) => curso.name === name
        );
        setCursos(cursosDoFuncionario);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="main-tabel">
        <div className="tabel-employees">
          <div className="header" onClick={goToEmployees}>
            <h1>
              Sonda <br /> Engenharia
            </h1>
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
              {cursos.map((curso, key) => (
                <tr key={key}>
                  <td>
                    <div className="name">{curso.curso}</div>
                  </td>
                  <td>
                    <div className="info">{curso.info}</div>
                  </td>
                  <td>
                    <div className="conclusiondate">{curso.conclusiondate}</div>
                  </td>
                  <td>
                    <div className="expirationdate">{curso.expirationdate}</div>
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
