import { useGameManager } from "../../contexts/GameManagerContext";
import { GameData } from "../../types/game";

type Props = {
  gameInfo: GameData | null;
};

const GameManager = ({ gameInfo }: Props) => {
  const { currentLevel, resetGame } = useGameManager();

  if (!gameInfo) return null;

  return (
    <div className="text-[#45aaf2] flex items-center gap-2">
      <h1 className="text-xl">{gameInfo.title}</h1>
      <p className="font-bold">Level {currentLevel}</p>
      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
};

export default GameManager;
