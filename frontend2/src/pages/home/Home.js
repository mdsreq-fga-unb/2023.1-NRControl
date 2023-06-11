import React from "react";
import axios from "axios";
import "./Home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BsFillPersonDashFill,
  BsPersonFillGear,
  BsFillPersonPlusFill,
} from "react-icons/bs";

function Home() {
  const navigateTo = useNavigate();
  const goToRegister = () => {
    navigateTo("/register");
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigateTo("/");
    }
  }, [navigateTo]);

  const [listOfEmployees, setListOfEmployees] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3005/employeeinfo").then((response) => {
      const sortedEmployees = response.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setListOfEmployees(sortedEmployees);
    });
  }, []);

  return (
    <div className="main">
      <div className="header">
        <h1>
          Sonda <br></br>Engenharia
        </h1>
        <div className="icons-sidebar">
          <BsFillPersonPlusFill onClick={goToRegister} />
          <BsFillPersonDashFill />
          <BsPersonFillGear />
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
                {listOfEmployees.map((value, key) => (
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
      </div>
    </div>
  );
}

export default Home;
