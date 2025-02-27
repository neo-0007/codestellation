import React, { useState, useEffect } from 'react';

const Mood = () => {
  const [mood, setMood] = useState(localStorage.getItem("mood") || "Neutral");

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

    fetchMood(); // Call fetchMood on mount
  }, []);

  return (
    <div className="p-4 bg-gray-200 rounded-lg shadow-md text-center w-full max-w-md mx-auto">
      <h2 className="text-lg font-bold">Current Mood</h2>
      <p className="text-xl">{mood}</p>
    </div>
  );
};

export default Mood;
