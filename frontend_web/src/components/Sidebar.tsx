import React, { useState, useEffect } from "react";
import GroupModal from "./Modals/GroupModal";

const Sidebar = ({ onSelectGroup }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroups] = useState([]);

  // Fetch groups from the backend
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("http://localhost:3000/get-groups");
        const data = await response.json();
        setGroups(data.map(group => group.group_name)); // Extracting only group names
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    fetchGroups();
  }, []);

  const handleCreateGroup = async (newGroup) => {
    try {
      const response = await fetch("http://localhost:3000/create-group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ groupName: newGroup }),
      });

      if (response.ok) {
        setGroups([...groups, newGroup]); // Update UI with new group
      } else {
        console.error("Failed to create group");
      }
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <>
      <aside className="text-gray-800 w-64 min-h-screen p-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2 px-4 w-full bg-white"
        >
          + Add Group
        </button>

        <ul className="mt-4">
          {groups.map((group, index) => (
            <li
              key={index}
              onClick={() => onSelectGroup(group)}
              className="py-2 px-4 hover:bg-gray-200 rounded cursor-pointer"
            >
              {group}
            </li>
          ))}
        </ul>
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
