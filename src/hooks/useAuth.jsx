import { useState } from "react";
import stravaAPI, { setAuthToken } from "../services/stravaAPI";

const useAuth = () => {
  const [token, setToken] = useState(null);

  const authenticate = async (code) => {
    try {
      const response = await stravaAPI.post(
        "/oauth/token",
        {
          client_id: "YOUR_CLIENT_ID",
          client_secret: "YOUR_CLIENT_SECRET",
          code,
          grant_type: "authorization_code",
        }
      );
      setToken(response.data.access_token);
      setAuthToken(response.data.access_token);
    } catch (error) {
      console.error("Erro na autenticação:", error);
    }
  };

  return { token, authenticate };
};

export default useAuth;
