import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./editCourse.css";
import Header from "../Header/header";

function EditCoursePage() {
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [courseData, setCourseData] = useState({
    name: "",
    course: "",
    info: "",
    conclusiondate: "",
    expirationdate: "",
  });

  useEffect(() => {
    const showCourseData = async () => {
      try {
        const response = await axios.get(
          `https://2023-1-nr-control.vercel.app/course/${id}`
        );
        setCourseData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    showCourseData();
  }, [id]);

  const changeValue = (event) => {
    const { name, value } = event.target;
    setCourseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const updateData = async (event) => {
    event.preventDefault();

    try {
      await axios.put(
        `https://2023-1-nr-control.vercel.app/course/${id}`,
        courseData
      );
      navigateTo(`/curso/${id}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="main-edit-course">
      <Header />
      <form onSubmit={updateData} className="box-edit-course">
        <h1>Editar dados do curso</h1>
        <div className="container-edit-course-info">
          <div>
            <label>
              Curso:
              <input
                type="text"
                name="course"
                value={courseData.course}
                onChange={changeValue}
              />
            </label>
          </div>
          <div>
            <label>
              Informações:
              <input
                type="text"
                name="info"
                value={courseData.info}
                onChange={changeValue}
              />
            </label>
          </div>
          <div>
            <label>
              Data de conclusão:
              <input
                type="date"
                name="conclusiondate"
                value={courseData.conclusiondate}
                onChange={changeValue}
              />
            </label>
          </div>
          <div>
            <label>
              Data de expiração:
              <input
                type="date"
                name="expirationdate"
                value={courseData.expirationdate}
                onChange={changeValue}
              />
            </label>
          </div>
        </div>
        <div className="box-bnt-editar">
          <button className="bnt-editar" type="submit">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCoursePage;
