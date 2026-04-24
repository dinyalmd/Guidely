import React, { useState } from "react";
import axios from 'axios';

function TouristForm() {
    const [data, setData] = useState({
        nom_complet: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Touriste:", data);
        
        try {
            const response = await axios.post('http://localhost:8000/api/touristes', data);
            console.log('Succès:', response.data);
            alert('Inscription réussie !');
        } catch (error) {
            console.error('Erreur:', error.response?.data || error.message);
            alert('Erreur lors de l\'inscription');
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