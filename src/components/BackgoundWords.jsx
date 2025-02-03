import { useEffect, useState } from "react";

const words = [
  "Fast", "Secure", "Reliable", "AI-Powered", "Customizable", "/projects", "/linkedin", "/connect-on-topmate", 
  "Scalable", "User-Friendly", "Real-Time", "Innovative", "Seamless", "/myResume", "/ig-handle", "/yt-subscribe", "/java-course", "/vlogs", "/ritik-portfolio", ""
];
const ROWS = 5; // Number of diagonal lines
// const WORDS_PER_ROW = Math.ceil(words.length / ROWS); // Words in each row
const WORDS_PER_ROW = 7; // Words in each row

const BackgroundWords = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: ROWS }).map((_, rowIndex) => {
        return words
          .slice(rowIndex * (words.length / ROWS), (rowIndex + 1) * (words.length / ROWS))
          .map((word, colIndex) => {
            const isMobile = window.innerWidth < 768; // Adjust for mobile screens

            const position = {
              top: isMobile ? `${rowIndex * 10}vw` : `${rowIndex * 15}%`, // Reduce spacing on mobile
              left: isMobile ? `${colIndex * 10}vw` : `${colIndex * 12}%`, // Scale properly for smaller screens
              fontSize: isMobile ? "0.8rem" : `${1.2 + (rowIndex + colIndex) * 0.1}rem`, // Adjust text size
              opacity: 0.3 + rowIndex * 0.1, // Make lower rows more visible
              transform: "rotate(-15deg)", // Slanted text for diagonal effect
              whiteSpace: "nowrap", // Prevents word wrapping
            };

            return (
              <span
                key={`${rowIndex}-${colIndex}`}
                className="absolute text-gray-500 font-bold floating-word"
                style={position}
              >
                {word}
              </span>
            );
          });
      })}
    </div>
  );
};

export default BackgroundWords;
