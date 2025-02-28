import React, { useState, useEffect } from "react";

const TherapyModal = ({ isOpen, onClose, title }) => {
  const [currentTips, setCurrentTips] = useState([]);
  
  // Array of therapy tips
  const therapyTips = [
    "Practice mindful breathing for 5 minutes when feeling overwhelmed",
    "Write down three things you're grateful for each morning",
    "Take short breaks during work to stretch and reset your mind",
    "Limit social media consumption to reduce anxiety and comparison",
    "Schedule 'worry time' to contain anxious thoughts to a specific period",
    "Use the 5-4-3-2-1 grounding technique: identify 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste",
    "Replace negative self-talk with compassionate statements",
    "Create a bedtime routine to improve sleep quality",
    "Engage in physical activity to release endorphins",
    "Practice active listening in conversations instead of planning your response",
    "Set boundaries with people who drain your energy",
    "Try progressive muscle relaxation to release physical tension",
    "Use journaling to process difficult emotions"
  ];
  
  // Get 2-3 random tips whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      const numberOfTips = Math.random() > 0.5 ? 2 : 3; // Randomly choose 2 or 3
      const shuffled = [...therapyTips].sort(() => 0.5 - Math.random());
      setCurrentTips(shuffled.slice(0, numberOfTips));
    }
  }, [isOpen]);

  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Backdrop with blur effect */}
      <div 
        className="fixed inset-0 bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal content - made wider and added more padding */}
      <div className="bg-white w-full max-w-lg p-8 rounded-lg shadow-xl relative z-10 mx-4">
        <button 
          className="absolute top-3 right-4 text-gray-600 text-2xl font-bold hover:text-gray-800" 
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-indigo-600">Today's Wellness Tips:</h3>
          <ul className="space-y-3">
            {currentTips.map((tip, index) => (
              <li key={index} className="flex items-start">
                <span className="text-indigo-500 mr-2">•</span>
                <span className="text-gray-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-gray-500 text-sm italic">New tips will appear each time you open this modal.</p>
        </div>
      </div>
    </div>
  );
};

export default TherapyModal;
