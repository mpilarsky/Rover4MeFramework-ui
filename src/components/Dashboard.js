import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className="container">
      <div className="row small">
        <div className="left">
          <img src="public/assets/logo.png" alt="Rover4Me" />
        </div>
        <div className="center">
          <p>Rover4Me to aplikacja która pozwoli ci na szybkie wynajęcie roweru...</p>
        </div>
        <div className="right">
          <Link to="/login"><button>Logowanie</button></Link>
          <Link to="/signup"><button>Rejestracja</button></Link>
        </div>
      </div>
      <div className="row large">
        <div className="tile">
          <img src="public/assets/tile1.png" alt="Opis 1" />
          <p>Zarejestruj się</p>
        </div>
        <div className="tile">
          <img src="public/assets/tile2.png" alt="Opis 2" />
          <p>Dokonaj rezerwacji</p>
        </div>
        <div className="tile">
          <img src="public/assets/tile3.png" alt="Opis 3" />
          <p>Śmigaj do celu</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
