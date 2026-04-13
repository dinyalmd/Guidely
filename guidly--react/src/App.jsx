import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PagePrincipale from "./components/PagePrincipale";
import AuthPage from "./components/AuthPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PagePrincipale />} />
                <Route path="/auth" element={<AuthPage />} />
            </Routes>
        </Router>
    );
}

export default App;