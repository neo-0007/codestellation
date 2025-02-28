import React, { useState, useEffect } from 'react';

const Mood = () => {
  const [mood, setMood] = useState(localStorage.getItem("mood") || "Neutral");
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchMood = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/user/${localStorage.getItem("id")}`);
        const data = await res.json();
        if (res.ok) {
          setMood(data.user.mood);
          localStorage.setItem("mood", data.user.mood); // ✅ Store in localStorage
        } else {
          console.log("API request failed");
        }
      } catch (err) {
        console.error("Error fetching mood:", err.message);
      }
    };

    const fetchName = () => {
      const storedName = localStorage.getItem('name');
      setName(storedName);
    };

    fetchMood();
    fetchName();
  }, []);

  return (
    <div className="relative p-8 bg-indigo-300 rounded-lg shadow-md w-full max-w-4xl mx-auto overflow-hidden">
      {/* Quarter Circle */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-400 rounded-br-full opacity-50"></div>

      {/* Mood Content */}
      <h2 className="text-xl font-bold relative text-white">Hi, {name}</h2>
      <p className="text-base relative text-white mt-2">You're currently feeling: <span className="font-bold">{mood}</span></p>
    </div>
  );
};

export default Mood;
