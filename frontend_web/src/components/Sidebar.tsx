import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import GroupModal from "./Modals/GroupModal";

const Sidebar = ({ onSelectGroup }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

  // Fetch groups from the backend
  const fetchGroups = async () => {
    try {
      const response = await fetch(`http://localhost:3000/get-groups`);
      const data = await response.json();
      setGroups(data.groups.map((group) => group.group_name)); // Extracting only group names
      // Fixed: Don't set data.length to localStorage
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleCreateGroup = async (newGroup) => {
    try {
      const response = await fetch(`http://localhost:3000/create-group`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupName: newGroup }),
      });
      if (response.ok) {
        fetchGroups(); // Refresh the group list
      } else {
        console.error("Failed to create group");
      }
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  // Handle group selection with navigation
  const handleGroupSelect = (group) => {
    if (onSelectGroup) {
      onSelectGroup(group);
    }
    // Navigate to the group's chat room
    navigate(`/chatroom/${group}`);
  };

  return (
    <>
      <aside className="text-gray-800 w-64 min-h-screen p-4 m-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2 px-4 w-full bg-purple-400 rounded text-white font-bold"
        >
          + Add Group
        </button>
        <ul className="mt-4">
          {groups.map((group, index) => (
            <li
              key={index}
              onClick={() => handleGroupSelect(group)}
              className="py-2 px-4 hover:bg-gray-200 rounded cursor-pointer"
            >
              {group}
            </li>
          ))}
        </ul>
        <div>
          <p className="font-bold px-4 mt-6">AI suggested groups</p>
          <ul className="mt-2">
            <li className="py-2 px-4 hover:bg-gray-200 rounded cursor-pointer" >Dance Group</li>
            <li className="py-2 px-4 hover:bg-gray-200 rounded cursor-pointer">High Hikers</li>
            <li className="py-2 px-4 hover:bg-gray-200 rounded cursor-pointer">Party Nighters</li>
          </ul>
        </div>
      </aside>
      {/* Modal Component */}
      <GroupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateGroup={handleCreateGroup}
      />
    </>
  );
};

export default Sidebar;
