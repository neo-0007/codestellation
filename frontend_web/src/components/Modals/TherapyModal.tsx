import React from "react";

const TherapyModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null; // If modal is not open, don't render anything.

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
        <button
          className="absolute top-2 right-3 text-gray-600 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  );
};

export default TherapyModal;
