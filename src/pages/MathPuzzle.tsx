import { LoaderFunction } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { GameData } from "../types/game";

import { useGameManager } from "../contexts/GameManagerContext";

import { CONGRATULATION_LINES, MATH_PUZZLE_LEVELS } from "../config/game";

import JigsawPuzzle from "../components/JigsawPuzzle";
import Header from "../components/Header";
import Modal from "../components/Modal";

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
  const navigate = useNavigate();
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
        <Modal
          className="bg-sky-500/80"
          onClick={() => setShowCompleteModal(false)}
        >
          <div className="space-y-12">
            <h1 className="text-4xl text-white text-center">
              Ready for more fun?
            </h1>
            <div className="flex gap-4">
              <button className="bg-red-400" onClick={resetGame}>
                No thank you! Let me replay
              </button>
              <button onClick={() => navigate("/pick")}>
                Ooohh! Show me more!
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default MathPuzzle;
