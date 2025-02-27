import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const socket = io("http://localhost:3000"); // Update with your backend URL

const Chatroom = () => {
  const { groupName } = useParams(); // Get chatroom name from URL
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Simulate authentication (Replace with real auth logic)
    const storedUsername = localStorage.getItem("username") || `User${Math.floor(Math.random() * 1000)}`;
    localStorage.setItem("username", storedUsername);
    setUsername(storedUsername);

    if (!groupName) return;

    // Join the specific chatroom
    socket.emit("joinRoom", groupName);

    // Listen for messages for this chatroom
    socket.on("receiveMessage", (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      // Leave room on unmount
      socket.emit("leaveRoom", groupName);
      socket.off("receiveMessage");
    };
  }, [groupName]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const messageData = { group: groupName, text: input, sender: username };

    // Send message to server
    socket.emit("sendMessage", messageData);

    // Update UI immediately
    setMessages([...messages, messageData]);
    setInput("");
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidebar onSelectGroup={(group) => console.log("Selected group:", group)} />
        <div className="flex-1 flex flex-col p-6 ml-6"> 
          <div className="flex flex-col flex-1 bg-white p-4 rounded-lg shadow-md h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center">Text in {groupName}</p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-1 rounded-md w-fit max-w-xs ${
                    msg.sender === username
                      ? "bg-blue-500 text-white self-end" // User's messages
                      : "bg-gray-300 text-gray-800 self-start" // Other users' messages
                  }`}
                >
                  <p className="text-sm font-bold">{msg.sender !== username ? msg.sender : "You"}</p>
                  <p>{msg.text}</p>
                </div>
              ))
            )}
          </div>
          <div className="mt-4 flex">
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatroom;
