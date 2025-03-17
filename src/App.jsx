import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Setup from "./pages/Setup";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import RoutesPlanner from "./pages/RoutesPlanner"; // Certifique-se de que a página existe

function App() {
  return (
    <Router>
      <Routes>
        {/* Página inicial para inserir as credenciais */}
        <Route path="/" element={<Setup />} />
        {/* Página de autenticação */}
        <Route path="/auth" element={<Auth />} />
        {/* Dashboard principal */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Planejador de Rotas */}
        <Route path="/routes" element={<RoutesPlanner />} />
      </Routes>
    </Router>
  );
}

export default App;
