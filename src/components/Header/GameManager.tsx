import { useGameManager } from "../../contexts/GameManagerContext";
import { GameData } from "../../types/game";

type Props = {
  gameInfo: GameData | null;
};

const GameManager = ({ gameInfo }: Props) => {
  const { currentLevel, nextLevel } = useGameManager();

  if (!gameInfo) return null;

  return (
    <div className="text-[#45aaf2] flex gap-2">
      <h3>{gameInfo.title}</h3>
      <p>Level {currentLevel}</p>
      <button onClick={nextLevel}>Next Level</button>
    </div>
  );
};

export default GameManager;
