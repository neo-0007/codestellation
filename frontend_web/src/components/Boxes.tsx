import React from "react";

const Box = ({ color, lightColor, title, content }) => {
  return (
    <div
      className={`relative w-52 h-52 bg-${color}-500 flex flex-col items-center justify-center text-white text-lg font-semibold rounded-lg shadow-lg overflow-hidden p-4`}
    >
      {/* Quarter-circle design */}
      <div className={`absolute -top-10 -left-10 w-32 h-32 ${lightColor} rounded-full`} />

      {/* Box Content */}
      <h3 className="relative z-10 text-xl font-bold">{title}</h3>
      <p className="relative z-10 text-sm text-center">{content}</p>
    </div>
  );
};

const FourBoxes = () => {
  return (
    <div className="flex justify-center items-center gap-6 p-8">
      <Box color="red" lightColor="bg-red-300" title="" content="Personalised Playlist." />
      <Box color="blue" lightColor="bg-blue-300" title="" content="Yoga Lessons." />
      <Box color="green" lightColor="bg-green-300" title="" content="Sleep Sounds." />
      <Box color="yellow" lightColor="bg-yellow-300" title="" content="Daily Quotes." />
    </div>
  );
};

export default FourBoxes;
