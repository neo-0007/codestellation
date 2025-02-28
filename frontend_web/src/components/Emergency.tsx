import React from "react";

const UneasyBanner = () => {
  return (
    <div className="relative p-3 bg-indigo-300 mt-4 rounded-lg shadow-md w-11/12 max-w-4xl mx-auto flex items-center justify-between">
      {/* Quarter Circle */}
      <div className="absolute top-0 left-0 w-10 h-10 bg-indigo-400 rounded-br-full opacity-50"></div>

      {/* Mood Content */}
      <p className="text-sm relative text-white font-medium font-bold">Feeling Uneasy?</p>

      {/* Call a Friend Button */}
      <button className="bg-indigo-500 text-white px-3 py-1 rounded-md hover:bg-indigo-600 transition">
        Call a Friend
      </button>
    </div>
  );
};

export default UneasyBanner;
