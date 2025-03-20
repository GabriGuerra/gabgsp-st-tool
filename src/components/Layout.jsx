import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Layout = ({ children, csvFiles = [], gpxFiles = [], images = [], videos = [], onFileClick }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white w-64 p-4 fixed h-full transition-transform ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}`}>
        <button className="absolute top-4 right-4 text-white" onClick={() => setSidebarOpen(false)}>
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4">Arquivos</h2>

        <h3 className="text-lg mt-4">CSVs</h3>
        <ul>
          {csvFiles.length > 0 ? (
            csvFiles.map((csv, index) => (
              <li key={index} className="cursor-pointer hover:underline text-blue-400" onClick={() => onFileClick(csv, 'csv')}>
                {csv.name}
              </li>
            ))
          ) : (
            <p className="text-gray-400">Nenhum CSV carregado</p>
          )}
        </ul>

        <h3 className="text-lg mt-4">GPX</h3>
        <ul>
          {gpxFiles.length > 0 ? (
            gpxFiles.map((gpx, index) => (
              <li key={index} className="cursor-pointer hover:underline text-blue-400" onClick={() => onFileClick(gpx, 'gpx')}>
                {gpx.name}
              </li>
            ))
          ) : (
            <p className="text-gray-400">Nenhum GPX carregado</p>
          )}
        </ul>

        <h3 className="text-lg mt-4">Imagens</h3>
        <ul>
          {images.length > 0 ? (
            images.map((img, index) => (
              <li key={index} className="cursor-pointer hover:underline text-blue-400" onClick={() => onFileClick(img, 'image')}>
                {img.name}
              </li>
            ))
          ) : (
            <p className="text-gray-400">Nenhuma imagem carregada</p>
          )}
        </ul>

        <h3 className="text-lg mt-4">Vídeos</h3>
        <ul>
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <li key={index} className="cursor-pointer hover:underline text-blue-400" onClick={() => onFileClick(video, 'video')}>
                {video.name}
              </li>
            ))
          ) : (
            <p className="text-gray-400">Nenhum vídeo carregado</p>
          )}
        </ul>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 text-white px-6 py-4 flex items-center">
          <button className="text-white mr-4" onClick={() => setSidebarOpen(true)}>
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-bold">Dashboard</h1>
        </header>

        {/* Conteúdo Dinâmico */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
