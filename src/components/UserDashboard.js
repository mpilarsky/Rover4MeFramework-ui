import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getReservations } from "../utils/api";
import { createUseStyles } from "react-jss";

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
  },
  largeRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px",
  },
  reservationCard: {
    minWidth: "300px",
    maxWidth: "300px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    color: "black",
    borderRadius: "10px",
    margin: "10px",
    padding: "15px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
    flex: "0 0 auto",
    "& img": {
      maxWidth: "100%",
      maxHeight: "100%",
      objectFit: "contain",
      borderRadius: "8px",
    },
  },
  addReservationContainer: {
    textAlign: "center",
    margin: "20px 0",
  },
  btnAddReservation: {
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    "&:hover": {
      backgroundColor: "#0056b3",
      transform: "scale(1.05)",
    },
    "&:active": {
      backgroundColor: "#004494",
      transform: "scale(0.95)",
    },
  },
});

const UserDashboard = () => {
  const classes = useStyles();
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getReservations()
      .then((data) => setReservations(data))
      .catch((error) => console.error("Błąd pobierania rezerwacji:", error));
  }, []);

  return (
    <div className={classes.body}>
      <div className={classes.container}>
        <div className={`${classes.row} ${classes.smallRow}`}>
          <div className={classes.left}>
            <Link to="/userDashboard">
              <img src={`${process.env.PUBLIC_URL}/assets/logo.png`} alt="Rover4Me" />
            </Link>
          </div>
          <div className={classes.center}>
            <p>Witaj w swoim panelu użytkownika, tu znajdziesz szczegóły swoich rezerwacji rowerów.</p>
          </div>
          <div className={classes.right}>
            <div className={classes.addReservationContainer}>
              <Link to="/addReservations">
                <button className={classes.btnAddReservation}>Dodaj nową rezerwację</button>
              </Link>
            </div>
            <div className={classes.addReservationContainer}>
              <form action="/logout" method="POST" style={{ display: "inline" }}>
                <button type="submit">Wyloguj się</button>
              </form>
            </div>
          </div>
        </div>

        <div className={`${classes.row} ${classes.largeRow}`}>
          {reservations.length === 0 ? (
            <p>Brak rezerwacji do wyświetlenia.</p>
          ) : (
            reservations.map((reservation, index) => {
              const bikeTypeValue = {
                Trekkingowy: 1,
                Elektryczny: 2,
                Górski: 3,
                Miejski: 4,
              }[reservation.bike_type] || 0; // Domyślnie 0, jeśli brak dopasowania

              return (
                <div key={index} className={classes.reservationCard}>
                  <h3>Nazwa: {reservation.name}</h3>
                  <p>Lokalizacja: {reservation.location}</p>
                  <p>Wielkość ramy: {reservation.frame_size}</p>
                  <p>Motyw: {reservation.theme}</p>
                  <p>Typ roweru: {reservation.bike_type}</p>
                  <img
                    src={`${process.env.PUBLIC_URL}/assets/bike${bikeTypeValue}.png`}
                    alt={`Rower typu ${reservation.bike_type}`}
                  />
                  <p>
                    Start: {reservation.reservation_date} o godzinie {reservation.start_time}
                  </p>
                  <p>Koniec: {reservation.end_time}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
// Note: Ensure that the bike images are named correctly and placed in the assets folder as per the bikeTypeValue mapping.
// The bike images should be named bike1.png, bike2.png, etc., corresponding to the bike types. 