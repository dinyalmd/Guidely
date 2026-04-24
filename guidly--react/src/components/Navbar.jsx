import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="src/components/logo_guidly.png" alt="Guidely Logo" className="logo-img" />
      </div>
      <ul className="navbar-links">
        <li><a href="/">Accueil</a></li>
        <li><a href="/ville">Ville</a></li>
        <li><a href="/contact">Contact</a></li>
       <li><a href="/auth">Connexion</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;