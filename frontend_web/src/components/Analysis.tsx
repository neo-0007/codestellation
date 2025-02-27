import React from "react";

const AnalysisBox = ({ bgColor, lightBgColor, title, content, children }) => {
  return (
    <div
      className={`relative w-108 h-52 ${bgColor} flex flex-col items-center justify-center text-white text-lg font-semibold rounded-lg shadow-lg overflow-hidden p-6`}
    >
      <div className={`absolute -top-16 -left-16 w-40 h-40 ${lightBgColor} rounded-full`} />
      <h3 className="relative z-10 text-xl font-bold">{title}</h3>
      <p className="relative z-10 text-sm text-center mb-4">{content}</p>
      {children}
    </div>
  );
};

const CircularProgress = ({ percentage }) => {
  return (
    <div className="relative w-20 h-20">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        <circle
          className="text-gray-300"
          stroke="currentColor"
          fill="transparent"
          strokeWidth="8"
          cx="50"
          cy="50"
          r="40"
        />
        <circle
          className="text-white"
          stroke="currentColor"
          fill="transparent"
          strokeWidth="8"
          strokeDasharray="251.2"
          strokeDashoffset={251.2 - (251.2 * percentage) / 100}
          cx="50"
          cy="50"
          r="40"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
        {percentage}%
      </div>
    </div>
  );
};

const AnalysisBoxes = () => {
  const stressLevel = 65; // Stress level (0-100)
  const socialStatus = "Active in 2 groups";

  return (
    <div className="flex justify-center items-center gap-6 p-8">
      <AnalysisBox
        bgColor="bg-purple-400"
        lightBgColor="bg-purple-200"
        title="Stress Meter"
        content="Your current stress level"
      >
        <CircularProgress percentage={stressLevel} />
      </AnalysisBox>

      <AnalysisBox
        bgColor="bg-indigo-400"
        lightBgColor="bg-indigo-200"
        title="Social Activity"
        content="Your engagement status"
      >
        <p className="relative z-10 text-lg font-bold">{socialStatus}</p>
      </AnalysisBox>
    </div>
  );
};

export default AnalysisBoxes;
