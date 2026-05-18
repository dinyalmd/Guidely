import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GuideForm() {
    const navigate = useNavigate();
    const photoRef = useRef(null);
    const cniRef = useRef(null);

    const [photoFile, setPhotoFile] = useState(null);
    const [cniFile, setCniFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const [data, setData] = useState({
        nom_complet: "",
        email: "",
        password: "",
        cni: "",
        bio: "",
        languages: "",
        city: "",
        price: "",
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setPhotoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleCniChange = (e) => {
        const file = e.target.files[0];
        if (file) setCniFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (data.password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });
            if (photoFile) formData.append("photo", photoFile);
            if (cniFile)   formData.append("cni_file", cniFile);

            await axios.post("http://127.0.0.1:8000/api/guides", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            const loginResponse = await axios.post("http://127.0.0.1:8000/api/login/guide", {
                email: data.email,
                password: data.password,
            });

            localStorage.setItem("user", JSON.stringify(loginResponse.data.user));
            localStorage.setItem("role", "guide");
            navigate("/dashboard");

        } catch (error) {
            console.error("Erreur:", error.response?.data || error.message);
            alert("Erreur : " + (error.response?.data?.error || "Problème serveur"));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Inscription Guide</h3>

            {error && (
                <div style={{ color: "red", fontSize: "13px", marginBottom: "10px", textAlign: "center" }}>
                    {error}
                </div>
            )}

            <label htmlFor="photo-upload" className="upload-field">
                {photoPreview
                    ? <img src={photoPreview} alt="Aperçu" className="upload-avatar" />
                    : <div className="upload-avatar-placeholder">
                        <i className="bi bi-person-fill"></i>
                    </div>
                }
                <div className="upload-info">
                    <span className="upload-label">Photo de profil</span>
                    <span className="upload-filename">
                        {photoFile ? photoFile.name : "JPG ou PNG"}
                    </span>
                </div>
                {photoFile && <span className="upload-badge">✓ Ajoutée</span>}
                <span className="upload-btn">Choisir</span>
                <input type="file" accept="image/*" id="photo-upload"
                    style={{ display: "none" }} onChange={handlePhotoChange} />
            </label>

            <div className="input-group">
                <i className="bi bi-person-fill icon"></i>
                <input name="nom_complet" placeholder="Nom complet" value={data.nom_complet} onChange={handleChange} required />
            </div>

            <div className="input-group">
                <i className="bi bi-envelope-fill icon"></i>
                <input name="email" type="email" placeholder="Email" value={data.email} onChange={handleChange} required />
            </div>

            <div className="input-group">
                <i className="bi bi-lock-fill icon"></i>
                <input name="password" type="password" placeholder="Mot de passe" value={data.password} onChange={handleChange} required />
            </div>

            <div className="input-group">
                <i className="bi bi-lock-fill icon"></i>
                <input
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
            </div>

            <div className="input-group">
                <i className="bi bi-card-text icon"></i>
                <input name="cni" placeholder="Numéro CNI" value={data.cni} onChange={handleChange} required />
            </div>

            <label htmlFor="cni-upload" className="upload-field">
                <div className="upload-avatar-placeholder" style={{ borderRadius: "8px" }}>
                    <i className="bi bi-file-earmark-pdf-fill" style={{ color: "#dc3545" }}></i>
                </div>
                <div className="upload-info">
                    <span className="upload-label">Carte CNI (PDF)</span>
                    <span className="upload-filename">
                        {cniFile ? cniFile.name : "PDF uniquement"}
                    </span>
                </div>

                {cniFile && <span className="upload-badge">✓ Ajouté</span>}
                <span className="upload-btn">Choisir</span>
                <input type="file" accept="application/pdf" id="cni-upload"
                    style={{ display: "none" }} onChange={handleCniChange} />
            </label>
<div className="input-group">
                <i className="bi bi-journal-text icon"></i>
                <textarea name="bio" placeholder="Petite biographie" value={data.bio} onChange={handleChange} />
            </div>
            <div className="input-group">
                <i className="bi bi-translate icon"></i>
                <input name="languages" placeholder="Langues (ex: FR, EN, AR)" value={data.languages} onChange={handleChange} />
            </div>

            <div className="input-group">
                <i className="bi bi-geo-alt-fill icon"></i>
                <input name="city" placeholder="Ville couverte" value={data.city} onChange={handleChange} />
            </div>

            <div className="input-group">
                <i className="bi bi-currency-dollar icon"></i>
                <input name="price" type="number" placeholder="Prix par jour" value={data.price} onChange={handleChange} />
            </div>

            <button className="main-btn" type="submit">S'inscrire</button>
        </form>
    );
}

export default GuideForm;