import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EmployeePage() {
  let { id } = useParams();
  const [employeeObject, setEmployeeObject] = useState({});

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3005/employeeinfo/byId/${id}`)
        .then((response) => {
          setEmployeeObject(response.data);
        });
    }
  }, [id]);

  return (
    <div classname="postPage">
      <h1> Funcionário</h1>
      <div className="post" id="individual">
        <div className="name">Nome: {employeeObject.name}</div>
        <div className="cpf">CPF: {employeeObject.cpf}</div>
        <div className="email">Email: {employeeObject.email}</div>
        <div className="address">Endereço: {employeeObject.address}</div>
        <div className="phonenumber">Telefone{employeeObject.phonenumber}</div>
        <div className="birthday">
          Data de nascimento: {employeeObject.birthday}
        </div>
        <div className="admissiondate">
          Data de admissão: {employeeObject.admissiondate}
        </div>
        <div className="asodate">Data de ASO: {employeeObject.asodate}</div>
      </div>
    </div>
  );
}

export default EmployeePage;
