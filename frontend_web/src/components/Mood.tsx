import React, { useState, useEffect } from 'react';

const Mood = () => {
  const [mood, setMood] = useState(localStorage.getItem("mood") || "Neutral");
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchMood = async () => {
      try {
        const res = await fetch('http://localhost:3000/get-mood');
        const data = await res.json();

        if (res.ok) {
          setMood(data.mood);
          localStorage.setItem("mood", data.mood); // ✅ Store in localStorage
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
      <h2 className="text-xl font-bold relative">Hi, {name}</h2>
      <p className="text-2xl relative">{mood}</p>
    </div>
  );
};

export default Mood;
