import React, { useState } from "react";

const Dashboard = ({ csvFiles = [], gpxFiles = [], images = [], videos = [] }) => {
  const [selectedSection, setSelectedSection] = useState('profile'); // Inicializa na seção perfil
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState('');

  // Busca o arquivo profile.csv no array csvFiles
  const profileData = csvFiles.find(file => file.name === "profile.csv");

  const handleSectionClick = (section) => {
    setSelectedSection(section);
    setSelectedFile(null);
  };

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

  const renderUserProfile = () => {
    if (!profileData) {
      return <p className="text-center text-red-500">O arquivo profile.csv não foi encontrado!</p>;
    }

    const userDetails = profileData.data[0]; // Utiliza a primeira linha como informações do usuário

    return (
      <div className="p-6 bg-white rounded-md shadow-md">
        <img
          src="profile.jpg"
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto"
        />
        <h3 className="text-lg font-semibold text-center mt-4">{userDetails.Name}</h3>
        <p className="text-center text-gray-600">{userDetails.Email}</p>
        <ul className="mt-6 space-y-2">
          {Object.entries(userDetails).map(([key, value], index) => (
            <li key={index} className="text-sm text-gray-800">
              <strong>{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <nav className="w-64 bg-gray-800 text-white flex flex-col items-center">
        <h2 className="text-xl font-bold mt-6">Dashboard</h2>
        <ul className="mt-10 space-y-4">
          <li
            className={`cursor-pointer ${selectedSection === 'profile' ? 'text-blue-400' : ''}`}
            onClick={() => handleSectionClick('profile')}
          >
            Perfil
          </li>
          <li
            className={`cursor-pointer ${selectedSection === 'csv' ? 'text-blue-400' : ''}`}
            onClick={() => handleSectionClick('csv')}
          >
            CSV
          </li>
          <li
            className={`cursor-pointer ${selectedSection === 'gpx' ? 'text-blue-400' : ''}`}
            onClick={() => handleSectionClick('gpx')}
          >
            GPX
          </li>
          <li
            className={`cursor-pointer ${selectedSection === 'images' ? 'text-blue-400' : ''}`}
            onClick={() => handleSectionClick('images')}
          >
            Imagens
          </li>
          <li
            className={`cursor-pointer ${selectedSection === 'videos' ? 'text-blue-400' : ''}`}
            onClick={() => handleSectionClick('videos')}
          >
            Vídeos
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {selectedSection === 'profile' && renderUserProfile()}
        {selectedSection === 'csv' && (
          <div>
            <h2 className="text-xl font-semibold">Arquivos CSV</h2>
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
            {selectedFile && fileType === 'csv' && renderCSVTable(selectedFile)}
          </div>
        )}
        {selectedSection === 'gpx' && (
          <div>
            <h2 className="text-xl font-semibold">Arquivos GPX</h2>
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
            {selectedFile && fileType === 'gpx' && renderGPX(selectedFile)}
          </div>
        )}
        {selectedSection === 'images' && (
          <div>
            <h2 className="text-xl font-semibold">Imagens</h2>
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
            {selectedFile && fileType === 'image' && renderImage(selectedFile)}
          </div>
        )}
        {selectedSection === 'videos' && (
          <div>
            <h2 className="text-xl font-semibold">Vídeos</h2>
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
            {selectedFile && fileType === 'video' && renderVideo(selectedFile)}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
