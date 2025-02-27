import React from 'react';

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`bg-gray-800 text-white w-64 min-h-screen p-4 transition-all duration-300 ${isOpen ? '' : '-ml-64'}`}> 
      <ul>
        <li className="py-2 px-4 hover:bg-gray-700 rounded"><a href="#">Dashboard</a></li>
        <li className="py-2 px-4 hover:bg-gray-700 rounded"><a href="#">Profile</a></li>
        <li className="py-2 px-4 hover:bg-gray-700 rounded"><a href="#">Settings</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
