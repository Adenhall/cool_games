import clsx from "clsx";
import React from "react";
import { useDrop } from "react-dnd";

import { GridData } from "../../types/puzzle";

interface PuzzleGridProps {
  accept: string;
  onDrop: (item: { id: number }, data: GridData) => void;
  data: GridData;
}

const PuzzleGrid: React.FC<PuzzleGridProps> = (
  { accept, onDrop, data },
) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept,
    drop: (item: { id: number }) => onDrop(item, data),
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
      {data.id}
    </div>
  );
};

export default PuzzleGrid;
