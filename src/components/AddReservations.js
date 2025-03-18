import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { addReservation } from "../scripts/api";

const AddReservation = () => {
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

  const history = useHistory();

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
      history.push("/userDashboard");
    } catch (error) {
      console.error("Błąd przy dodawaniu rezerwacji:", error);
    }
  };

  return (
    <div className="container">
      <div className="row small">
        <div className="left">
          <Link to="/userDashboard">
            <img src="/public/assets/logo.png" alt="Rover4Me" />
          </Link>
        </div>
        <div className="center">
          <h1>Dodaj nową rezerwację</h1>
        </div>
        <div className="right">
          <Link to="/userDashboard">
            <button>Wróć do panelu</button>
          </Link>
        </div>
      </div>

      <div className="row large">
        <form onSubmit={handleSubmit} className="reservation-form">
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
