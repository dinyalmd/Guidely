import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const [profile, setProfile] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [activeTab, setActiveTab] = useState("profil");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) { navigate("/auth"); return; }
        fetch(`http://localhost:8000/api/guides/${user.id}`)
            .then(r => r.json())
            .then(d => { setProfile(d); setLoading(false); })
            .catch(() => setLoading(false));
        fetch(`http://localhost:8000/api/guides/${user.id}/reservations`)
            .then(r => r.json())
            .then(d => setReservations(Array.isArray(d) ? d : []))
            .catch(() => setReservations([]));
    }, []);

    const initiale = (user?.nom_complet || "G").charAt(0).toUpperCase();

    return (
        <div className="dashboard-page">
            {/* Navbar commune */}
            <Navbar />

            <div className="dashboard">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="sidebar-avatar">
                        <div className="avatar-circle">{initiale}</div>
                        <p className="avatar-name">{user?.nom_complet}</p>
                        <span className="badge-guide">Guide</span>
                    </div>

                    <nav className="sidebar-nav">
                        <button
                            className={`nav-item ${activeTab === "profil" ? "active" : ""}`}
                            onClick={() => setActiveTab("profil")}
                        >
                            Mon Profil
                        </button>
                        <button
                            className={`nav-item ${activeTab === "reservations" ? "active" : ""}`}
                            onClick={() => setActiveTab("reservations")}
                        >
                            Réservations {reservations.length > 0 && `(${reservations.length})`}
                        </button>
                    </nav>
                </aside>

                {/* Main */}
                <main className="dashboard-main">

                    {/* ── Profil ── */}
                    {activeTab === "profil" && (
                        <>
                            <h2 className="section-title">Mon Profil</h2>
                            {loading ? (
                                <p className="loading-text">Chargement...</p>
                            ) : (
                                <div className="profil-card">
                                    <div className="profil-header">
                                        <div className="profil-avatar">{initiale}</div>
                                        <div>
                                            <h3 className="profil-name">{profile?.nom_complet || user?.nom_complet}</h3>
                                            <p className="profil-email">{profile?.email || user?.email}</p>
                                        </div>
                                    </div>

                                    {profile && (
                                        <>
                                            <div className="profil-grid">
                                                <div className="profil-item">
                                                    <span className="profil-label">Ville couverte</span>
                                                    <span className="profil-value">{profile.ville_couverte}</span>
                                                </div>
                                                <div className="profil-item">
                                                    <span className="profil-label">Prix par jour</span>
                                                    <span className="profil-value">{profile.prix_par_jour} MAD</span>
                                                </div>
                                                <div className="profil-item">
                                                    <span className="profil-label">Langues</span>
                                                    <span className="profil-value">{profile.langues}</span>
                                                </div>
                                                <div className="profil-item">
                                                    <span className="profil-label">N° CNI</span>
                                                    <span className="profil-value">{profile.num_cni}</span>
                                                </div>
                                            </div>
                                            <div className="bio-box">
                                                <span className="profil-label">Biographie</span>
                                                <p className="bio-text">{profile.biographie}</p>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}
                        </>
                    )}

                    {/* ── Réservations ── */}
                    {activeTab === "reservations" && (
                        <>
                            <h2 className="section-title">Mes Réservations</h2>
                            {reservations.length === 0 ? (
                                <div className="empty-state">
                                    <div className="empty-icon">📭</div>
                                    <p>Aucune réservation pour le moment.</p>
                                </div>
                            ) : (
                                <div className="res-list">
                                    {reservations.map((res, i) => (
                                        <div className="res-card" key={i}>
                                            <div>
                                                <h4 className="res-name">{res.touriste_nom || "Touriste"}</h4>
                                                <p className="res-detail">{res.date}</p>
                                                <p className="res-detail">{res.ville}</p>
                                            </div>
                                            <span className={`res-status status-${res.statut || "en_attente"}`}>
                                                {res.statut || "en attente"}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}

export default Dashboard;