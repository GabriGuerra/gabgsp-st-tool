import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Setup = () => {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const navigate = useNavigate();

  const handleSave = () => {
    if (!clientId || !clientSecret || !accessToken) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // Salvar credenciais no localStorage
    localStorage.setItem("stravaClientId", clientId);
    localStorage.setItem("stravaClientSecret", clientSecret);
    localStorage.setItem("stravaAccessToken", accessToken);

    alert("Configurações salvas com sucesso!");
    navigate("/auth"); // Redirecionar para a página de autenticação
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Configurar Credenciais do Strava</h1>
      <form className="space-y-4 w-80">
        <div>
          <label className="block font-semibold mb-1">Client ID</label>
          <input
            type="text"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Insira seu Client ID"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Client Secret</label>
          <input
            type="text"
            value={clientSecret}
            onChange={(e) => setClientSecret(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Insira seu Client Secret"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Access Token</label>
          <input
            type="text"
            value={accessToken}
            onChange={(e) => setAccessToken(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Insira seu Access Token"
          />
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          Salvar Configurações
        </button>
      </form>
    </div>
  );
};

export default Setup;
