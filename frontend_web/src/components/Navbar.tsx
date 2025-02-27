import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-xl font-bold">Guest</a>
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
        <ul
          className={`md:flex space-x-4 absolute md:static bg-blue-600 md:bg-transparent w-full left-0 md:w-auto md:flex-row flex-col md:items-center items-start p-4 md:p-0 transition-all duration-300 ease-in-out ${
            isOpen ? "top-16" : "top-[-200px]"
          }`}
        >
          <li><a href="/" className="block py-2 px-4 hover:bg-blue-700 rounded">Home</a></li>
          <li><a href="/chatbot" className="block py-2 px-4 hover:bg-blue-700 rounded">Chatbot</a></li>
          <li><a href="#" className="block py-2 px-4 hover:bg-blue-700 rounded">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}
