import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import polyline from "@mapbox/polyline"; // Biblioteca para decodificar a polyline

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState(null); // Inicializando como null
  const STRAVA_TOKEN = "90e28835d4b7287b3d73cff691d132d4d8453eda"; // Substitua com seu token gerado

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ajuste na URL para chamar a API do Strava
        const response = await axios.get("https://www.strava.com/api/v3/athlete/activities", {
          headers: { Authorization: `Bearer ${STRAVA_TOKEN}` },
        });
        console.log("Atividades recebidas:", response.data); // Verifique os dados retornados
        setActivities(response.data);
        calculateStats(response.data);
      } catch (error) {
        console.error("Erro ao buscar atividades:", error.response?.data || error.message);
      }
    };

    fetchData();
  }, []);

  const calculateStats = (data) => {
    const totalDistance = data.reduce((sum, act) => sum + act.distance, 0);
    const totalElevation = data.reduce((sum, act) => sum + act.total_elevation_gain, 0);
    const totalTime = data.reduce((sum, act) => sum + act.moving_time, 0);
    setStats({ totalDistance, totalElevation, totalTime });
  };

  if (!stats) {
    // Se stats não estiver disponível, mostre um carregando ou nada.
    return <div>Carregando dados...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card className="p-4">
        <CardContent>
          <Typography variant="h5">Distância Total</Typography>
          <Typography variant="h4">{(stats.totalDistance / 1000).toFixed(2)} km</Typography>
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardContent>
          <Typography variant="h5">Elevação Total</Typography>
          <Typography variant="h4">{stats.totalElevation.toFixed(2)} m</Typography>
        </CardContent>
      </Card>
      <Card className="p-4">
        <CardContent>
          <Typography variant="h5">Tempo Total</Typography>
          <Typography variant="h4">{(stats.totalTime / 3600).toFixed(2)} h</Typography>
        </CardContent>
      </Card>

      <div className="col-span-3">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={activities.slice(0, 10)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="start_date" tickFormatter={(tick) => tick.slice(0, 10)} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="distance" stroke="#8884d8" name="Distância" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="col-span-3 h-96">
        <MapContainer center={[-23.55, -46.63]} zoom={12} className="w-full h-full">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {activities.slice(0, 5).map((act, idx) => {
            // Decodificar a polyline antes de renderizar no mapa
            const decodedPolyline = polyline.decode(act.map.summary_polyline);
            return <Polyline key={idx} positions={decodedPolyline} color="blue" />;
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default Dashboard;
