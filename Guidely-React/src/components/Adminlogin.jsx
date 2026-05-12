import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8000/api/login/admin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (data.success) {
                localStorage.setItem("admin", JSON.stringify(data.admin));
                localStorage.setItem("role", "admin");
                navigate("/admin/dashboard");
            } else {
                setError(data.message || "Identifiants incorrects.");
            }
        } catch {
            setError("Erreur de connexion au serveur.");
        }

        setLoading(false);
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-left">
                <div className="admin-brand">
                    <span className="admin-brand-logo">G</span>
                    <span className="admin-brand-name">Guidely</span>
                </div>
                <h1 className="admin-left-title">Panneau<br />Administrateur</h1>
                <p className="admin-left-sub">Gérez les guides, touristes et réservations depuis un seul endroit.</p>
                <div className="admin-left-dots">
                    <span /><span /><span />
                </div>
            </div>

            <div className="admin-login-right">
                <div className="admin-login-card">
                    <div className="admin-lock-icon">
                        <i className="bi bi-shield-lock-fill"></i>
                    </div>
                    <h2 className="admin-card-title">Connexion Admin</h2>
                    <p className="admin-card-sub">Accès réservé aux administrateurs</p>

                    <form onSubmit={handleLogin} className="admin-form">
                        {error && <div className="admin-error">{error}</div>}

                        <div className="admin-field">
                            <label>Email</label>
                            <div className="admin-input-wrap">
                                <i className="bi bi-envelope-fill"></i>
                                <input
                                    type="email"
                                    placeholder="admin@guidely.ma"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="admin-field">
                            <label>Mot de passe</label>
                            <div className="admin-input-wrap">
                                <i className="bi bi-lock-fill"></i>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button className="admin-login-btn" type="submit" disabled={loading}>
                            {loading ? (
                                <span className="admin-spinner"></span>
                            ) : (
                                <><i className="bi bi-box-arrow-in-right"></i> Se connecter</>
                            )}
                        </button>
                    </form>

                    <p className="admin-back-link" onClick={() => navigate("/")}>
                        ← Retour au site
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;