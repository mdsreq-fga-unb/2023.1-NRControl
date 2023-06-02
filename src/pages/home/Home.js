import "./Home.css";
import logo from "./../../assets/images/logo.png";
function HomePage() {
  return (
    <div className="page">
      <div className="header">
        <img src={logo} alt="logo" className="sonda" />
        <h1>
          Sonda <br></br>Engenharia
        </h1>
      </div>
      <div className="container">
        <h1>Cadastrar Funcionário</h1>
      </div>
    </div>
  );
}

export default HomePage;
