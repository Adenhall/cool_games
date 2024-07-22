import clsx from "clsx";
import { Draggable, DraggableStateSnapshot, DraggableStyle } from "@hello-pangea/dnd";

import { PieceData } from "../../types/puzzle";
import { forwardRef } from "react";

interface PuzzlePieceProps extends PieceData {
  index: number;
}
function getStyle(style: DraggableStyle, snapshot: DraggableStateSnapshot) {
  if (!snapshot.isDragging) return {};
  if (!snapshot.isDropAnimating) {
    return style;
  }

  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.001s`
  };
}
const PuzzlePiece = ({ id, index, result }: PuzzlePieceProps) => {
  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getStyle(provided.draggableProps.style!, snapshot)}
          className={clsx(
            "bg-[#45aaf2] text-black flex items-center justify-center rounded-lg w-[100px] h-[100px] cursor-pointer",
            {
              "opacity-50": snapshot.isDragging,
            },
          )}
        >
          {result}
        </div>
      )}
    </Draggable>
  );
});

export default PuzzlePiece;
