import { useGameManager } from "../contexts/GameManagerContext";
import { MATH_PUZZLE_LEVELS } from "../config/game";

import JigsawPuzzle from "../components/JigsawPuzzle";
import Header from "../components/Header";
import { LoaderFunction } from "react-router";
import { GameData } from "../types/game";

export const loader: LoaderFunction = (): GameData => {
  return {
    title: "Mad Math Puzzle",
    type: "math_puzzle",
  };
};

const MathPuzzle = () => {
  const { currentLevel } = useGameManager();
  const { rows, columns, addition, subtraction, multiplication, division } =
    MATH_PUZZLE_LEVELS[currentLevel];
  return (
    <>
      <Header />
      <div className="w-full h-full p-6 max-h-[90vh]">
        <JigsawPuzzle
          key={`game-${currentLevel}`}
          image="/vite.svg"
          rows={rows}
          columns={columns}
          settings={{ addition, subtraction, multiplication, division }}
        />
      </div>
    </>
  );
};

export default MathPuzzle;
