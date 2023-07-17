import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FiBell } from "react-icons/fi";
import "./listOfCourses.css";
import Header from "../Header/header";

const ListOfCourses = () => {
  const navigateTo = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;
  const [expiredCourses, setExpiredCourses] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationIndex, setNotificationIndex] = useState(0);

  const goToEmployees = () => {
    navigateTo("/employees");
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const pageNumbers = Math.ceil(users.length / usersPerPage);
  const pages = Array.from({ length: pageNumbers }, (_, i) => i + 1);

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const showCourseExpiredNotification = (user) => {
    if (Notification.permission === "granted") {
      new Notification(`Curso expirado para ${user.name}`, {
        body: `Data de expiração: ${formatDate(user.expirationdate)}`,
      });
    }
  };

  const showAllNotifications = () => {
    const expiredCourses = users.filter((user) =>
      moment().isAfter(user.expirationdate)
    );

    if (Notification.permission === "granted") {
      expiredCourses.forEach((user) => {
        showCourseExpiredNotification(user);
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          expiredCourses.forEach((user) => {
            showCourseExpiredNotification(user);
          });
        }
      });
    }
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigateTo("/");
    }
  }, [navigateTo]);

  useEffect(() => {
    axios
      .get("http://localhost:3005/course")
      .then((response) => {
        const sortedUsers = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setUsers(sortedUsers);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    const expired = users.filter((user) =>
      moment().isAfter(user.expirationdate)
    );
    setExpiredCourses(expired);
  }, [currentPage, users]);

  useEffect(() => {
    let timeoutId;

    if (showNotification && expiredCourses.length > 0) {
      timeoutId = setTimeout(() => {
        showCourseExpiredNotification(
          expiredCourses[notificationIndex % expiredCourses.length]
        );
        setNotificationIndex((prevIndex) => prevIndex + 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showNotification, expiredCourses, notificationIndex]);

  const handleNotificationClick = () => {
    setShowNotification(!showNotification);

    if (!showNotification && expiredCourses.length > 0) {
      showAllNotifications();
    }
  };

  return (
    <div className="page-container">
      <div className="content-container">
        <Header />
        <div className="title">
          <h1>Lista de cursos</h1>
          <button
            className={`notification-button ${
              showNotification ? "active" : ""
            }`}
            onClick={handleNotificationClick}
          >
            <FiBell className="notification-icon" />
            {showNotification && expiredCourses.length > 0 && (
              <span className="notification-count">
                {expiredCourses.length}
              </span>
            )}
          </button>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Funcionário</th>
                <th>Código do curso</th>
                <th>Info</th>
                <th>Data de Conclusão</th>
                <th>Data de Expiração</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td className="course-column">{user.course}</td>
                  <td>{user.info}</td>
                  <td>{formatDate(user.conclusiondate)}</td>
                  <td>
                    {formatDate(user.expirationdate)}
                    {moment().isAfter(user.expirationdate) && (
                      <button
                        className="notification-button"
                        onClick={() => showAllNotifications()}
                      >
                        <FiBell className="notification-icon" />
                        <span className="notification-count">
                          {expiredCourses.length}
                        </span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          {pages.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => paginate(pageNumber)}
              className={currentPage === pageNumber ? "active" : ""}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListOfCourses;
