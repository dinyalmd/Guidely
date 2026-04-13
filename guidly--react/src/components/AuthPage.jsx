import React, { useState } from "react";
import GuideForm from "./GuideForm";
import TouristForm from "./TouristForm";
import "./AuthPage.css";

function AuthPage() {
    const [role, setRole] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    
    return (
        <div className="auth-container">   
            <div className="auth-card">    
                <h1 className="logo">Guidely</h1>
                <p className="subtitle">Login</p>
                
                <button className="switch-btn" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Create an account" : "Login"}
                </button>

                {isLogin && (
                    <form className="form">
                        <div className="input-group">
                            <i className="bi bi-envelope-fill icon"></i>
                            <input type="email" placeholder="Email" required />
                        </div>

                        <div className="input-group">
                            <i className="bi bi-lock-fill icon"></i>
                            <input type="password" placeholder="Password" required />
                        </div>

                        <button className="main-btn" type="submit">Login</button>
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