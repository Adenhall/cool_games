import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";

interface GameManagerContextProps {
  /* random string to trigger effects */
  gameTag: string;
  currentLevel: number;
  score: number;
  negativeScore: number;
  maxNegativeScore: number;
  isGameOver: boolean;
  nextLevel: () => void;
  addScore: (points: number) => void;
  subtractScore: (points: number) => void;
  resetGame: () => void;
}

const GameManagerContext = createContext<GameManagerContextProps | undefined>(
  undefined,
);

export const GameManagerProvider: React.FC<{ children: ReactNode }> = (
  { children },
) => {
  const [gameTag, setGameTag] = useState<string>(Math.random().toString());
  const [level, setLevel] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [negativeScore, setNegativeScore] = useState<number>(0);
  const maxNegativeScore = 10;

  const nextLevel = () => {
    setLevel((prev) => prev + 1);
    setScore(0);
    setNegativeScore(0);
  };

  const addScore = (points: number) => {
    setScore((prev) => prev + points);
  };

  const subtractScore = (points: number) => {
    setNegativeScore((prev) => prev + points);
  };

  const resetGame = () => {
    setGameTag(Math.random().toString());
    setLevel(0);
    setScore(0);
    setNegativeScore(0);
  };

  const isGameOver = useMemo(() => {
    return negativeScore >= maxNegativeScore;
  }, [negativeScore]);

  useEffect(() => {
    if (isGameOver) {
      toast.info("Game Over! Try Again");
      resetGame();
    }
  }, [isGameOver]);

  return (
    <GameManagerContext.Provider
      value={{
        gameTag,
        currentLevel: level,
        score,
        negativeScore,
        maxNegativeScore,
        nextLevel,
        addScore,
        subtractScore,
        resetGame,
        isGameOver,
      }}
    >
      {children}
    </GameManagerContext.Provider>
  );
};

export const useGameManager = (): GameManagerContextProps => {
  const context = useContext(GameManagerContext);
  if (context === undefined) {
    throw new Error("useGameManager must be used within a GameManagerProvider");
  }
  return context;
};
