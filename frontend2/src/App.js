import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login/LoginPage";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Password from "./pages/password/password";
import PasswordReset from "./pages/passwordReset/PasswordReset";
import Course from "./pages/Course/Course";
import EmployeePage from "./pages/employee/EmployeePage";
import EmployeeCourses from "./pages/employeeCourses/employeeCourses";
import Email from "./pages/Email/Email";
import EditEmployee from "./pages/editEmployee/EditEmployee";
import EditCourse from "./pages/editCourse/editCourse";
import CourseInfo from "./pages/courseInfo/courseInfo";
import ListOfCourses from "./pages/listOfCourses/listOfCourses";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/enviaremail" element={<Email />} />
        <Route path="/employees" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recuperarsenha" element={<Password />} />
        <Route path="/cursos" element={<Course />} />
        <Route path="/curso/:id" element={<CourseInfo />} />
        <Route path="/cursosdooperario/:id" element={<EmployeeCourses />} />
        <Route path="/employee/:id" element={<EmployeePage />} />
        <Route path="/editEmployee/:id" element={<EditEmployee />} />
        <Route path="/listadecursos" element={<ListOfCourses />} />
        <Route path="/editCourse/:id" element={<EditCourse />} />
        <Route path="/api/password-reset/:id/:token" element={<PasswordReset />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
