import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GuideForm from "./GuideForm";
import TouristForm from "./TouristForm";
import "./AuthPage.css";

function AuthPage() {
    const [role, setRole] = useState("");
    const [isLogin, setIsLogin] = useState(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // On essaie d'abord comme Guide, ensuite comme Touriste
        let response = await fetch("http://localhost:8000/api/login/guide", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        let data = await response.json();

        if (data.success) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("role", data.role);
            setLoading(false);
            navigate("/dashboard");
            return;
        }

        // Si pas guide → essayer touriste
        response = await fetch("http://localhost:8000/api/login/touriste", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        data = await response.json();

        if (data.success) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("role", data.role);
            setLoading(false);
            navigate("/villes");
            return;
        }

        setError("Email ou mot de passe incorrect.");
        setLoading(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1 className="logo">Guidely</h1>
                <p className="subtitle">{isLogin ? "Login" : "Créer un compte"}</p>

                <button className="switch-btn" onClick={() => { setIsLogin(!isLogin); setError(""); }}>
                    {isLogin ? "Create an account" : "Login"}
                </button>

                {isLogin && (
                    <form className="form" onSubmit={handleLogin}>
                        {error && (
                            <div className="error-msg">{error}</div>
                        )}

                        <div className="input-group">
                            <i className="bi bi-envelope-fill icon"></i>
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input-group">
                            <i className="bi bi-lock-fill icon"></i>
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button className="main-btn" type="submit" disabled={loading}>
                            {loading ? "Connexion..." : "Login"}
                        </button>
                    </form>
                )}

                {!isLogin && (
                    <>
                        <div className="role-selection">
                            <button
                                className={role === "touriste" ? "role active" : "role"}
                                onClick={() => setRole("touriste")}
                            >
                                <i className="bi bi-person-fill me-1"></i>
                                Touriste
                            </button>

                            <button
                                className={role === "guide" ? "role active" : "role"}
                                onClick={() => setRole("guide")}
                            >
                                <i className="bi bi-geo-alt-fill me-1"></i>
                                Guide
                            </button>
                        </div>

                        {role === "touriste" && <TouristForm />}
                        {role === "guide" && <GuideForm />}
                    </>
                )}
            </div>
        </div>
    );
}

export default AuthPage;