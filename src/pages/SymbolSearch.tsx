import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";

import Header from "../components/Header";
import { GameData } from "../types/game";
import { generateString } from "../helpers/string";
import { useGameManager } from "../contexts/GameManagerContext";
import { SYMBOL_SEARCH_LEVELS } from "../config/game";

export const loader = (): GameData => {
  return {
    title: "Symbol Detective",
    type: "symbol_search",
  };
};

const SymbolSearch = () => {
  const {
    currentLevel,
    subtractScore,
    score,
    addScore,
    negativeScore,
    maxNegativeScore,
    nextLevel,
    gameTag,
  } = useGameManager();
  const [symbols, setSymbols] = useState<string[]>([]);
  const [correctAnswersMap, setCorrectAnswersMap] = useState<
    Record<string, boolean>
  >({});
  const [magicSymbol, setMagicSymbol] = useState(
    symbols[Math.floor(Math.random() * symbols.length)],
  );
  const requiredScore = symbols.filter((s) => s === magicSymbol).length;

  const handleOnClick = (symbol: string, idx: number) => {
    if (symbol === magicSymbol && !correctAnswersMap[idx]) {
      setCorrectAnswersMap((prev) => ({ ...prev, [idx]: true }));
      addScore(1);
    } else if (symbol !== magicSymbol) {
      subtractScore(1);
    }
  };

  const newGame = useCallback(() => {
    const levelData = SYMBOL_SEARCH_LEVELS[currentLevel];
    const generated = generateString(levelData.feed, levelData.length).split(
      "",
    );
    setSymbols(generated);
    setMagicSymbol(generated[Math.floor(Math.random() * generated.length)]);
    setCorrectAnswersMap({});
  }, [currentLevel]);

  useEffect(() => {
    newGame();
  }, [currentLevel, gameTag, newGame]);

  useEffect(() => {
    if (requiredScore === score && symbols.length) {
      nextLevel();
    }
  }, [requiredScore, score, nextLevel, currentLevel, symbols]);

  return (
    <>
      <Header />
      <div className="w-full h-full flex flex-col items-center mt-12">
        <h1 className="text-3xl mb-5">
          Find the magic symbol: <strong>{magicSymbol}</strong>
        </h1>
        <h2 className="mb-5">Remaining: {requiredScore - score}</h2>
        <h2 className="mb-5">
          Chances left: {maxNegativeScore - negativeScore}
        </h2>
        <div className="flex flex-wrap gap-6 max-w-screen-md max-h-96 overflow-auto">
          {symbols.map((symbol, idx) => (
            <div
              key={`${symbol}-${idx}`}
              className={clsx(
                "cursor-pointer w-5 h-5 flex justify-center items-center",
                {
                  "bg-black": correctAnswersMap[idx],
                },
              )}
              onClick={() => handleOnClick(symbol, idx)}
            >
              {symbol}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SymbolSearch;
