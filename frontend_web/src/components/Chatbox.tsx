
import { useState } from "react";

export default function Chatbox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 w-full flex flex-col h-[80vh] bg-white shadow-lg">

      <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg max-w-xs ${
              msg.sender === "user" ? "bg-blue-100 text-right self-end" : "bg-gray-100 text-left self-start"
            }`}
          >
            <p className="text-sm">{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center px-4 py-2 border-t border-gray-300 bg-white">
        <textarea
          className="flex-1 p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
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
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
