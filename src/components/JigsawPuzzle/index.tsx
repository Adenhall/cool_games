import React, { useState } from "react";

import PuzzlePiece from "./PuzzlePiece";
import PuzzleGrid from "./PuzzleGrid";

import { GridData, PieceData } from "../../types/puzzle";

interface JigsawPuzzleProps {
  image: string;
  rows: number;
  columns: number;
}

const JigsawPuzzle: React.FC<JigsawPuzzleProps> = (
  { rows, columns },
) => {
  const [pieces, setPieces] = useState(
    Array.from({ length: rows * columns }, (_, index) => ({
      id: index,
    })),
  );
  const [grid, setGrid] = useState<
    { id: number }[]
  >(Array.from({ length: rows * columns }, (_, index) => ({
    id: index,
  })));

  const handleDrop = (item: PieceData, gridData: GridData) => {
    if (item.id === gridData.id) {
      setPieces((pieces) => pieces.filter((piece) => piece.id !== item.id));
    }
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full h-full relative border-2 border-black">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
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
      <div className="flex flex-wrap space-x-2">
        {pieces.map((piece) => <PuzzlePiece key={piece.id} {...piece} />)}
      </div>
    </div>
  );
};

export default JigsawPuzzle;
