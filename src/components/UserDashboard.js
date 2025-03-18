import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getReservations } from "../scripts/api";

const UserDashboard = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getReservations()
      .then((data) => setReservations(data))
      .catch((error) => console.error("Błąd pobierania rezerwacji:", error));
  }, []);

  return (
    <div className="container">
      <div className="row small">
        <div className="left">
          <Link to="/userDashboard">
            <img src="/public/assets/logo.png" alt="Rover4Me" />
          </Link>
        </div>
        <div className="center">
          <p>Witaj w swoim panelu użytkownika, tu znajdziesz szczegóły swoich rezerwacji rowerów.</p>
        </div>
        <div className="right">
          <div className="add-reservation-container">
            <Link to="/addReservation" className="btn-add-reservation">
              <button>Dodaj nową rezerwację</button>
            </Link>
          </div>
          <div className="add-reservation-container">
            <form action="/logout" method="POST" style={{ display: "inline" }}>
              <button type="submit">Wyloguj się</button>
            </form>
          </div>
        </div>
      </div>

      <div className="row large">
        {reservations.length === 0 ? (
          <p>Brak rezerwacji do wyświetlenia.</p>
        ) : (
          reservations.map((reservation, index) => {
            const bikeTypeValue = {
              Trekkingowy: 1,
              Elektryczny: 2,
              Górski: 3,
              Miejski: 4,
            }[reservation.bike_type];

            return (
              <div key={index} className="reservation-card">
                <h3>Nazwa: {reservation.name}</h3>
                <p>Lokalizacja: {reservation.location}</p>
                <p>Wielkość ramy: {reservation.frame_size}</p>
                <p>Motyw: {reservation.theme}</p>
                <p>Typ roweru: {reservation.bike_type}</p>
                <img
                  src={`/public/assets/bike${bikeTypeValue}.png`}
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
  );
};

export default UserDashboard;
