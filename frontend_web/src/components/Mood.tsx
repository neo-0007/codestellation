import React, { useState, useEffect } from 'react';

const Mood = () => {
  const [mood, setMood] = useState("Neutral");

  useEffect(() => {
    // Example logic to change mood (you can replace this with actual logic)
    const moods = ["Happy", "Sad", "Excited", "Tired", "Neutral"];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];
    setMood(randomMood);
  }, []);

  return (
    <div className="p-4 bg-gray-200 rounded-lg shadow-md text-center w-full max-w-md mx-auto">
      <h2 className="text-lg font-bold">Current Mood</h2>
      <p className="text-xl">{mood}</p>
    </div>
  );
};

export default Mood;
