import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Villes.css";

import agadir from "./agadir.webp";
import tanger from "./TANGER.jpg";
import rabat from "./Rabat_accueil.jpg";
import marrakech from "./jamaa_fana_marrakech.jpg";

const VILLES = [
    { nom: "Tanger", description: "La porte de l'Afrique, où l'Europe rencontre le Maroc avec ses cafés légendaires et sa médina animée.", image: tanger, guides: 8, couleur: "#1a6b8a" },
    { nom: "Rabat", description: "La capitale royale, ville de culture et d'histoire avec ses remparts, sa kasbah et son architecture andalouse.", image: rabat, guides: 12, couleur: "#6b1a8a" },
    { nom: "Marrakech", description: "La ville rouge et ses souks colorés, la place Jemaa el-Fna et les jardins Majorelle — un voyage des sens.", image: marrakech, guides: 24, couleur: "#8a3a1a" },
    { nom: "Agadir", description: "La perle du Souss, avec sa magnifique plage, son souk moderne et les montagnes de l'Atlas en toile de fond.", image: agadir, guides: 10, couleur: "#1a6b4a" },
];

function VilleCard({ ville, onClick }) {
    const [imgError, setImgError] = useState(false);

    return (
        <div className="ville-card" onClick={() => onClick(ville)}>
            {!imgError ? (
                <img src={ville.image} alt={ville.nom} className="ville-img" onError={() => setImgError(true)} />
            ) : (
                <div className="ville-img-fallback" style={{ background: `linear-gradient(135deg, ${ville.couleur} 0%, ${ville.couleur}99 100%)` }}>
                    🏙️
                </div>
            )}
            <div className="ville-body">
                <h3 className="ville-title">{ville.nom}</h3>
                <p className="ville-desc">{ville.description}</p>
                <div className="ville-footer">
                    <span className="guides-count">{ville.guides} guides</span>
                    <button
                        className="voir-btn"
                        style={{ background: ville.couleur }}
                        onClick={(e) => { e.stopPropagation(); onClick(ville); }}
                    >
                        Voir les guides →
                    </button>
                </div>
            </div>
        </div>
    );
}

function Villes() {
    const navigate = useNavigate();

    const handleVilleClick = (ville) => {
        alert(`Guides disponibles à ${ville.nom} — page à créer !`);
    };

    return (
        <div className="villes-page">
            {/* Navbar commune */}
            <Navbar />

            {/* Hero */}
            <div className="villes-hero">
                <h2 className="hero-title">Explorez le Maroc</h2>
                <p className="hero-sub">Choisissez une ville et trouvez votre guide local idéal</p>
            </div>

            {/* Grille des villes */}
            <div className="villes-content">
                <p className="villes-section-title">Villes disponibles ({VILLES.length})</p>
                <div className="villes-grid">
                    {VILLES.map((ville) => (
                        <VilleCard key={ville.nom} ville={ville} onClick={handleVilleClick} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Villes;