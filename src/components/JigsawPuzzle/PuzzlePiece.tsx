import React from "react";
import { useDrag } from "react-dnd";

interface PuzzlePieceProps {
  id: number;
  image: string;
  position: { x: number; y: number };
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ id, image, position }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "puzzlePiece",
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        width: 100,
        height: 100,
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        opacity: isDragging ? 0.5 : 1,
      }}
    />
  );
};

export default PuzzlePiece;
