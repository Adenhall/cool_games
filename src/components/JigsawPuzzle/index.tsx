import React, { useState } from "react";
import { useDrop } from "react-dnd";
import PuzzlePiece from "./PuzzlePiece";
import update from "immutability-helper";

interface JigsawPuzzleProps {
  image: string;
  rows: number;
  columns: number;
}

const JigsawPuzzle: React.FC<JigsawPuzzleProps> = (
  { image, rows, columns },
) => {
  const [pieces, setPieces] = useState(
    Array.from({ length: rows * columns }, (_, index) => ({
      id: index,
      image: `${image}?${index}`,
      position: {
        x: (index % columns) * 100,
        y: Math.floor(index / columns) * 100,
      },
    })),
  );

  const [, drop] = useDrop(() => ({
    accept: "puzzlePiece",
    drop: (item: { id: number }, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset() as {
        x: number;
        y: number;
      };
      const index = pieces.findIndex((piece) => piece.id === item.id);
      const updatedPieces = update(pieces, {
        [index]: {
          position: {
            $apply: (position) => ({
              x: position.x + delta.x,
              y: position.y + delta.y,
            }),
          },
        },
      });

      setPieces(updatedPieces);
    },
  }), [pieces]);

  return (
    <div
      ref={drop}
      style={{
        width: columns * 100,
        height: rows * 100,
        position: "relative",
        border: "1px solid black",
      }}
    >
      {pieces.map((piece) => <PuzzlePiece key={piece.id} {...piece} />)}
    </div>
  );
};

export default JigsawPuzzle;
