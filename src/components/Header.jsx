import React from "react";

const Header = () => {
  return (
    <header className="py-4 px-8 bg-gray-900 shadow-md flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-400">Meu Dashboard</h1>
      <nav className="flex space-x-6">
        <a href="#" className="text-gray-300 hover:text-white transition">Dashboard</a>
        <a href="#" className="text-gray-300 hover:text-white transition">Estatísticas</a>
        <a href="#" className="text-gray-300 hover:text-white transition">Mapa</a>
        <a href="#" className="text-gray-300 hover:text-white transition">Mídia</a>
      </nav>
    </header>
  );
};

export default Header;
