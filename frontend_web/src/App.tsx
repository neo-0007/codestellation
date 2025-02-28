import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./pages/dashboard";
import Register from "./pages/Register";
import Chatbot from "./pages/Chatbot";
import Login from "./pages/Login";
import Chatroom from "./pages/Chatrooms";
import History from "./components/History";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/chatroom/:groupName" element={<Chatroom />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
