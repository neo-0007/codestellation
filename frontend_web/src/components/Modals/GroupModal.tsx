import React, { useState } from "react";

const GroupModal = ({ isOpen, onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [message, setMessage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!groupName.trim()) {
      setMessage({ type: "error", text: "Group name is required." });
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/create-group`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ groupName }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Group created!" });
        onCreateGroup(groupName);
        setGroupName("");
        onClose();
      } else {
        setMessage({ type: "error", text: data.message || "Something went wrong." });
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage({ type: "error", text: "Failed to create group." });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-lg font-bold mb-4">Create New Group</h2>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        {message && (
          <p className={`text-sm mt-2 ${message.type === "error" ? "text-red-500" : "text-green-500"}`}>
            {message.text}
          </p>
        )}
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 mr-2 bg-gray-300 rounded-md hover:bg-gray-400" onClick={onClose}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={handleSubmit}>
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupModal;
