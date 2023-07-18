import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditEmployee.css";
import Header from "../Header/header";

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
    competence: "",
  });

  useEffect(() => {
    const showEmployeeData = async () => {
      try {
        const response = await axios.get(
          `https://2023-1-nr-control.vercel.app/employee/byId/${id}`
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
        `https://2023-1-nr-control.vercel.app/employee/byId/${id}`,
        employeeData
      );
      navigateTo(`/employee/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="main-edit">
      <Header />
      <div className="box-edit">
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
                  className="input-edit"
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
                  className="input-edit"
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
                  className="input-edit"
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
                  className="input-edit"
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
                  className="input-edit"
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
                  className="input-edit"
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
                  className="input-edit"
                  type="date"
                  name="asodate"
                  value={employeeData.asodate}
                  onChange={changeValue}
                />
              </label>
            </div>
            <div>
              <label>
                Competência:
                <select
                  name="competence"
                  value={employeeData.competence}
                  onChange={changeValue}
                >
                  <option value="Servente">Servente</option>
                  <option value="Operador de máquinas">
                    Operador de máquinas
                  </option>
                  <option value="Auxiliar de máquinas">
                    Auxiliar de máquinas
                  </option>
                  <option value="Sondador">Sondador</option>
                  <option value="Soldador">Soldador</option>
                  <option value="Encarregado">Encarregado</option>
                  <option value="Poceiro">Poceiro</option>
                </select>
              </label>
            </div>
            <button className="bnt-edit" type="submit">
              Salvar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditEmployeePage;
