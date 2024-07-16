import JigsawPuzzle from "../components/JigsawPuzzle";
import { useGameManager } from "../contexts/GameManagerContext";
import { MATH_PUZZLE_LEVELS } from "../config/game";

const MathPuzzle = () => {
  const { currentLevel } = useGameManager();
  const { rows, columns, addition, subtraction, multiplication, division } =
    MATH_PUZZLE_LEVELS[currentLevel];
  return (
    <div className="w-full h-full p-6 max-h-[90vh]">
      <JigsawPuzzle
        image="/vite.svg"
        rows={rows}
        columns={columns}
        settings={{ addition, subtraction, multiplication, division }}
      />
    </div>
  );
};

export default MathPuzzle;
