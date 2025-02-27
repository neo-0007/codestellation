import React from 'react';

const Class = () => {
  return (
    <>
      <div>
        <p className="text-lg font-bold mb-2">Metrics</p>
      </div>
      <div className="grid grid-cols-2 gap-3 p-4 justify-items-center items-center min-h-full w-full">
        <div className="w-48 h-48 bg-purple-200 flex items-center justify-center text-white text-lg font-semibold rounded-lg shadow-md">
          Red
        </div>
        <div className="w-48 h-48 bg-purple-200 flex items-center justify-center text-white text-lg font-semibold rounded-lg shadow-md">
          Blue
        </div>
        <div className="w-48 h-48 bg-indigo-300 flex items-center justify-center text-white text-lg font-semibold rounded-lg shadow-md">
          Green
        </div>
        <div className="w-48 h-48 bg-gray-300 flex items-center justify-center text-black text-lg font-semibold rounded-lg shadow-md">
          Yellow
        </div>
      </div>
    </>
  );
};

export default Class;
