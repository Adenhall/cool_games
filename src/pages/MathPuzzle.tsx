import { LoaderFunction } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { GameData } from "../types/game";

import { useGameManager } from "../contexts/GameManagerContext";

import { CONGRATULATION_LINES, MATH_PUZZLE_LEVELS } from "../config/game";

import JigsawPuzzle from "../components/JigsawPuzzle";
import Header from "../components/Header";
import GameCompleteModal from "../components/GameCompleteModal";

export const loader: LoaderFunction = (): GameData => {
  return {
    title: "Mad Math Puzzle",
    type: "math_puzzle",
  };
};

const pingSfx = new Audio("ping.wav");
const bloopSfx = new Audio("bloop.wav");

const MathPuzzle = () => {
  const {
    currentLevel,
    subtractScore,
    maxNegativeScore,
    negativeScore,
    nextLevel,
    resetGame,
  } = useGameManager();
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const levelData = MATH_PUZZLE_LEVELS[currentLevel];

  const handleCorrect = () => {
    pingSfx.play();
  };

  const handleWrong = () => {
    bloopSfx.play();
    subtractScore(1);
  };

  const handleComplete = () => {
    toast.success(
      CONGRATULATION_LINES[currentLevel] ||
        CONGRATULATION_LINES[
          Math.floor(Math.random() * CONGRATULATION_LINES.length)
        ],
    );

    setTimeout(() => {
      nextLevel();
    }, 2000);
  };

  useEffect(() => {
    if (!levelData) {
      resetGame();
      setShowCompleteModal(true);
    }
  }, [levelData, resetGame]);

  return (
    <>
      <Header />
      {levelData && (
        <div className="w-full h-5/6 p-6">
          <h1 className="text-lg">
            Chances left: {maxNegativeScore - negativeScore}
          </h1>
          <JigsawPuzzle
            key={`game-${currentLevel}`}
            image="/vite.svg"
            onCorrect={handleCorrect}
            onWrong={handleWrong}
            onComplete={handleComplete}
            {...levelData}
          />
        </div>
      )}
      {showCompleteModal && (
        <GameCompleteModal
          className="bg-sky-500/80"
          onClick={() => setShowCompleteModal(false)}
        />
      )}
    </>
  );
};

export default MathPuzzle;
