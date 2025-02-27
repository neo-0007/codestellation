import React, { useState, useEffect } from "react";
import TherapyModal from "./Modals/TherapyModal";

const Box = ({ bgColor, lightBgColor, title, content, onClick }) => {
  return (
    <div
      className={`relative w-108 h-52 ${bgColor} flex flex-col items-center justify-center text-white text-lg font-semibold rounded-lg shadow-lg overflow-hidden p-6 cursor-pointer`}
      onClick={onClick}
    >
      <div className={`absolute -top-16 -left-16 w-40 h-40 ${lightBgColor} rounded-full`} />
      <h3 className="relative z-10 text-xl font-bold">{title}</h3>
      <p className="relative z-10 text-sm text-center">{content}</p>
    </div>
  );
};

const TwoBoxes = () => {
  const [isTherapyModalOpen, setIsTherapyModalOpen] = useState(false);
  const [mood, setMood] = useState(localStorage.getItem("mood") || "Neutral");
  const [therapyTip, setTherapyTip] = useState("");

  useEffect(() => {
    const moodBasedTips = {
      Happy: "You're feeling great! Keep up the positivity by practicing gratitude or sharing a compliment with someone today. 😊",
      Sad: "It’s okay to feel down. Try journaling your thoughts, listening to calming music, or talking to a friend. 🫂",
      Neutral: "A balanced day ahead! Why not try meditation or a light walk to stay refreshed? 🌿",
      Stressed: "Take deep breaths. Consider a short mindfulness exercise or stretching to ease the tension. 🧘",
      Excited: "Use this energy creatively! Start a new project, learn a new skill, or plan a fun activity. 🎨",
    };

    setTherapyTip(moodBasedTips[mood] || "Self-care is important! Stay hydrated, get enough sleep, and take things one step at a time.");
  }, [mood]);

  return (
    <div className="flex justify-center items-center gap-6 p-8">
      <Box bgColor="bg-purple-500" lightBgColor="bg-purple-300" title="Mood Analysis" content="AI-based mood tracking and insights." />

      {/* Open Modal when clicking "Guided Therapy" */}
      <Box
        bgColor="bg-orange-500"
        lightBgColor="bg-orange-300"
        title="Guided Therapy"
        content="AI-based mental wellness sessions."
        onClick={() => setIsTherapyModalOpen(true)}
      />

      {/* Modal Component */}
      <TherapyModal
        isOpen={isTherapyModalOpen}
        onClose={() => setIsTherapyModalOpen(false)}
        title="Guided Therapy Tips"
        content={therapyTip}
      />
    </div>
  );
};

export default TwoBoxes;
