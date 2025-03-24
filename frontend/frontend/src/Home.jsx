import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Twitter Clone</h1>
      <div className="home-buttons">
        <Link to="/register" className="home-button register-button">Registrar</Link>
        <Link to="/login" className="home-button login-button">Entrar</Link>
      </div>
    </div>
  );
};

export default Home;