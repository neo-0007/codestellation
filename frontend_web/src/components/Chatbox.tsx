import { useState, useEffect } from "react";
import { io } from "socket.io-client";

type Message = {
  text: string;
  sender: string;
};

// Create socket connection outside component to prevent multiple connections
const socket = io(`http://localhost:3000/`);

export default function Chatbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const receiveMessageHandler = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("receiveMessage", receiveMessageHandler);
    
    return () => {
      socket.off("receiveMessage", receiveMessageHandler);
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() !== "") {
      const userMessage = { text: input, sender: "user" };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      socket.emit("sendMessage", input);
      setInput("");
    }
  };

  // Extract Box component with proper TypeScript props
  const Box = ({ 
    bgColor, 
    lightBgColor, 
    title, 
    content 
  }: { 
    bgColor: string;
    lightBgColor: string;
    title: string;
    content: string;
  }) => {
    return (
      <div
        className={`relative w-full mx-auto my-4 h-32 ${bgColor} flex flex-col items-center justify-center text-white rounded-lg shadow-lg overflow-hidden p-6`}
      >
        <div className={`absolute top-2 right-8 w-40 h-40 ${lightBgColor} rounded-full opacity-50`} />
        <h3 className="relative z-10 text-xl font-bold mb-2">{title}</h3>
        <p className="relative z-10 text-sm text-center">{content}</p>
      </div>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 w-full flex flex-col h-[80vh] bg-white shadow-lg rounded-t-lg">
 
      
      {/* Messages container */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <Box 
          bgColor="bg-purple-600" 
          lightBgColor="bg-purple-400" 
          title="Express Yourself!" 
          content="Chat with your AI assistant and express your feelings with it." 
        />
        
        <div className="space-y-3">
          <div className="p-6 m-2 rounded-lg max-w-xs bg-gray-200 text-gray-800 self-start">
            <p className="text-base">Hi! How are you feeling today?</p>
          </div>
          
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-md ${
                msg.sender === "user" 
                  ? "bg-blue-500 text-white ml-auto" 
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p className="text-base">{msg.text}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Message input */}
      <div className="flex items-center p-3 border-t border-gray-200 bg-white m-6">
        <textarea
          className="flex-1 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          rows={1}
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <button
          className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
