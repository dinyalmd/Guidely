import React, { useState } from "react";
import axios from "axios";

function GuideForm() {
    const [data, setData] = useState({
        nom_complet: "",      
        email: "",
        password: "",
        cni: "",              
        bio: "",              
        languages: "",        
        city: "",             
        price: "",           
        availability: ""
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Données envoyées:", data);
        
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/guides",
                data
            );
            console.log("Success:", response.data);
            alert("Inscription réussie !!");
            
            setData({
                nom_complet: "",
                email: "",
                password: "",
                cni: "",
                bio: "",
                languages: "",
                city: "",
                price: "",
                availability: ""
            });
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            alert("Erreur : " + (error.response?.data?.error || "Problème serveur"));
        }
    };

    return (
        <form onSubmit={handleSubmit}> 
            <h3>Inscription Guide</h3>
            
            <div className="input-group">
                <i className="bi bi-person-fill icon"></i>
                <input
                    name="nom_complet" 
                    placeholder="Nom complet"
                    value={data.nom_complet}
                    onChange={handleChange}
                    required
                />
            </div>  

            <div className="input-group">
                <i className="bi bi-envelope-fill icon"></i>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={handleChange}
                    required
                />
            </div> 

            <div className="input-group">
                <i className="bi bi-lock-fill icon"></i>
                <input
                    name="password"
                    type="password"
                    placeholder="Mot de passe"
                    value={data.password}
                    onChange={handleChange}
                    required
                />
            </div>  

            <div className="input-group">
                <i className="bi bi-card-text icon"></i>
                <input
                    name="cni"
                    placeholder="Numéro CNI"
                    value={data.cni}
                    onChange={handleChange}
                    required
                />
            </div>  

            <div className="input-group">
                <i className="bi bi-journal-text icon"></i>
                <textarea
                    name="bio"
                    placeholder="Petite biographie"
                    value={data.bio}
                    onChange={handleChange}
                />
            </div>  

            <div className="input-group">
                <i className="bi bi-translate icon"></i>
                <input
                    name="languages"
                    placeholder="Langues (ex: FR, EN, AR)"
                    value={data.languages}
                    onChange={handleChange}
                />
            </div>  

            <div className="input-group">
                <i className="bi bi-geo-alt-fill icon"></i>
                <input
                    name="city"
                    placeholder="Ville couverte"
                    value={data.city}
                    onChange={handleChange}
                />
            </div>  

            <div className="input-group">
                <i className="bi bi-currency-dollar icon"></i>
                <input
                    name="price"
                    type="number"
                    placeholder="Prix par jour"
                    value={data.price}
                    onChange={handleChange}
                />
            </div>  

            <button className="main-btn" type="submit">
                S'inscrire
            </button>
        </form>
    );
}

export default GuideForm;