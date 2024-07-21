import { useNavigate } from "react-router";

import Header from "../components/Header";
import { useGameManager } from "../contexts/GameManagerContext";
import { useEffect } from "react";

const GamePicker = () => {
  const navigate = useNavigate();
  const { resetGame } = useGameManager();

  useEffect(resetGame, []);

  return (
    <>
      <Header />
      <div className="w-full h-full flex justify-center items-center text-gray-900 text-3xl gap-4">
        <button onClick={() => navigate("/symbol-search")}>
          Letter/Symbol Search
        </button>
        <button onClick={() => navigate("/math-puzzle")}>Math Puzzle</button>
      </div>
    </>
  );
};

export default GamePicker;
