import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login/LoginPage";
import HomePage from "./pages/home/Home";
import Password from "./pages/password/password";
import PasswordReset from "./pages/passwordReset/PasswordReset";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/senha" element={<Password />} />
        <Route
          path="/api/password-reset/:id/:token"
          element={<PasswordReset />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
