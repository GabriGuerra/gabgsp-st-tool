import React, { useState } from "react";
import FileUpload from "./components//FileUpload";
import Dashboard from "./components//Dashboard";
import './App.css';

const App = () => {
  const [data, setData] = useState({ csvFiles: [], gpxFiles: [], images: [], videos: [] });

  const handleDataProcessed = (newData) => {
    setData(newData);
  };

  return (
    <div className="container mx-auto">
      <FileUpload onDataProcessed={handleDataProcessed} />
      <Dashboard 
        csvFiles={data.csvFiles} 
        gpxFiles={data.gpxFiles} 
        images={data.images} 
        videos={data.videos} 
      />
    </div>
  );
};

export default App;
