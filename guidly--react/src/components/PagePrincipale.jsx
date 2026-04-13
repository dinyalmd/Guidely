import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PagePrincipale.css';

function PagePrincipale() {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const villes = [
        { id: 1, nom: 'Agadir', photo: 'agadir.webp' },
        { id: 2, nom: 'Meknès', photo: 'meknes.jpg' },
        { id: 3, nom: 'Marrakech', photo: 'marrakech.jpg' },
        { id: 4, nom: 'Rabat', photo: 'rabat.jpg' },
    ];

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="page-principale" style={{ width: '100%' }}>
            <header className="header">
                <div className="logo">GUIDELY</div>
                <div className="auth-buttons">
                    <button className="btn-secondary" onClick={() => navigate('/auth')}>
                        Se connecter
                    </button>
                    <button className="btn-primary" onClick={() => navigate('/auth')}>
                        Créer un compte
                    </button>
                </div>
            </header>

            <main className="main-content">
                <h1 className="main-title">GUIDELY</h1>
                
                <div className="search-container">
                    <div className="search-box">
                        <i className="bi bi-search search-icon"></i>
                        <input 
                            type="text" 
                            placeholder="search..." 
                            className="search-input"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                <div className="villes-container">
                    {villes.map((ville) => (
                        <div key={ville.id} className="ville-card">
                            <div className="ville-header">
                                <h3>{ville.nom}</h3>
                            </div>
                            <div className="ville-photo">
                                <div className="photo-placeholder">
                                  <img src="agadir.webp" alt="" srcset="" />
                                </div>
                            </div>
                            <div className="ville-dots">...</div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default PagePrincipale;