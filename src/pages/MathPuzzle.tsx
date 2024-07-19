import { LoaderFunction } from "react-router";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { GameData } from "../types/game";

import { useGameManager } from "../contexts/GameManagerContext";

import { MATH_PUZZLE_LEVELS } from "../config/game";

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
  const [showHiddenLevel, setShowHiddenLevel] = useState(false);
  const navigate = useNavigate();
  const levelData = MATH_PUZZLE_LEVELS[currentLevel];

  const handleCorrect = () => {
    pingSfx.play();
  };

  const handleWrong = () => {
    bloopSfx.play();
    subtractScore(1);
  };

  useEffect(() => {
    if (!levelData) {
      setShowHiddenLevel(true);
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
            onComplete={nextLevel}
            {...levelData}
          />
        </div>
      )}
      {showHiddenLevel && (
        <Modal
          className="bg-sky-500/80"
          onClick={() => setShowHiddenLevel(false)}
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
