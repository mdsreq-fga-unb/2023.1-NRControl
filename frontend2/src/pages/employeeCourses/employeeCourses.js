import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function EmployeePage() {
  let { id } = useParams();
  const [filteredCursos, setFilteredCursos] = useState([]);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3005/comparenames/${id}`)
        .then((response) => {
          setFilteredCursos(response.data);
        });
    }
  }, [id]);

  return (
    <div className="postPage">
      <h1>Funcionário</h1>
      <div className="post" id="individual">
      <ul>
        {filteredCursos.map((curso) => (
          <li key={curso.id}>{curso.nome}</li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default EmployeePage;
