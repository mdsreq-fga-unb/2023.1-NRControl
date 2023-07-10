import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./../../assets/images/logo.png";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./Email.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ec5306",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

function Email() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (sent) {
      const timeout = setTimeout(() => {
        setSent(false);
      }, 20000);

      return () => clearTimeout(timeout);
    }
  }, [sent]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3005/api/email", {
        to,
        subject,
        text,
      });

      setSent(true);
      setError(null);
      setTo("");
      setSubject("");
      setText("");
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="main-email">
      <div className="logo">
        <img src={logo} alt="SONDA Engenharia" className="sonda" />
      </div>
      <div className="box-email">
        <h1>Enviar Email</h1>
        <ThemeProvider theme={theme}>
          <div>
            <form
              onSubmit={handleSubmit}
              className={`email-form ${sent ? "success" : ""}`}
            >
              <TextField
                label="Destinatário"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="Email de Destino"
                fullWidth
                required
                InputLabelProps={{
                  style: { color: "#f85605" },
                }}
                InputProps={{
                  className: "textField toField",
                }}
              />

              <TextField
                label="Assunto"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Assunto do Email"
                fullWidth
                required
                InputLabelProps={{
                  style: { color: "#f85605" },
                }}
                InputProps={{
                  className: "textField",
                }}
              />

              <TextField
                label="Mensagem"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Digite sua mensagem aqui..."
                fullWidth
                multiline
                rows={6}
                required
                InputLabelProps={{
                  style: { color: "#f85605" },
                }}
                InputProps={{
                  className: "textField",
                }}
              />

              <Button className="bnt-email" variant="contained" type="submit">
                Enviar
              </Button>
            </form>

            {error && <p>{error}</p>}
            {sent && <p className="success-message">Email Enviado!</p>}
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Email;
