export type GameType = "math_puzzle" | "symbol_search";

export type GameData = {
  title: string;
  type: GameType;
  currentGame?: {
    level: number;
    score: number;
  };
};
