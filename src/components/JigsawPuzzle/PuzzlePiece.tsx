import clsx from "clsx";
import { useDrag } from "react-dnd";

import { PieceData } from "../../types/puzzle";
import { forwardRef } from "react";

type PuzzlePieceProps = PieceData;

const PuzzlePiece = forwardRef<HTMLDivElement, PuzzlePieceProps>(({ id, result }, ref) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "puzzlePiece",
    item: { id, result },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={(node) => {
        drag(node)

        if (ref) ref.current = node
      }}
      className={clsx(
        "bg-[#45aaf2] text-black flex items-center justify-center rounded-lg w-[100px] h-[100px] cursor-pointer",
        {
          "opacity-50": isDragging,
        },
      )}
    >
      {result}
    </div>
  );
});

export default PuzzlePiece;
