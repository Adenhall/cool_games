import { useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import { toast } from "react-toastify";

import { GameData } from "../types/game";
import { generateString } from "../helpers/string";
import { useGameManager } from "../contexts/GameManagerContext";
import { CONGRATULATION_LINES, SYMBOL_SEARCH_LEVELS } from "../config/game";

import GameCompleteModal from "../components/GameCompleteModal";
import Header from "../components/Header";
import Spinner from "../components/Spinner";


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
    resetGame,
  } = useGameManager();
  const [symbols, setSymbols] = useState<string[]>([]);
  const [correctAnswersMap, setCorrectAnswersMap] = useState<
    Record<string, boolean>
  >({});
  const [magicSymbol, setMagicSymbol] = useState(
    symbols[Math.floor(Math.random() * symbols.length)],
  );
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [waiting, setWaiting] = useState(false);
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
    if (!levelData) {
      setShowCompleteModal(true);
      resetGame();
      return;
    }
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
      toast.success(CONGRATULATION_LINES[currentLevel] || "Well done!");
      setWaiting(true);
      setTimeout(() => {
        nextLevel();
        setWaiting(false);
      }, 2000);
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
        {waiting
          ? <Spinner />
          : (
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
          )}
        {showCompleteModal && (
          <GameCompleteModal
            className="bg-sky-500/80"
            onClick={() => setShowCompleteModal(false)}
          />
        )}
      </div>
    </>
  );
};

export default SymbolSearch;
