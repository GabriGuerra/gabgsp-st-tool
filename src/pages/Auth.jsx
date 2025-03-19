import React from "react";

const Auth = () => {
  const clientId = localStorage.getItem("stravaClientId");
  const accessToken = localStorage.getItem("stravaAccessToken");

  if (!clientId || !accessToken) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-lg text-red-500">Por favor, configure suas credenciais primeiro.</p>
        <a
          href="/setup"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-4"
        >
          Configurar Credenciais
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Autenticação Concluída</h1>
      <p className="text-lg text-green-500">Client ID e Access Token configurados com sucesso!</p>
      <a
        href="/dashboard"
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Acessar Dashboard
      </a>
    </div>
  );
};

export default Auth;
