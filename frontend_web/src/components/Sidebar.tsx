import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleGroupSelect = (groupName) => {
    navigate(`/chatroom/${groupName}`);
  };

  return (
    <aside className="bg-white w-64 min-h-screen p-4 mt-5" style={{ color: '#12375c'}}>
      <button className="py-2 px-4 hover:bg-gray-200 rounded flex justify-center w-full">
        + Add Group
      </button>
      <ul>
        <li onClick={() => handleGroupSelect("Happy People")} className="py-2 px-4 hover:bg-gray-200 rounded cursor-pointer">
          Happy People
        </li>
        <li onClick={() => handleGroupSelect("Trekking Group")} className="py-2 px-4 hover:bg-gray-200 rounded cursor-pointer">
          Trekking Group
        </li>
        <li onClick={() => handleGroupSelect("Sun Yoga")} className="py-2 px-4 hover:bg-gray-200 rounded cursor-pointer">
          Sun Yoga
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
