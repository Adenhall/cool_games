import { LoaderFunction } from "react-router";

import { useGameManager } from "../contexts/GameManagerContext";
import { MATH_PUZZLE_LEVELS } from "../config/game";

import JigsawPuzzle from "../components/JigsawPuzzle";
import Header from "../components/Header";
import { GameData } from "../types/game";

export const loader: LoaderFunction = (): GameData => {
  return {
    title: "Mad Math Puzzle",
    type: "math_puzzle",
  };
};

const pingSfx = new Audio("ping.wav");
const bloopSfx = new Audio("bloop.wav");

const MathPuzzle = () => {
  const { currentLevel } = useGameManager();
  const { rows, columns, addition, subtraction, multiplication, division } =
    MATH_PUZZLE_LEVELS[currentLevel];

  const handleCorrect = () => {
    pingSfx.play();
  };

  const handleWrong = () => {
    bloopSfx.play();
  };

  return (
    <>
      <Header />
      <div className="w-full h-full p-6 h-5/6">
        <JigsawPuzzle
          key={`game-${currentLevel}`}
          image="/vite.svg"
          rows={rows}
          columns={columns}
          settings={{ addition, subtraction, multiplication, division }}
          onCorrect={handleCorrect}
          onWrong={handleWrong}
        />
      </div>
    </>
  );
};

export default MathPuzzle;
