import { useCallback, useEffect } from "react";
import Header from "../components/Header";
import * as handTrack from "handtrackjs";
import PuzzleGrid from "../components/JigsawPuzzle/PuzzleGrid";
import PuzzlePiece from "../components/JigsawPuzzle/PuzzlePiece";
import {
  DragDropContext,
  Droppable,
  FluidDragActions,
  SensorAPI,
} from "@hello-pangea/dnd";

const useHandTrackSensor = (
  api: SensorAPI,
) => {
  const runDetection = useCallback(
    async (
      model: handTrack.Model,
      videoInput: HTMLVideoElement,
      drag?: FluidDragActions,
    ) => {
      try {
        const predictions = await model.detect(videoInput);
        const closedHand = predictions.find((p) => p.label === "closed");
        const openHand = predictions.find((p) => p.label === "open");

        if (closedHand) {
          console.log(closedHand.score);
          const [x, y, width, height] = closedHand.bbox;
          if (drag?.isActive()) {
            drag.move({ x: x + width / 2, y: y + height / 2 });
            return;
          }
          const preDrag = api.tryGetLock("1");
          if (!preDrag) return;

          drag = preDrag.fluidLift({ x: x + width / 2, y: y + height / 2 });
        } else if (openHand) {
          if (drag?.isActive()) {
            drag.drop();
          }
        }
      } catch (error) {
        console.error("Detection error:", error);
      } finally {
        requestAnimationFrame(() => runDetection(model, videoInput, drag));
      }
    },
    [api],
  );

  useEffect(() => {
    const videoInput = document.getElementById(
      "videoInput",
    ) as HTMLVideoElement;
    if (!videoInput) return () => {};

    (async () => {
      const model = await handTrack.load({
        flipHorizontal: true,
        outputStride: 16,
        imageScaleFactor: 1,
        maxNumBoxes: 20,
        iouThreshold: 0.2,
        scoreThreshold: 0.8,
        modelType: "ssd320fpnlite",
        modelSize: "large",
        bboxLineWidth: "2",
        fontSize: 17,
      });

      await handTrack.startVideo(videoInput);

      runDetection(model, videoInput);
    })();

    return () => handTrack.stopVideo(videoInput);
  }, [runDetection]);
};

const MathPuzzleSpecial = () => {
  return (
    <>
      <Header />
      <video
        id="videoInput"
        autoPlay
        className="w-[200px] h-[200px] absolute top-20 left-0"
        style={{ width: 200, height: 200, objectFit: "cover" }}
      />
      <DragDropContext
        onDragEnd={() => console.log("Dropped")}
        sensors={[useHandTrackSensor]}
      >
        <div className="w-full h-screen flex justify-center items-center">
          <PuzzleGrid
            data={{
              id: 1,
              solved: false,
              problem: "U mad??",
            }}
          />
          <Droppable droppableId="pieces-container">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <PuzzlePiece index={0} id={1} result={1} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </>
  );
};

export default MathPuzzleSpecial;
