import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { loginUser } from '../utils/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginUser(email, password);
    if (success) {
      history.push('/user-dashboard');
    } else {
      alert('Logowanie nieudane');
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
          <Link to="/signup"><button>Rejestracja</button></Link>
        </div>
      </div>
      <div className="row large">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Logowanie</h2>
          <label htmlFor="email">Login:</label>
          <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          
          <label htmlFor="password">Hasło:</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          
          <button type="submit">Zaloguj</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
