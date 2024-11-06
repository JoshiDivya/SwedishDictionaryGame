// src/VocabularyGame.js
import React, { useState, useEffect } from "react";
import "./VocabularyGame.css";

const VocabularyGame = () => {
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [showTranslation, setShowTranslation] = useState(false);

  // Fetch words.json on component mount
  useEffect(() => {
    const loadWords = async () => {
      try {
        const response = await fetch("/words.json");
        const data = await response.json();
        setWords(data);
      } catch (error) {
        console.error("Failed to load words:", error);
      }
    };
    loadWords();
  }, []); // Empty dependency array to run only once on mount

  const nextWord = () => {
    if (words.length === 0) return; // Ensure words are loaded
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentIndex(randomIndex);
    setShowTranslation(false); // Hide translation for the new word
  };

  const handleShowTranslation = () => {
    setShowTranslation(true);
  };

  return (
    <div className="game-container">
      <div className="word">
        {currentIndex !== -1
          ? words[currentIndex].swedish
          : "Click 'Next' for a word"}
      </div>
      {showTranslation && (
        <div className="translation">
          {currentIndex !== -1 && words[currentIndex].english}
        </div>
      )}
      <button onClick={handleShowTranslation}>Show</button>
      <button onClick={nextWord}>Next</button>
    </div>
  );
};

export default VocabularyGame;
