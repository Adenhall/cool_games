import clsx from "clsx";
import { useDrop } from "react-dnd";

import { GridData, PieceData } from "../../types/puzzle";

interface PuzzleGridProps {
  accept: string;
  onDrop: (item: PieceData, data: GridData) => void;
  data: GridData;
}

const PuzzleGrid = ({ accept, onDrop, data }: PuzzleGridProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept,
    drop: (item: PieceData) => onDrop(item, data),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={clsx(
        "text-black flex justify-center items-center min-w-[100px] min-h-[100px] border",
        {
          "bg-blue-300": isOver,
          "bg-white": !isOver,
          "opacity-0": data.solved,
        },
      )}
    >
      {data.problem}
    </div>
  );
};

export default PuzzleGrid;
