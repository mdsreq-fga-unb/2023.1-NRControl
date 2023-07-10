import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./../../assets/images/logo.png";
import "./EditEmployee.css";
function EditEmployeePage() {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState({
    name: "",
    cpf: "",
    email: "",
    address: "",
    phonenumber: "",
    birthday: "",
    admissiondate: "",
    asodate: "",
  });

  useEffect(() => {
    const showEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/employeeinfo/byId/${id}`
        );
        setEmployeeData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    showEmployeeData();
  }, [id]);

  const changeValue = (event) => {
    const { name, value } = event.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateData = async (event) => {
    event.preventDefault();

    try {
      await axios.put(
        `http://localhost:3005/employeeinfo/byId/${id}`,
        employeeData
      );
      navigateTo(`/employee/${id}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="main-edit">
      <div className="box-edit">
        <div>
          <img src={logo} alt="SONDA Engenharia" className="sonda" />
        </div>
        <h1>Editar Dados do Funcionário</h1>
        <div className="info-edit">
          <form onSubmit={updateData}>
            <div>
              <label>
                Nome:
                <input
                  className="input-edit"
                  type="text"
                  name="name"
                  value={employeeData.name}
                  onChange={changeValue}
                />
              </label>
            </div>
            <div>
              <label>
                CPF:
                <input
                  type="text"
                  name="cpf"
                  value={employeeData.cpf}
                  onChange={changeValue}
                />
              </label>
            </div>
            <div>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={employeeData.email}
                  onChange={changeValue}
                />
              </label>
            </div>
            <div>
              <label>
                Endereço:
                <input
                  type="text"
                  name="address"
                  value={employeeData.address}
                  onChange={changeValue}
                />
              </label>
            </div>
            <div>
              <label>
                Telefone:
                <input
                  type="text"
                  name="phonenumber"
                  value={employeeData.phonenumber}
                  onChange={changeValue}
                />
              </label>
            </div>
            <div>
              <label>
                Data de Nascimento:
                <input
                  type="date"
                  name="birthday"
                  value={employeeData.birthday}
                  onChange={changeValue}
                />
              </label>
            </div>
            <div>
              <label>
                Data de Admissão:
                <input
                  type="date"
                  name="admissiondate"
                  value={employeeData.admissiondate}
                  onChange={changeValue}
                />
              </label>
            </div>
            <div>
              <label>
                Data de ASO:
                <input
                  type="date"
                  name="asodate"
                  value={employeeData.asodate}
                  onChange={changeValue}
                />
              </label>
            </div>
          </form>
        </div>
        <button className="bnt-edit" type="submit">
          Salvar
        </button>
      </div>
    </div>
  );
}

export default EditEmployeePage;
