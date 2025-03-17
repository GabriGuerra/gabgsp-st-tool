import React from "react";

const Auth = () => {
  const clientId = localStorage.getItem("stravaClientId");
  const redirectUri = localStorage.getItem("stravaRedirectUri");

  if (!clientId || !redirectUri) {
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

  const AUTH_URL = `https://www.strava.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=read,activity:read_all`;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Conectar ao Strava</h1>
      <a
        href={AUTH_URL}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
      >
        Iniciar Autenticação
      </a>
    </div>
  );
};

export default Auth;
