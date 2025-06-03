import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../utils/api";
import { createUseStyles } from "react-jss";
import logo from "../assets/logo.png";

const useStyles = createUseStyles({
  body: {
    fontFamily: "'Comic Sans MS', cursive, sans-serif",
    margin: 0,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    color: "white",
    background: "linear-gradient(to bottom, #e73348 20%, #811c28cc 80%)",
    backgroundSize: "cover",
    backgroundBlendMode: "overlay",
    position: "relative",

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "url('/assets/background.jpg') center/cover no-repeat",
      opacity: 0.2,
      zIndex: -1,
    },
  },

  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100vh",
    fontSize: "1.2rem",
  },

  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "1.5rem",
  },

  smallRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },

  left: {
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,

    "& img": {
      maxWidth: "100%",
      height: "auto",
      maxHeight: 100,
      borderRadius: 8,
    },
  },

  center: {
    padding: "0 2vw",
    fontSize: "1.5rem",
  },

  right: {
    display: "flex",
    flexDirection: "row",
    gap: 20,

    "& button": {
      padding: "10px 20px",
      backgroundColor: "white",
      color: "black",
      border: "none",
      borderRadius: 20,
      cursor: "pointer",
      fontSize: "1rem",
      transition: "background-color 0.3s ease",

      "&:hover": {
        backgroundColor: "#811C28",
        color: "white",
      },
    },
  },

  largeRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    padding: 30,
    width: "100%",
    maxWidth: 400,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    margin: "0 auto",
    boxSizing: "border-box",
    textAlign: "left",
  },

  formTitle: {
    marginBottom: 20,
    color: "#811c28",
  },

  label: {
    fontSize: "1rem",
    color: "#333",
    marginTop: 10,
    textAlign: "left",
    width: "100%",
  },

  input: {
    width: "100%",
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
    border: "1px solid #ccc",
    borderRadius: 6,
    fontSize: "1rem",
  },

  checkboxContainer: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
    width: "100%",
  },

  button: {
    width: "100%",
    padding: "10px 20px",
    backgroundColor: "#811c28",
    color: "white",
    border: "none",
    borderRadius: 20,
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background-color 0.3s ease",

    "&:hover": {
      backgroundColor: "#e73348",
    },

    "&:disabled": {
      backgroundColor: "#ccc",
      cursor: "not-allowed",
    },
  },
});

function Signup() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    age: "",
    email: "",
    password: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!termsAccepted) return;

  try {
    await signupUser(formData);
    navigate("/login");
  } catch (error) {
    alert(error.message);
  }
};


  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <div className={`${classes.row} small`}>
          <div className={classes.left}>
            <Link to="/">
              <img src={logo} alt="Rover4Me" />
            </Link>
          </div>
          <div className={classes.center}>
            <p>Rover4Me to aplikacja, która pozwoli ci na szybkie wynajęcie roweru...</p>
          </div>
          <div className={classes.right}>
            <Link to="/login">
              <button className={classes.button}>Logowanie</button>
            </Link>
          </div>
        </div>
        <div className={`${classes.row} ${classes.largeRow}`}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <h2 className={classes.formTitle}>Rejestracja</h2>

            <label className={classes.label} htmlFor="name">Imię:</label>
            <input className={classes.input} type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

            <label className={classes.label} htmlFor="surname">Nazwisko:</label>
            <input className={classes.input} type="text" id="surname" name="surname" value={formData.surname} onChange={handleChange} required />

            <label className={classes.label} htmlFor="age">Wiek:</label>
            <input className={classes.input} type="number" id="age" name="age" value={formData.age} onChange={handleChange} min="18" required />

            <label className={classes.label} htmlFor="email">Email:</label>
            <input className={classes.input} type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

            <label className={classes.label} htmlFor="password">Hasło:</label>
            <input className={classes.input} type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

            <div className={classes.checkboxContainer}>
              <input type="checkbox" id="terms" name="terms" onChange={() => setTermsAccepted(!termsAccepted)} required />
              <label htmlFor="terms">Akceptuję regulamin</label>
            </div>

            <button className={classes.button} type="submit" disabled={!termsAccepted}>Zarejestruj</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
