import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./courseInfo.css";
import Header from "../Header/header";
import moment from "moment";

function CourseInfo() {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

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
        .get(`http://localhost:3005/course/${id}`)
        .then((response) => {
          setCourse(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const editCourseData = () => {
    navigateTo(`/editCourse/${id}`);
  };

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const downloadFile = () => {
    console.log("Download iniciado");
    if (course && course.fileUrl) {
      window.open(course.fileUrl, "_blank");
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      axios
        .post(`http://localhost:3005/file/${id}`, formData)
        .then((response) => {
          console.log("Arquivo enviado com sucesso!", response.data);
          setSuccessMessage("Arquivo enviado com sucesso!");
          setTimeout(() => {
            setSuccessMessage("");
          }, 3000);
        })
        .catch((error) => {
          console.error("Erro ao enviar arquivo:", error);
        });
    }
  };

  return (
    <div>
      <div className="main-table">
        <div className="table-employees">
          <div className="header" onClick={goToEmployees}>
            <Header />
          </div>
          <h2>Informações do Curso</h2>
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
              {course && (
                <tr>
                  <td>
                    <div className="name">{course.course}</div>
                  </td>
                  <td>
                    <div className="info">{course.info}</div>
                  </td>
                  <td>
                    <div className="conclusiondate">
                      {formatDate(course.conclusiondate)}
                    </div>
                  </td>
                  <td>
                    <div className="expirationdate">
                      {formatDate(course.expirationdate)}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="box-bnt-editar">
            <button onClick={editCourseData} className="bnt-editar">
              Editar
            </button>
            {course && course.fileUrl && (
              <button onClick={downloadFile} className="download-button">
                Baixar Arquivo
              </button>
            )}
            <div>
              <input type="file" onChange={handleFileChange} />
              <button onClick={uploadFile}>Enviar Arquivo</button>
            </div>
            {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseInfo;
