import clsx from "clsx";
import { useDrag } from "react-dnd";

import { PieceData } from "../../types/puzzle";

type PuzzlePieceProps = PieceData;

const PuzzlePiece = ({ id, result }: PuzzlePieceProps) => {
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
        "bg-[#45aaf2] text-black flex items-center justify-center rounded-lg w-[100px] h-[100px] cursor-pointer",
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
