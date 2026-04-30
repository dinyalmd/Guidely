import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedRole) setRole(storedRole);
  }, []);

  // Fermer le dropdown si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setUser(null);
    setRole(null);
    navigate('/');
  };

  const handleProfileClick = () => {
    setDropdownOpen(false);
    if (role === 'guide') navigate('/dashboard');
    else navigate('/villes');
  };

  const initiale = user?.nom_complet?.charAt(0).toUpperCase();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="src/components/logoGuidely.png" alt="Guidely Logo" className="logo-img" />
      </div>

      <ul className="navbar-links">
        <li><a href="/">Accueil</a></li>
        <li><a href="/villes">Ville</a></li>
        <li><a href="#contact">Contact</a></li>

        {/* Si connecté → afficher avatar + dropdown */}
        {user ? (
          <li className="navbar-profile" ref={dropdownRef}>
            <div className="profile-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className="navbar-avatar">{initiale}</div>
              <span className="navbar-username">{user.nom_complet}</span>
              <span className="navbar-arrow">{dropdownOpen ? '▲' : '▼'}</span>
            </div>

            {dropdownOpen && (
              <div className="navbar-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-avatar">{initiale}</div>
                  <div>
                    <p className="dropdown-name">{user.nom_complet}</p>
                    <p className="dropdown-role">{role === 'guide' ? 'Guide' : 'Touriste'}</p>
                  </div>
                </div>
                <hr className="dropdown-divider" />
                <button className="dropdown-item" onClick={handleProfileClick}>
                  Mon espace
                </button>
                <button className="dropdown-item logout" onClick={handleLogout}>
                  Déconnexion
                </button>
              </div>
            )}
          </li>
        ) : (
          /* Si pas connecté → afficher Connexion */
          <li><a href="/auth">Connexion</a></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;