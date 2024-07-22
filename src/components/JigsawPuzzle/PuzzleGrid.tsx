import clsx from "clsx";
import { Droppable } from "@hello-pangea/dnd";

import { GridData } from "../../types/puzzle";

interface PuzzleGridProps {
  data: GridData;
}

const PuzzleGrid = ({ data }: PuzzleGridProps) => {

  return (
    <Droppable droppableId={`${data.id}`}>
      {(provided, { isDraggingOver }) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={clsx(
            "text-black flex justify-center items-center min-w-[100px] min-h-[100px] border",
            {
              "bg-blue-300": isDraggingOver,
              "bg-white": !isDraggingOver,
              "opacity-0": data.solved,
            },
          )}
        >
          {data.problem}
        </div>
      )}
    </Droppable>
  );
};

export default PuzzleGrid;
