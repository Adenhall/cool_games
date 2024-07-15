import clsx from "clsx";
import React from "react";
import { useDrag } from "react-dnd";

import { PieceData } from "../../types/puzzle";

type PuzzlePieceProps = PieceData;

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ id, result }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "puzzlePiece",
    item: { id, result },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={clsx(
        "bg-white text-black flex items-center justify-center rounded-lg w-[100px] h-[100px]",
        {
          "opacity-50": isDragging,
        },
      )}
    >
      {result}
    </div>
  );
};

export default PuzzlePiece;
