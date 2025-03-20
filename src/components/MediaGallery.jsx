import React from "react";

const MediaGallery = ({ media }) => {
  return (
    <div className="col-span-3 grid grid-cols-2 gap-6">
      {[...media.images, ...media.videos].map((file, idx) => (
        <div
          key={idx}
          className="relative hover:scale-105 transform transition duration-300 shadow-lg rounded-lg overflow-hidden"
        >
          {file.type.includes("video") ? (
            <video
              src={URL.createObjectURL(file)}
              controls
              className="w-full h-48 rounded-xl border border-gray-700"
            />
          ) : (
            <img
              src={URL.createObjectURL(file)}
              alt="activity"
              className="w-full h-48 object-cover rounded-xl border border-gray-700"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default MediaGallery;
