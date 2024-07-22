import { useEffect, useMemo, useState } from "react";
import { DragDropContext, Droppable, OnDragEndResponder } from "@hello-pangea/dnd";

import PuzzlePiece from "./PuzzlePiece";
import PuzzleGrid from "./PuzzleGrid";

import { GridData } from "../../types/puzzle";

import { arithmeticProblemGenerator } from "../../helpers/math";
import { shuffleArray } from "../../helpers/array";

interface JigsawPuzzleProps {
  image: string;
  rows: number;
  columns: number;
  onCorrect?: () => void;
  onWrong?: () => void;
  onComplete?: () => void;
  addition?: boolean;
  subtraction?: boolean;
  multiplication?: boolean;
  division?: boolean;
}

const JigsawPuzzle = (
  { image, rows, columns, onCorrect, onWrong, onComplete, ...settings }:
    JigsawPuzzleProps,
) => {
  const mathProblems = useMemo(
    () =>
      Array.from({ length: rows * columns }, (_, index) => ({
        ...arithmeticProblemGenerator.generateProblem(settings),
        id: index,
      })),
    [columns, rows, settings],
  );
  const [pieces, setPieces] = useState(shuffleArray(mathProblems));
  const [grid, setGrid] = useState<GridData[]>(
    shuffleArray(
      mathProblems.map((problem) => ({ ...problem, solved: false })),
    ),
  );

  const handleDrop: OnDragEndResponder = (result) => {
    const { draggableId, destination } = result;
    if (draggableId === destination?.droppableId) {
      setPieces((pieces) => pieces.filter((piece) => String(piece.id) !== draggableId));
      setGrid((grid) =>
        grid.map(({ solved, ...gridItem }) => ({
          ...gridItem,
          solved: solved || String(gridItem.id) === destination.droppableId,
        }))
      );

      onCorrect && onCorrect();
      return;
    }

    onWrong && onWrong();
  };

  useEffect(() => {
    if (grid.every((gridItem) => gridItem.solved)) {
      onComplete && onComplete();
    }
  }, [grid, onComplete]);

  return (
    <DragDropContext onDragEnd={handleDrop}>
      <div className="flex flex-col flex-wrap gap-8 justify-center items-center w-full h-full relative border-2 border-[#d1d8e0]">
        <div
          className="grid overflow-y-auto"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            backgroundImage: `url(${image})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          {grid.map((gridItem) => (
            <PuzzleGrid
              key={gridItem.id}
              data={gridItem}
            />
          ))}
        </div>
        <Droppable droppableId="pieces-container">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-wrap justify-center gap-2 overflow-y-auto w-1/2"
            >
              {pieces.map((piece, idx) => (
                <PuzzlePiece key={piece.id} {...piece} index={idx} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default JigsawPuzzle;
