import React, { useState } from "react";

const Dashboard = ({ csvFiles = [], gpxFiles = [], images = [], videos = [] }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState('');

  const handleFileClick = (file, type) => {
    setSelectedFile(file);
    setFileType(type);
  };

  const renderCSVTable = (csvData) => {
    if (!csvData || csvData.length === 0) {
      return <p>Não há dados para exibir.</p>;
    }

    const headers = Object.keys(csvData[0]);

    return (
      <table className="min-w-full table-auto mt-4 border-collapse border border-gray-300">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-2 border">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {csvData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="px-4 py-2 border">{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderGPX = (gpxFile) => (
    <div className="mt-4">
      <h3 className="text-lg font-medium">Arquivo GPX:</h3>
      <a href={URL.createObjectURL(gpxFile)} download={gpxFile.name} className="text-blue-500 hover:underline">
        Baixar {gpxFile.name}
      </a>
    </div>
  );

  const renderImage = (imageFile) => (
    <div className="mt-4">
      <h3 className="text-lg font-medium">Imagem:</h3>
      <img src={URL.createObjectURL(imageFile)} alt={imageFile.name} className="max-w-full h-auto" />
    </div>
  );

  const renderVideo = (videoFile) => (
    <div className="mt-4">
      <h3 className="text-lg font-medium">Vídeo:</h3>
      <video controls className="max-w-full h-auto">
        <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
        Seu navegador não suporta a tag de vídeo.
      </video>
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Dashboard de Arquivos Carregados</h2>

      {/* Exibir CSVs */}
      <div className="mt-4">
        <h3 className="text-lg font-medium">CSV(s) Carregado(s):</h3>
        {csvFiles.length > 0 ? (
          <ul className="mt-2">
            {csvFiles.map((csvFile, index) => (
              <li
                key={index}
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={() => handleFileClick(csvFile.data, 'csv')}
              >
                {csvFile.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum arquivo CSV carregado.</p>
        )}
      </div>

      {/* Exibir GPXs */}
      <div className="mt-4">
        <h3 className="text-lg font-medium">GPX(s) Carregado(s):</h3>
        {gpxFiles.length > 0 ? (
          <ul className="mt-2">
            {gpxFiles.map((gpxFile, index) => (
              <li
                key={index}
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={() => handleFileClick(gpxFile, 'gpx')}
              >
                {gpxFile.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum arquivo GPX carregado.</p>
        )}
      </div>

      {/* Exibir Imagens */}
      <div className="mt-4">
        <h3 className="text-lg font-medium">Imagem(ns) Carregada(s):</h3>
        {images.length > 0 ? (
          <ul className="mt-2">
            {images.map((image, index) => (
              <li
                key={index}
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={() => handleFileClick(image, 'image')}
              >
                {image.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma imagem carregada.</p>
        )}
      </div>

      {/* Exibir Vídeos */}
      <div className="mt-4">
        <h3 className="text-lg font-medium">Vídeo(s) Carregado(s):</h3>
        {videos.length > 0 ? (
          <ul className="mt-2">
            {videos.map((video, index) => (
              <li
                key={index}
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={() => handleFileClick(video, 'video')}
              >
                {video.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum vídeo carregado.</p>
        )}
      </div>

      {/* Exibir Arquivo Selecionado */}
      {selectedFile && (
        <div className="mt-6">
          {fileType === "csv" && renderCSVTable(selectedFile)}
          {fileType === "gpx" && renderGPX(selectedFile)}
          {fileType === "image" && renderImage(selectedFile)}
          {fileType === "video" && renderVideo(selectedFile)}
        </div>
      )}
    </div>
  );
};

// Definir valores padrão para evitar que variáveis indefinidas causem erro
Dashboard.defaultProps = {
  csvFiles: [],
  gpxFiles: [],
  images: [],
  videos: [],
};

export default Dashboard;
