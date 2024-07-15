import React, { useMemo, useState } from "react";

import PuzzlePiece from "./PuzzlePiece";
import PuzzleGrid from "./PuzzleGrid";

import { GridData, PieceData } from "../../types/puzzle";

import { arithmeticProblemGenerator } from "../../services/math";

interface JigsawPuzzleProps {
  image: string;
  rows: number;
  columns: number;
}

const shuffleArray = <T,>(array: T[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const JigsawPuzzle: React.FC<JigsawPuzzleProps> = (
  { image, rows, columns },
) => {
  const mathProblems = useMemo(
    () =>
      Array.from({ length: rows * columns }, (_, index) => ({
        ...arithmeticProblemGenerator.generateProblem(),
        id: index,
      })),
    [columns, rows],
  );
  const [pieces, setPieces] = useState(shuffleArray(mathProblems));
  const [grid, setGrid] = useState<GridData[]>(
    shuffleArray(
      mathProblems.map((problem) => ({ ...problem, solved: false })),
    ),
  );

  const handleDrop = (item: PieceData, gridData: GridData) => {
    if (item.id === gridData.id) {
      setPieces((pieces) => pieces.filter((piece) => piece.id !== item.id));
      setGrid((grid) =>
        grid.map(({ solved, ...gridItem }) => ({
          ...gridItem,
          solved: solved || gridItem.id === gridData.id,
        }))
      );
    }
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full h-full relative border-2 border-black">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          backgroundImage: `url(${image})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      >
        {grid.map((gridItem) => (
          <PuzzleGrid
            key={gridItem.id}
            accept="puzzlePiece"
            onDrop={handleDrop}
            data={gridItem}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {pieces.map((piece) => <PuzzlePiece key={piece.id} {...piece} />)}
      </div>
    </div>
  );
};

export default JigsawPuzzle;
