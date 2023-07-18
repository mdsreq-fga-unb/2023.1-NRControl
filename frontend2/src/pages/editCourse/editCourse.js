import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import InputMask from "react-input-mask";
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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const showCourseData = async () => {
      try {
        const response = await axios.get(
          `https://2023-1-nr-control.vercel.app/course/${id}`
        );

        const formattedData = {
          ...response.data,
          conclusiondate: moment(response.data.conclusiondate).format("DD/MM/YYYY"),
          expirationdate: moment(response.data.expirationdate).format("DD/MM/YYYY"),
        };
        setCourseData(formattedData);

      } catch (error) {
        console.error(error);
      }
    };


    showCourseData();
  }, [id]);

  const formatDateForDisplay = (date) => {
    return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
  };

  const formatDateForDatabase = (date) => {
    return moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
  };

  const changeValue = (event) => {
    const { name, value } = event.target;

    if (name === "conclusiondate" || name === "expirationdate") {
      setCourseData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      setCourseData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!courseData.course) {
      newErrors.course = "O código do curso é obrigatório";
    }

    if (!courseData.info) {
      newErrors.info = "As informações do curso são obrigatórias";
    }

    if (!courseData.conclusiondate) {
      newErrors.conclusiondate = "A data de conclusão do curso é obrigatória";
    } else {
      const currentDate = moment();
      const conclusionDate = moment(courseData.conclusiondate, "DD/MM/YYYY");

      if (conclusionDate.isBefore("2010-01-01") || conclusionDate.isAfter(currentDate)) {
        newErrors.conclusiondate = "A data de conclusão do curso deve estar entre 2010 e a data atual";
      }
    }

    if (!courseData.expirationdate) {
      newErrors.expirationdate = "A data de expiração do curso é obrigatória";
    } else {
      const currentDate = moment();
      const conclusionDate = moment(courseData.conclusiondate, "DD/MM/YYYY");
      const expirationDate = moment(courseData.expirationdate, "DD/MM/YYYY");
      const maxExpirationDate = moment().add(10, "years");

      if (expirationDate.isBefore(conclusionDate)) {
        newErrors.expirationdate = "A data de expiração do curso não pode ser anterior à data de conclusão";
      }

      if (expirationDate.isBefore(currentDate)) {
        newErrors.expirationdate = "A data de expiração do curso não pode ser anterior à data atual";
      }

      if (expirationDate.isAfter(maxExpirationDate)) {
        newErrors.expirationdate = "A data de expiração do curso deve ser no máximo 10 anos a partir da data atual";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 

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


    if (validateForm()) {
      const formattedData = {
        ...courseData,
        conclusiondate: formatDateForDatabase(courseData.conclusiondate),
        expirationdate: formatDateForDatabase(courseData.expirationdate),
      };

      try {
        await axios.put(`http://localhost:3005/course/${id}`, courseData);
        navigateTo(`/curso/${id}`);
      } catch (error) {
        console.error(error);
      }
    }
  };

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

              {errors.course && <span className="error">{errors.course}</span>}

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

              {errors.info && <span className="error">{errors.info}</span>}

            </label>
          </div>
          <div>
            <label>
              Data de conclusão:

              <InputMask
                mask="99/99/9999"
                type="text"
                name="conclusiondate"
                value={courseData.conclusiondate}
                onChange={changeValue}
                placeholder="dd/mm/aaaa"
              />
              {errors.conclusiondate && <span className="error">{errors.conclusiondate}</span>}

          
            </label>
          </div>
          <div>
            <label>
              Data de expiração:

              <InputMask
                mask="99/99/9999"
                type="text"
                name="expirationdate"
                value={courseData.expirationdate}
                onChange={changeValue}
                placeholder="dd/mm/aaaa"
              />
              {errors.expirationdate && <span className="error">{errors.expirationdate}</span>}

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
