import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TouristForm() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        nom_complet: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // 1. Inscription
            await axios.post("http://127.0.0.1:8000/api/touristes", data);

            // 2. Connexion automatique après inscription
            const loginResponse = await axios.post("http://127.0.0.1:8000/api/login/touriste", {
                email: data.email,
                password: data.password,
            });

            // 3. Sauvegarder les infos
            localStorage.setItem("user", JSON.stringify(loginResponse.data.user));
            localStorage.setItem("role", "touriste");

            // 4. Redirection vers villes
            navigate("/villes");

        } catch (error) {
            console.error("Erreur:", error.response?.data || error.message);
            alert("Erreur lors de l'inscription");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Inscription Touriste</h3>

            <div className="input-group">
                <i className="bi bi-person-fill icon"></i>
                <input name="nom_complet" placeholder="Nom complet" onChange={handleChange} required />
            </div>

            <div className="input-group">
                <i className="bi bi-envelope-fill icon"></i>
                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            </div>

            <div className="input-group">
                <i className="bi bi-lock-fill icon"></i>
                <input name="password" type="password" placeholder="Mot de passe" onChange={handleChange} required />
            </div>

            <button className="main-btn" type="submit">S'inscrire</button>
        </form>
    );
}

export default TouristForm;