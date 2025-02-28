import React, { useState } from "react";

const GroupModal = ({ isOpen, onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!groupName.trim()) {
      setMessage({ type: "error", text: "Group name is required." });
      return;
    }

    setIsLoading(true);

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
        setMessage({ type: "success", text: "Group created successfully!" });
        onCreateGroup(groupName);
        setGroupName("");
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        setMessage({ type: "error", text: data.message || "Something went wrong." });
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage({ type: "error", text: "Failed to create group." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Backdrop with improved blur */}
      <div 
        className="fixed inset-0 bg-opacity-60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal content */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative z-10 mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Create New Group</h2>
          <button 
            className="text-gray-500 hover:text-gray-700 transition-colors"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6"> 
          <input
            id="groupName"
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            placeholder="Enter a unique name for your group"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          
          {message && (
            <div className={`mt-3 px-3 py-2 rounded-md text-sm ${
              message.type === "error" 
                ? "bg-red-50 text-red-700 border-l-4 border-red-500" 
                : "bg-green-50 text-green-700 border-l-4 border-green-500"
            }`}>
              {message.text}
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-3 mt-6">
          <button 
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button 
            className={`px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all ${
              isLoading ? "opacity-75 cursor-not-allowed" : ""
            }`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </span>
            ) : (
              "Create Group"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupModal;
