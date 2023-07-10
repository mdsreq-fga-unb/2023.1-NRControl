import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

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
        const response = await axios.get(`http://localhost:3005/course/${id}`);
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
      await axios.put(`http://localhost:3005/course/${id}`, courseData);
      navigateTo(`/curso/${id}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1>Editar dados do curso</h1>
      <form onSubmit={updateData}>
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
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default EditCoursePage;
