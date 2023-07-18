import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import "./EditEmployee.css";
import Header from "../Header/header";
import InputMask from "react-input-mask";

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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const showEmployeeData = async () => {
      try {
        const response = await axios.get(
          `https://2023-1-nr-control.vercel.app/employee/byId/${id}`
        );
        const formattedData = {
          ...response.data,
          birthday: moment(response.data.birthday).format("DD/MM/YYYY"),
          admissiondate: moment(response.data.admissiondate).format(
            "DD/MM/YYYY"
          ),
          asodate: moment(response.data.asodate).format("DD/MM/YYYY"),
        };
        setEmployeeData(formattedData);
      } catch (error) {
        console.error(error);
      }
    };

    showEmployeeData();
  }, [id]);

  const validateName = (value) => {
    if (!value) {
      return "O nome é obrigatório";
    }

    const names = value.trim().split(" ");
    if (names.length < 2) {
      return "Informe pelo menos um nome e um sobrenome";
    }

    return "";
  };

  const validateCPF = (value) => {
    if (!value) {
      return "Campo obrigatório";
    }

    const cleanedCPF = value.replace(/[.-]/g, "");

    if (
      cleanedCPF === "00000000000" ||
      cleanedCPF === "11111111111" ||
      cleanedCPF === "22222222222" ||
      cleanedCPF === "33333333333" ||
      cleanedCPF === "44444444444" ||
      cleanedCPF === "55555555555" ||
      cleanedCPF === "66666666666" ||
      cleanedCPF === "77777777777" ||
      cleanedCPF === "88888888888" ||
      cleanedCPF === "99999999999"
    ) {
      return "CPF inválido";
    }

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleanedCPF.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cleanedCPF.substring(9, 10))) {
      return "CPF inválido";
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleanedCPF.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }

    if (remainder !== parseInt(cleanedCPF.substring(10, 11))) {
      return "CPF inválido";
    }

    return "";
  };

  const validateEmail = (value) => {
    if (!value) {
      return "O email é obrigatório";
    }

    if (!value.includes("@")) {
      return "Email inválido";
    }

    return "";
  };

  const validateAddress = (value) => {
    if (!value) {
      return "O endereço é obrigatório";
    }

    return "";
  };

  const validatePhoneNumber = (value) => {
    if (!value) {
      return "O telefone é obrigatório";
    }

    if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(value)) {
      return "Telefone inválido";
    }

    return "";
  };

  const validateBirthday = (value) => {
    if (!value) {
      return "A data de nascimento é obrigatória";
    }

    const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(value);
    if (!isValidFormat) {
      return "Data de nascimento inválida";
    }

    const currentDate = moment();
    const selectedDate = moment(value);
    const minAge = 18;
    const maxAge = 80;

    if (!selectedDate.isValid()) {
      return "Data de nascimento inválida";
    }

    if (selectedDate.isAfter(currentDate)) {
      return "A data de nascimento não pode ser futura";
    }

    const age = currentDate.diff(selectedDate, "years");
    if (age < minAge || age > maxAge) {
      return `A idade mínima é de ${minAge} anos e a máxima é de ${maxAge} anos`;
    }

    return "";
  };

  const validateAdmissionDate = (value) => {
    if (!value) {
      return "A data de admissão é obrigatória";
    }

    const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(value);
    if (!isValidFormat) {
      return "Data de admissão inválida";
    }

    const currentDate = moment();
    const selectedDate = moment(value);
    const minDate = moment("1971-10-01", "YYYY-MM-DD");
    const ageRequirementDate = moment().subtract(18, "years");

    if (!selectedDate.isValid()) {
      return "Data de admissão inválida";
    }

    if (selectedDate.isBefore(minDate)) {
      return "Data de admissão inválida";
    }

    if (selectedDate.isAfter(currentDate)) {
      return "A data de admissão não pode ser futura";
    }

    if (selectedDate.isBefore(ageRequirementDate)) {
      return "O funcionário deve ter pelo menos 18 anos na data de admissão";
    }

    return "";
  };

  const validateASODate = (value) => {
    if (!value) {
      return "A data de ASO é obrigatória";
    }

    const isValidFormat = /^\d{4}-\d{2}-\d{2}$/.test(value);
    if (!isValidFormat) {
      return "Data de ASO inválida";
    }

    const currentDate = moment();
    const selectedDate = moment(value);
    const maxDate = moment().endOf("day");
    const minDate = moment().subtract(12, "months").startOf("day");

    if (!selectedDate.isValid()) {
      return "Data de ASO inválida";
    }

    if (selectedDate.isAfter(maxDate)) {
      return "A data de ASO não pode ser futura";
    }

    if (selectedDate.isBefore(minDate)) {
      return "A validade do ASO é de 12 meses";
    }

    return "";
  };

  const formatDateForDisplay = (date) => {
    return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
  };

  const formatDateForDatabase = (date) => {
    return moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
  };

  const changeValue = (event) => {
    const { name, value } = event.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateData = async (event) => {
    event.preventDefault();

    const formattedData = {
      ...employeeData,
      birthday: formatDateForDatabase(employeeData.birthday),
      admissiondate: formatDateForDatabase(employeeData.admissiondate),
      asodate: formatDateForDatabase(employeeData.asodate),
    };

    const nameError = validateName(formattedData.name);
    const cpfError = validateCPF(formattedData.cpf);
    const emailError = validateEmail(formattedData.email);
    const addressError = validateAddress(formattedData.address);
    const phoneNumberError = validatePhoneNumber(formattedData.phonenumber);
    const birthdayError = validateBirthday(formattedData.birthday);
    const admissionDateError = validateAdmissionDate(
      formattedData.admissiondate
    );
    const asoDateError = validateASODate(formattedData.asodate);

    const formErrors = {
      name: nameError,
      cpf: cpfError,
      email: emailError,
      address: addressError,
      phonenumber: phoneNumberError,
      birthday: birthdayError,
      admissiondate: admissionDateError,
      asodate: asoDateError,
    };

    setErrors(formErrors);

    if (Object.values(formErrors).every((error) => error === "")) {
      try {
        await axios.put(
          `https://2023-1-nr-control.vercel.app/employee/byId/${id}`,
          formattedData
        );
        navigateTo(`/employee/${id}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="main-edit">
      <Header />
      <div className="box-edit">
        <h1>Editar Dados do Funcionário</h1>
        <div className="info-edit">
          <form onSubmit={updateData}>
            <div className="form-row">
              <div className="form-column">
                <label>
                  Nome:
                  <input
                    className="input-edit"
                    type="text"
                    name="name"
                    value={employeeData.name}
                    onChange={changeValue}
                  />
                  {errors.name && <div className="error">{errors.name}</div>}
                </label>
  
                <label>
                  CPF:
                  <input
                    className="input-edit"
                    type="text"
                    name="cpf"
                    value={employeeData.cpf}
                    onChange={changeValue}
                  />
                  {errors.cpf && <div className="error">{errors.cpf}</div>}
                </label>
  
                <label>
                  Email:
                  <input
                    className="input-edit"
                    type="email"
                    name="email"
                    value={employeeData.email}
                    onChange={changeValue}
                  />
                  {errors.email && <div className="error">{errors.email}</div>}
                </label>
  
                <label>
                  Endereço:
                  <input
                    className="input-edit"
                    type="text"
                    name="address"
                    value={employeeData.address}
                    onChange={changeValue}
                  />
                  {errors.address && (
                    <div className="error">{errors.address}</div>
                  )}
                </label>
  
                <label>
                  Telefone:
                  <input
                    className="input-edit"
                    type="text"
                    name="phonenumber"
                    value={employeeData.phonenumber}
                    onChange={changeValue}
                  />
                  {errors.phonenumber && (
                    <div className="error">{errors.phonenumber}</div>
                  )}
                </label>
              </div>
  
              <div className="form-column">
                <label>
                  Data de Nascimento:
                  <InputMask
                    className="input-edit"
                    mask="99/99/9999"
                    maskPlaceholder="dd/mm/aaaa"
                    type="text"
                    name="birthday"
                    value={employeeData.birthday}
                    onChange={changeValue}
                  />
                  {errors.birthday && (
                    <div className="error">{errors.birthday}</div>
                  )}
                </label>
  
                <label>
                  Data de Admissão:
                  <InputMask
                    className="input-edit"
                    mask="99/99/9999"
                    maskPlaceholder="dd/mm/aaaa"
                    type="text"
                    name="admissiondate"
                    value={employeeData.admissiondate}
                    onChange={changeValue}
                  />
                  {errors.admissiondate && (
                    <div className="error">{errors.admissiondate}</div>
                  )}
                </label>
  
                <label>
                  Data de ASO:
                  <InputMask
                    className="input-edit"
                    mask="99/99/9999"
                    maskPlaceholder="dd/mm/aaaa"
                    type="text"
                    name="asodate"
                    value={employeeData.asodate}
                    onChange={changeValue}
                  />
                  {errors.asodate && (
                    <div className="error">{errors.asodate}</div>
                  )}
                </label>
  
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
                <button className="bnt-edit" type="submit">
                  Salvar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  
}

export default EditEmployeePage;
