import React, { useEffect, useState } from "react";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography } from "@mui/material";
import { MapContainer, TileLayer, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://www.strava.com/api/v3/athlete/activities", {
          headers: { Authorization: `93ce6bc3a2f752ff9e89b51cb8b950a9e8271d42` },
        });
        setActivities(response.data);
        calculateStats(response.data);
      } catch (error) {
        console.error("Erro ao buscar atividades", error);
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
          {activities.slice(0, 5).map((act, idx) => (
            <Polyline key={idx} positions={act.map.summary_polyline} color="blue" />
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Dashboard;