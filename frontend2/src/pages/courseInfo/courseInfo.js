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
        .get(`https://2023-1-nr-control.vercel.app/course/${id}`)
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
        .post(
          `https://2023-1-nr-control.vercel.app/course/file/${id}`,
          formData
        )
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
        <Header />
        <div className="table-employees">
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
                    <div className="custom-name">{course.course}</div>
                  </td>
                  <td>
                    <div className="custom-info">{course.info}</div>
                  </td>
                  <td>
                    <div className="custom-conclusiondate">
                      {formatDate(course.conclusiondate)}
                    </div>
                  </td>
                  <td>
                    <div className="custom-expirationdate">
                      {formatDate(course.expirationdate)}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="custom-box-bnt-editar">
            <button onClick={editCourseData} className="custom-bnt-editar">
              Editar
            </button>
            {course && course.fileUrl && (
              <button onClick={downloadFile} className="custom-bnt-download">
                Download do certificado
              </button>
            )}
            <input
              className="custom-input-editar"
              type="file"
              onChange={handleFileChange}
            />
            <button className="custom-bnt-arquivo" onClick={uploadFile}>
              Enviar certificado
            </button>
          </div>
          {successMessage && (
            <div className="custom-success-message">{successMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseInfo;
