import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import stravaAPI, { setAuthToken } from "../services/stravaAPI";

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    const fetchTokenAndData = async () => {
      const clientId = localStorage.getItem("stravaClientId");
      const clientSecret = localStorage.getItem("stravaClientSecret");

      if (!clientId || !clientSecret || !code) {
        navigate("/setup");
        return;
      }

      try {
        const tokenResponse = await stravaAPI.post("/oauth/token", {
          client_id: clientId,
          client_secret: clientSecret,
          code,
          grant_type: "authorization_code",
        });

        const token = tokenResponse.data.access_token;
        setAuthToken(token);
        localStorage.setItem("token", token);

        const userResponse = await stravaAPI.get("/athlete");
        setUserData(userResponse.data);

        const activitiesResponse = await stravaAPI.get("/athlete/activities");
        setActivities(activitiesResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenAndData();
  }, [navigate]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {loading ? (
        <p>Carregando dados...</p>
      ) : (
        <div>
          {userData && (
            <div className="mb-6">
              <h2 className="text-xl font-bold">Bem-vindo, {userData.firstname}!</h2>
              <p>País: {userData.country}</p>
            </div>
          )}
          <h2 className="text-lg font-bold mb-4">Suas Atividades</h2>
          <ul className="space-y-4">
            {activities.map((activity) => (
              <li key={activity.id} className="p-4 border rounded shadow-sm">
                <p className="font-semibold">{activity.name}</p>
                <p>Distância: {(activity.distance / 1000).toFixed(2)} km</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
