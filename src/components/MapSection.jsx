import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapSection = () => {
  return (
    <div className="col-span-3 h-96 bg-gray-800 rounded-xl shadow-lg">
      <MapContainer center={[-23.55, -46.63]} zoom={12} className="w-full h-full rounded-lg">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  );
};

export default MapSection;
