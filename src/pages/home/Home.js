import "./Home.css";
import React from "react";
import logo from "./../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { BsFillPersonPlusFill, BsFillPersonLinesFill } from "react-icons/bs";

function HomePage() {
  const navigate = useNavigate();
  const goToRegister = () => {
    navigate("/register");
  };
  return (
    <div className="main-home">
      <div className="sonda">
        <img src={logo} alt="logo" className="logo-img" />
        <div className="img-titulo">
          <h1>
            Sonda <br></br>Engenharia
          </h1>
        </div>
        <div className="sidebar">
          <div className="icons-sidebar">
            <BsFillPersonPlusFill onClick={goToRegister} />
            <BsFillPersonLinesFill />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
