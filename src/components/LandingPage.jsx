import React, { useState } from "react";
import { motion } from "framer-motion";
import FileUpload from "./FileUpload";

const LandingPage = ({ onProceed }) => {
  const [isUploaded, setIsUploaded] = useState(false);
  const [activities, setActivities] = useState([]);

  const handleUploadSuccess = (data) => {
    if (data.activities && data.activities.length > 0) {
      setIsUploaded(true);
      setActivities(data.activities);
      onProceed(data.activities);
    } else {
      console.error("Nenhum arquivo CSV válido foi encontrado.");
    }
  };

  return (
    <motion.div
      className="relative w-screen h-screen flex items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Fundo com montanhas sutis */}
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="rgba(255, 255, 255, 0.05)"
            d="M0,224L80,208C160,192,320,160,480,160C640,160,800,192,960,202.7C1120,213,1280,203,1360,197.3L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
          <path
            fill="rgba(255, 255, 255, 0.03)"
            d="M0,192L120,176C240,160,480,128,720,144C960,160,1200,224,1320,256L1440,288L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
          />
        </svg>
      </div>

      {/* FileUpload e botão com destaque */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 p-6 bg-orange-400/10 backdrop-blur-lg rounded-2xl shadow-lg max-w-lg"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {!isUploaded ? (
          <FileUpload onDataProcessed={handleUploadSuccess} />
        ) : (
          <motion.button
            className="px-8 py-4 text-xl font-bold text-black bg-orange-400 hover:bg-orange-500 rounded-full shadow-2xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onProceed(activities)}
          >
            Explorar Dashboard
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;