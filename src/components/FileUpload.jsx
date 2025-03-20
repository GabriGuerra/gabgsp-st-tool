import React, { useState } from "react";
import { motion } from "framer-motion";
import Papa from "papaparse";

const FileUpload = ({ onDataProcessed }) => {
  const [files, setFiles] = useState({
    csvFiles: [],
    gpxFiles: [],
    images: [],
    videos: []
  });

  const handleFolderUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    if (uploadedFiles.length === 0) return;

    const csvFiles = uploadedFiles.filter(file => file.name.endsWith(".csv"));
    const gpxFiles = uploadedFiles.filter(file => file.name.endsWith(".gpx"));
    const images = uploadedFiles.filter(file => file.type.startsWith("image"));
    const videos = uploadedFiles.filter(file => file.type.startsWith("video"));

    setFiles({ csvFiles, gpxFiles, images, videos });

    if (csvFiles.length > 0) {
      processCSVFiles(csvFiles, gpxFiles, images, videos);
    } else {
      onDataProcessed({ activities: [], csvFiles, gpxFiles, images, videos });
    }
  };

  const processCSVFiles = (csvFiles, gpxFiles, images, videos) => {
  let allActivities = [];

  csvFiles.forEach((file, index) => {
    const reader = new FileReader();
    reader.onload = ({ target }) => {
      Papa.parse(target.result, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        delimiter: ",",
        complete: (result) => {
          console.log(`Dados do CSV ${index + 1} processados:`, result.data);
          allActivities = [...allActivities, ...result.data];

          // Modificação: armazenamos o nome e os dados do CSV corretamente
          csvFiles[index] = { name: file.name, data: result.data };

          if (index === csvFiles.length - 1) {
            onDataProcessed({
              activities: allActivities,
              csvFiles,
              gpxFiles,
              images,
              videos,
            });
          }
        },
      });
    };
    reader.readAsText(file);
  });
};


  return (
    <motion.div 
      className="p-4 border rounded-lg bg-white shadow-md" 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }}
    >
      <input 
        type="file" 
        webkitdirectory="" 
        directory="" 
        multiple 
        onChange={handleFolderUpload} 
        className="mb-2"
      />
      {files.csvFiles.length > 0 && (
        <p className="mt-2 text-sm text-gray-600">
          {files.csvFiles.length} CSV(s), {files.gpxFiles.length} GPX(s), {files.images.length} Imagem(ns), {files.videos.length} Vídeo(s) carregados.
        </p>
      )}
    </motion.div>
  );
};

export default FileUpload;
