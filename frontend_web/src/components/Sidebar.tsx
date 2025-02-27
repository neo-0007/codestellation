import React, { useState } from "react";
import GroupModal from "./Modals/GroupModal";

const Sidebar = ({ onSelectGroup }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groups, setGroups] = useState(["Happy People", "Trekking Group", "Sun Yoga"]); // Default groups

  const handleCreateGroup = (newGroup) => {
    setGroups([...groups, newGroup]); // Add new group to list
  };

  return (
    <>
      <aside className="text-gray-800 w-64 min-h-screen p-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2 px-4 w-full bg-white "
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
