import React, { useEffect, useState } from "react";
import "./Curso.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Curso = () => {
  const navigateTo = useNavigate();
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [curso, setCurso] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigateTo("/");
    }
  }, [navigateTo]);

  useEffect(() => {
    axios
      .get("http://localhost:3005/funcionario")
      .then((response) => setUsers(response.data))
      .catch((err) => console.log(err));
  }, []);

  const enviarDados = (event) => {
    event.preventDefault();
    const id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    axios
      .post("http://localhost:3005/funcionario", {
        id: id,
        name: name,
        curso: curso,
      })
      .then((response) => {
        if (response.status === 201) {
          setUsers([...users, response.data]);
          setName("");
          setCurso("");
        } else {
          console.log("Ocorreu um erro ao adicionar o usuário.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const formatarTópicos = (curso) => {
    if (curso && curso.length > 0) {
      return curso
        .split(",")
        .map((topico, index) => <div key={index}>{topico}</div>);
    }
    return "";
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = Math.ceil(users.length / usersPerPage);
  const pages = [];
  for (let i = 1; i <= pageNumbers; i++) {
    pages.push(i);
  }

  return (
    <div className="page-container">
      <div className="content-container">
        <div className="form">
          <form onSubmit={enviarDados}>
            <input
              type="text"
              placeholder="Insira o nome do funcionário"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Insira/atualize o curso do funcionário"
              onChange={(e) => setCurso(e.target.value)}
            />
            <button>Adicionar</button>
          </form>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Funcionário</th>
                <th className="curso-column">Curso</th>
                <th>Modificar</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td className="curso-column">
                      {formatarTópicos(user.curso)}
                    </td>
                    <td>
                      <button>Editar</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
};

export default Curso;
