import React from "react";

const StatCard = ({ title, value }) => {
  return (
    <div className="p-6 bg-gray-800 text-white shadow-lg rounded-xl hover:scale-105 transform transition-transform duration-300">
      <h2 className="text-blue-400 font-bold text-xl">{title}</h2>
      <p className="text-4xl font-semibold mt-2">{value}</p>
    </div>
  );
};

export default StatCard;
