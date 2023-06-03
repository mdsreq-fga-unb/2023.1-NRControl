import "./App.css";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import PasswordReset from "./Components/PasswordReset/PasswordReset";
import Senha from "./Components/Senha/Senha";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgot-password" element={<Senha />} />
          <Route
            path="/api/password-reset/:id/:token"
            element={<PasswordReset />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
