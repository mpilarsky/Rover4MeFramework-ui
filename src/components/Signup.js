import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { signupUser } from '../utils/api';

function Signup() {
  const [formData, setFormData] = useState({ name: '', surname: '', age: '', email: '', password: '' });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (termsAccepted) {
      const success = await signupUser(formData);
      if (success) {
        history.push('/login');
      } else {
        alert('Rejestracja nieudana');
      }
    }
  };

  return (
    <div className="container">
      <div className="row small">
        <div className="left">
          <Link to="/"><img src="public/assets/logo.png" alt="Rover4Me" /></Link>
        </div>
        <div className="center">
          <p>Rover4Me to aplikacja, która pozwoli ci na szybkie wynajęcie roweru...</p>
        </div>
        <div className="right">
          <Link to="/login"><button>Logowanie</button></Link>
        </div>
      </div>
      <div className="row large">
        <form className="register-form" onSubmit={handleSubmit}>
          <h2>Rejestracja</h2>
          <label htmlFor="name">Imię:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

          <label htmlFor="surname">Nazwisko:</label>
          <input type="text" id="surname" name="surname" value={formData.surname} onChange={handleChange} required />

          <label htmlFor="age">Wiek:</label>
          <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} min="18" required />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

          <label htmlFor="password">Hasło:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

          <div className="checkbox-container">
            <input type="checkbox" id="terms" name="terms" onChange={() => setTermsAccepted(!termsAccepted)} required />
            <label htmlFor="terms">Akceptuję regulamin</label>
          </div>

          <button type="submit" disabled={!termsAccepted}>Zarejestruj</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
