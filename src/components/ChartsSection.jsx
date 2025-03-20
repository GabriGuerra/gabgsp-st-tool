import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ChartsSection = ({ activities }) => {
  return (
    <div className="col-span-3 p-6 bg-gray-800 rounded-xl shadow-lg">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={activities}>
          <CartesianGrid strokeDasharray="3 3" stroke="gray" />
          <XAxis dataKey="start_date" tickFormatter={(tick) => tick.slice(0, 10)} stroke="white" />
          <YAxis stroke="white" />
          <Tooltip contentStyle={{ backgroundColor: "black", color: "white" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="distance"
            stroke="#FF5733"
            name="Distância"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="total_elevation_gain"
            stroke="#33FF57"
            name="Elevação"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartsSection;
