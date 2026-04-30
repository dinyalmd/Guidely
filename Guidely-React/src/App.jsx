import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import Villes from "./components/Villes";

// Protection de route : redirige vers /auth si pas connecté
function PrivateRoute({ children, allowedRole }) {
    const role = localStorage.getItem("role");
    const user = localStorage.getItem("user");

    if (!user || !role) return <Navigate to="/auth" />;
    if (allowedRole && role !== allowedRole) return <Navigate to="/auth" />;

    return children;
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<AuthPage />} />

                {/* Route protégée Guide → Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute allowedRole="guide">
                            <Dashboard />
                        </PrivateRoute>
                    }
                />

                {/* Route protégée Touriste → Villes */}
                <Route
                    path="/villes"
                    element={
                        <PrivateRoute allowedRole="touriste">
                            <Villes />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;