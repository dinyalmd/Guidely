import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const API = "http://localhost:8000/api/admin";

function AdminDashboard() {
    const navigate = useNavigate();
    const admin = JSON.parse(localStorage.getItem("admin") || "null");

    const [activeTab, setActiveTab] = useState("dashboard");
    const [stats, setStats] = useState(null);
    const [guides, setGuides] = useState([]);
    const [touristes, setTouristes] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (!admin || localStorage.getItem("role") !== "admin") {
            navigate("/admin/login");
            return;
        }
        loadStats();
    }, []);

    useEffect(() => {
        if (activeTab === "guides") loadGuides();
        else if (activeTab === "touristes") loadTouristes();
        else if (activeTab === "reservations") loadReservations();
        else if (activeTab === "dashboard") loadStats();
    }, [activeTab]);

    const showToast = (msg, type = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const loadStats = async () => {
        setLoading(true);
        try {
            const r = await fetch(`${API}/stats`);
            setStats(await r.json());
        } catch {}
        setLoading(false);
    };

    const loadGuides = async () => {
        setLoading(true);
        try {
            const r = await fetch(`${API}/guides`);
            setGuides(await r.json());
        } catch {}
        setLoading(false);
    };

    const loadTouristes = async () => {
        setLoading(true);
        try {
            const r = await fetch(`${API}/touristes`);
            setTouristes(await r.json());
        } catch {}
        setLoading(false);
    };

    const loadReservations = async () => {
        setLoading(true);
        try {
            const r = await fetch(`${API}/reservations`);
            setReservations(await r.json());
        } catch {}
        setLoading(false);
    };

    const validerGuide = async (id) => {
        await fetch(`${API}/guides/${id}/valider`, { method: "PUT" });
        showToast("Guide validé !");
        loadGuides();
        loadStats();
    };

    const supprimerGuide = async (id) => {
        if (!confirm("Supprimer ce guide ?")) return;
        await fetch(`${API}/guides/${id}`, { method: "DELETE" });
        showToast("Guide supprimé.", "error");
        loadGuides();
        loadStats();
    };

    const supprimerTouriste = async (id) => {
        if (!confirm("Supprimer ce touriste ?")) return;
        await fetch(`${API}/touristes/${id}`, { method: "DELETE" });
        showToast("Touriste supprimé.", "error");
        loadTouristes();
        loadStats();
    };

    const updateStatutRes = async (id, statut) => {
        await fetch(`${API}/reservations/${id}/statut`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ statut }),
        });
        showToast("Statut mis à jour !");
        loadReservations();
    };

    const supprimerReservation = async (id) => {
        if (!confirm("Supprimer cette réservation ?")) return;
        await fetch(`${API}/reservations/${id}`, { method: "DELETE" });
        showToast("Réservation supprimée.", "error");
        loadReservations();
    };

    const handleLogout = () => {
        localStorage.removeItem("admin");
        localStorage.removeItem("role");
        navigate("/admin/login");
    };

    const initiale = (admin?.email || "A").charAt(0).toUpperCase();

    const TABS = [
        { key: "dashboard",    label: "Tableau de bord", icon: "bi-grid-fill" },
        { key: "guides",       label: "Guides",          icon: "bi-geo-alt-fill" },
        { key: "touristes",    label: "Touristes",       icon: "bi-people-fill" },
        { key: "reservations", label: "Réservations",    icon: "bi-calendar-check-fill" },
    ];

    return (
        <div className="adm-layout">
            {/* Toast */}
            {toast && (
                <div className={`adm-toast adm-toast-${toast.type}`}>
                    <i className={`bi ${toast.type === "success" ? "bi-check-circle-fill" : "bi-trash-fill"}`}></i>
                    {toast.msg}
                </div>
            )}

            {/* Sidebar */}
            <aside className="adm-sidebar">
                <div className="adm-sidebar-brand">
                    <span className="adm-brand-dot">G</span>
                    <span className="adm-brand-text">Guidely</span>
                </div>

                <div className="adm-sidebar-user">
                    <div className="adm-user-avatar">{initiale}</div>
                    <div>
                        <p className="adm-user-email">{admin?.email}</p>
                        <span className="adm-user-badge">Administrateur</span>
                    </div>
                </div>

                <nav className="adm-sidebar-nav">
                    {TABS.map(t => (
                        <button
                            key={t.key}
                            className={`adm-nav-item ${activeTab === t.key ? "active" : ""}`}
                            onClick={() => setActiveTab(t.key)}
                        >
                            <i className={`bi ${t.icon}`}></i>
                            {t.label}
                        </button>
                    ))}
                </nav>

                <button className="adm-logout-btn" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-left"></i>
                    Déconnexion
                </button>
            </aside>

            {/* Main */}
            <main className="adm-main">
                <header className="adm-header">
                    <h1 className="adm-page-title">
                        {TABS.find(t => t.key === activeTab)?.label}
                    </h1>
                </header>

                <div className="adm-content">

                    {/* ── Dashboard ── */}
                    {activeTab === "dashboard" && (
                        <div className="adm-dash">
                            {loading ? <p className="adm-loading">Chargement...</p> : (
                                <>
                                    <div className="adm-stats-grid">
                                        <div className="adm-stat-card adm-stat-green">
                                            <div className="adm-stat-icon"><i className="bi bi-geo-alt-fill"></i></div>
                                            <div className="adm-stat-num">{stats?.total_guides ?? 0}</div>
                                            <div className="adm-stat-label">Guides total</div>
                                        </div>
                                        <div className="adm-stat-card adm-stat-gold">
                                            <div className="adm-stat-icon"><i className="bi bi-hourglass-split"></i></div>
                                            <div className="adm-stat-num">{stats?.guides_en_attente ?? 0}</div>
                                            <div className="adm-stat-label">En attente validation</div>
                                        </div>
                                        <div className="adm-stat-card adm-stat-blue">
                                            <div className="adm-stat-icon"><i className="bi bi-people-fill"></i></div>
                                            <div className="adm-stat-num">{stats?.total_touristes ?? 0}</div>
                                            <div className="adm-stat-label">Touristes inscrits</div>
                                        </div>
                                        <div className="adm-stat-card adm-stat-purple">
                                            <div className="adm-stat-icon"><i className="bi bi-calendar-check-fill"></i></div>
                                            <div className="adm-stat-num">{stats?.total_reservations ?? 0}</div>
                                            <div className="adm-stat-label">Réservations total</div>
                                        </div>
                                    </div>

                                    <div className="adm-res-summary">
                                        <h3 className="adm-section-subtitle">Réservations par statut</h3>
                                        <div className="adm-res-bars">
                                            <div className="adm-res-bar-item">
                                                <span className="adm-dot adm-dot-green"></span>
                                                <span>Confirmées</span>
                                                <span className="adm-bar-num">{stats?.res_confirmees ?? 0}</span>
                                            </div>
                                            <div className="adm-res-bar-item">
                                                <span className="adm-dot adm-dot-gold"></span>
                                                <span>En attente</span>
                                                <span className="adm-bar-num">{stats?.res_en_attente ?? 0}</span>
                                            </div>
                                            <div className="adm-res-bar-item">
                                                <span className="adm-dot adm-dot-red"></span>
                                                <span>Annulées</span>
                                                <span className="adm-bar-num">{stats?.res_annulees ?? 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* ── Guides ── */}
                    {activeTab === "guides" && (
                        <div className="adm-table-wrap">
                            {loading ? <p className="adm-loading">Chargement...</p> : (
                                <table className="adm-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nom</th>
                                            <th>Email</th>
                                            <th>Ville</th>
                                            <th>Prix/jour</th>
                                            <th>Statut</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {guides.length === 0 ? (
                                            <tr><td colSpan={7} className="adm-empty">Aucun guide inscrit.</td></tr>
                                        ) : guides.map(g => (
                                            <tr key={g.id}>
                                                <td className="adm-td-id">{g.id}</td>
                                                <td className="adm-td-name">
                                                    <div className="adm-avatar-mini">{g.nom_complet?.charAt(0)}</div>
                                                    {g.nom_complet}
                                                </td>
                                                <td>{g.email}</td>
                                                <td>{g.ville_couverte}</td>
                                                <td>{g.prix_par_jour} MAD</td>
                                                <td>
                                                    <span className={`adm-badge adm-badge-${g.statut === "validé" ? "green" : "gold"}`}>
                                                        {g.statut}
                                                    </span>
                                                </td>
                                                <td className="adm-actions">
                                                    {g.statut !== "validé" && (
                                                        <button className="adm-btn adm-btn-validate" onClick={() => validerGuide(g.id)}>
                                                            <i className="bi bi-check-lg"></i> Valider
                                                        </button>
                                                    )}
                                                    <button className="adm-btn adm-btn-delete" onClick={() => supprimerGuide(g.id)}>
                                                        <i className="bi bi-trash-fill"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}

                    {/* ── Touristes ── */}
                    {activeTab === "touristes" && (
                        <div className="adm-table-wrap">
                            {loading ? <p className="adm-loading">Chargement...</p> : (
                                <table className="adm-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nom</th>
                                            <th>Email</th>
                                            <th>Inscrit le</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {touristes.length === 0 ? (
                                            <tr><td colSpan={5} className="adm-empty">Aucun touriste inscrit.</td></tr>
                                        ) : touristes.map(t => (
                                            <tr key={t.id}>
                                                <td className="adm-td-id">{t.id}</td>
                                                <td className="adm-td-name">
                                                    <div className="adm-avatar-mini adm-avatar-blue">{t.nom_complet?.charAt(0)}</div>
                                                    {t.nom_complet}
                                                </td>
                                                <td>{t.email}</td>
                                                <td>{new Date(t.created_at).toLocaleDateString("fr-FR")}</td>
                                                <td>
                                                    <button className="adm-btn adm-btn-delete" onClick={() => supprimerTouriste(t.id)}>
                                                        <i className="bi bi-trash-fill"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}

                    {/* ── Réservations ── */}
                    {activeTab === "reservations" && (
                        <div className="adm-table-wrap">
                            {loading ? <p className="adm-loading">Chargement...</p> : (
                                <table className="adm-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Touriste</th>
                                            <th>Guide</th>
                                            <th>Date</th>
                                            <th>Statut</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reservations.length === 0 ? (
                                            <tr><td colSpan={6} className="adm-empty">Aucune réservation.</td></tr>
                                        ) : reservations.map(r => (
                                            <tr key={r.id}>
                                                <td className="adm-td-id">{r.id}</td>
                                                <td>{r.touriste_nom}</td>
                                                <td>{r.guide_nom}</td>
                                                <td>{new Date(r.date).toLocaleDateString("fr-FR")}</td>
                                                <td>
                                                    <select
                                                        className={`adm-select adm-select-${r.statut}`}
                                                        value={r.statut}
                                                        onChange={e => updateStatutRes(r.id, e.target.value)}
                                                    >
                                                        <option value="en_attente">En attente</option>
                                                        <option value="confirmé">Confirmé</option>
                                                        <option value="annulé">Annulé</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <button className="adm-btn adm-btn-delete" onClick={() => supprimerReservation(r.id)}>
                                                        <i className="bi bi-trash-fill"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default AdminDashboard;