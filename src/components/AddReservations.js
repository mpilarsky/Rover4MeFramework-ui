import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addReservation } from "../utils/api";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";

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
    backgroundPosition: "fixed",
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
    padding: "10px",
  },

  left: {
    padding: "10px",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    "& img": {
      maxWidth: "100%",
      height: "auto",
      maxHeight: "100px",
      borderRadius: "8px",
    },
  },

  center: {
    paddingLeft: "2vw",
    paddingRight: "2vw",
    fontSize: "1.5rem",
  },

  right: {
    display: "flex",
    flexDirection: "row",
    gap: "20px",
    "& button": {
      padding: "10px 20px",
      backgroundColor: "white",
      color: "black",
      border: "none",
      borderRadius: "20px",
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
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  },

  reservationForm: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
    "& label": {
      fontSize: "1rem",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    "& input, & select, & button": {
      padding: "10px",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "5px",
      width: "100%",
    },
    "& button": {
      backgroundColor: "#811C28",
      color: "white",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      "&:hover": {
        backgroundColor: "#e73348",
      },
    },
  },
});

const AddReservation = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    frame_size: "",
    theme: "Damski",
    date: "",
    start_time: "",
    end_time: "",
    bike_type: "Górski",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReservation(formData);
      navigate("/userDashboard");
    } catch (error) {
      console.error("Błąd przy dodawaniu rezerwacji:", error);
    }
  };

  return (
    <div className={classes.container}>
      <div className={`${classes.row} ${classes.smallRow}`}>
        <div className={classes.left}>
          <Link to="/userDashboard">
            <img src="/assets/logo.png" alt="Rover4Me" />
          </Link>
        </div>
        <div className={classes.center}>
          <h1>Dodaj nową rezerwację</h1>
        </div>
        <div className={classes.right}>
          <Link to="/userDashboard">
            <button>Wróć do panelu</button>
          </Link>
        </div>
      </div>

      <div className={`${classes.row} ${classes.largeRow}`}>
        <form onSubmit={handleSubmit} className={classes.reservationForm}>
          <label htmlFor="name">Nazwa:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

          <label htmlFor="location">Lokalizacja:</label>
          <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />

          <label htmlFor="frame_size">Wielkość ramy:</label>
          <input type="text" id="frame_size" name="frame_size" value={formData.frame_size} onChange={handleChange} required />

          <label htmlFor="theme">Motyw:</label>
          <select id="theme" name="theme" value={formData.theme} onChange={handleChange} required>
            <option value="Damski">Damski</option>
            <option value="Męski">Męski</option>
          </select>

          <label htmlFor="date">Data rezerwacji:</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />

          <label htmlFor="start_time">Godzina rozpoczęcia:</label>
          <input type="time" id="start_time" name="start_time" value={formData.start_time} onChange={handleChange} required />

          <label htmlFor="end_time">Godzina zakończenia:</label>
          <input type="time" id="end_time" name="end_time" value={formData.end_time} onChange={handleChange} required />

          <label htmlFor="bike_type">Typ roweru:</label>
          <select id="bike_type" name="bike_type" value={formData.bike_type} onChange={handleChange} required>
            <option value="Górski">Górski</option>
            <option value="Trekkingowy">Trekkingowy</option>
            <option value="Miejski">Miejski</option>
            <option value="Elektryczny">Elektryczny</option>
          </select>

          <button type="submit">Zapisz</button>
        </form>
      </div>
    </div>
  );
};

export default AddReservation;
// Compare this snippet from src/utils/api.js:
// import axios from "axios";