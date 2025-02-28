import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

// Create the socket outside the component to prevent multiple connections
const socket = io(`http://localhost:3000/`); // Update with your backend URL

const Chatroom = () => {
  const { groupName } = useParams(); // Get chatroom name from URL
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  // Handle group selection from sidebar
  const handleSelectGroup = (group) => {
    navigate(`/chat/${group}`);
  };

  useEffect(() => {
    // Check socket connection
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    // Simulate authentication (Replace with real auth logic)
    const storedUsername = localStorage.getItem("username") || `User${Math.floor(Math.random() * 1000)}`;
    localStorage.setItem("username", storedUsername);
    setUsername(storedUsername);

    // Clean up listeners
    return () => {
      socket.off('connect');
      socket.off('connect_error');
    };
  }, []);

  useEffect(() => {
    if (!groupName) return;

    console.log(`Joining room: ${groupName}`);
    
    // Join the specific chatroom
    socket.emit("joinRoom", groupName);
    
    // Listen for messages for this chatroom
    const messageHandler = (messageData) => {
      console.log('Received message:', messageData);
      setMessages((prevMessages) => [...prevMessages, messageData]);
    };
    
    socket.on("receiveMessage", messageHandler);
    
    // Clear messages when changing rooms
    setMessages([]);
    
    return () => {
      // Leave room on unmount or when groupName changes
      console.log(`Leaving room: ${groupName}`);
      socket.emit("leaveRoom", groupName);
      socket.off("receiveMessage", messageHandler);
    };
  }, [groupName]);

  const sendMessage = (e) => {
    e?.preventDefault();
    if (!input.trim() || !groupName) return;
    
    const messageData = { 
      group: groupName, 
      text: input, 
      sender: username,
      timestamp: new Date().toISOString()
    };
    
    // Send message to server
    console.log('Sending message:', messageData);
    socket.emit("sendMessage", messageData);
    
    // Don't update UI immediately - let the socket event handle it
    setInput("");
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar onSelectGroup={handleSelectGroup} />
        <div className="flex-1 flex flex-col p-6 ml-6">
          <div className="flex flex-col flex-1 bg-white p-4 rounded-lg shadow-md h-86 overflow-y-auto">
            {!groupName ? (
              <p className="text-gray-500 text-center">Please select a group from the sidebar</p>
            ) : messages.length === 0 ? (
              <p className="text-gray-500 text-center">No messages in {groupName} yet</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-1 rounded-md ${
                    msg.sender === username
                      ? "bg-blue-500 text-white self-end max-w-md"
                      : "bg-gray-300 text-gray-800 self-start max-w-md"
                  }`}
                >
                  <p className="text-sm font-bold">{msg.sender !== username ? msg.sender : "You"}</p>
                  <p>{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              ))
            )}
          </div>
          <form onSubmit={sendMessage} className="mt-4 flex">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder={groupName ? "Type a message..." : "Select a group to start chatting"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!groupName}
            />
            <button
              type="submit"
              disabled={!groupName || !input.trim()}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition disabled:bg-blue-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chatroom;
