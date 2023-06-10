import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login/LoginPage";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Password from "./pages/password/password";
import PasswordReset from "./pages/passwordReset/PasswordReset";
import Cursos from "./pages/Curso/Curso";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/recuperarsenha" element={<Password />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/api/password-reset/:id/:token" element={<PasswordReset />}
        />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
