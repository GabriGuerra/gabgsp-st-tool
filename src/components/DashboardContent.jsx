import React from "react";

const DashboardContent = ({ csvFiles, gpxFiles, images, videos, selectedFile, fileType, onFileClick }) => {
  const renderCSVTable = (csvData) => {
    if (!csvData || csvData.length === 0) return <p className="text-gray-500">Não há dados para exibir.</p>;

    const headers = Object.keys(csvData[0]);

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              {headers.map((header, index) => (
                <th key={index} className="px-4 py-2 border">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100">
                {headers.map((header, colIndex) => (
                  <td key={colIndex} className="px-4 py-2 border">{row[header]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-4">
      {selectedFile ? (
        <>
          {fileType === "csv" && renderCSVTable(selectedFile)}
          {fileType === "gpx" && <p>Exibir detalhes do arquivo GPX...</p>}
          {fileType === "image" && <img src={URL.createObjectURL(selectedFile)} className="max-w-full rounded-lg shadow-md" />}
          {fileType === "video" && <video controls src={URL.createObjectURL(selectedFile)} className="max-w-full rounded-lg shadow-md" />}
        </>
      ) : (
        <p className="text-gray-500">Selecione um arquivo na barra lateral para visualizar.</p>
      )}
    </div>
  );
};

export default DashboardContent;
