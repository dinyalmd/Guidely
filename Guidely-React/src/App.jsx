import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import Villes from "./components/Villes";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

// Protection route utilisateur
function PrivateRoute({ children, allowedRole }) {
    const role = localStorage.getItem("role");
    const user = localStorage.getItem("user");

    if (!user || !role) return <Navigate to="/auth" />;
    if (allowedRole && role !== allowedRole) return <Navigate to="/auth" />;

    return children;
}

// Protection route admin
function AdminRoute({ children }) {
    const role = localStorage.getItem("role");
    const admin = localStorage.getItem("admin");

    if (!admin || role !== "admin") return <Navigate to="/admin/login" />;
    return children;
}

function App() {
    return (
        <Router>
            <Routes>
                {/* ── Public ── */}
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<AuthPage />} />

                {/* ── Guide ── */}
                <Route path="/dashboard" element={
                    <PrivateRoute allowedRole="guide">
                        <Dashboard />
                    </PrivateRoute>
                } />

                {/* ── Touriste ── */}
                <Route path="/villes" element={
                    <PrivateRoute allowedRole="touriste">
                        <Villes />
                    </PrivateRoute>
                } />

                {/* ── Admin ── */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;