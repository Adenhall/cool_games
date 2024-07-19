import { useCallback, useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import * as handTrack from "handtrackjs";
import PuzzleGrid from "../components/JigsawPuzzle/PuzzleGrid";
import PuzzlePiece from "../components/JigsawPuzzle/PuzzlePiece";

const MathPuzzleSpecial = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const draggingRef = useRef<HTMLDivElement | null>(null);
  // const [isHandDragging, setIsHandDragging] = useState(true)

  const handleHandDetected = useCallback((bbox: number[]) => {
    if (draggingRef.current == null) return;

    const [x, y, width, height] = bbox;
    const handX = x + width / 2;
    const handY = y + height / 2;

    const event = new MouseEvent("mousemove", {
      clientX: handX,
      clientY: handY,
      bubbles: true,
      cancelable: true,
      view: window,
    });
    draggingRef.current.dispatchEvent(event);
  }, []);

  const runDetection = useCallback((model: handTrack.Model) => {
    if (videoRef.current) {
      model.detect(videoRef.current).then((predictions) => {
        const closedHands = predictions.find((p) => p.label === "closed");
        if (closedHands) {
          draggingRef.current.dispatchEvent(
            new Event("dragstart", {
              bubbles: true,
              cancelable: true,
              view: window,
              composed: true,
            }),
          );
          handleHandDetected(closedHands.bbox);
        }
        requestAnimationFrame(() => runDetection(model));
      });
    }
  }, [handleHandDetected]);

  useEffect(() => {
    if (videoRef.current == null) return () => {};

    (async () => {
      const model = await handTrack.load({
        flipHorizontal: false,
        outputStride: 16,
        imageScaleFactor: 1,
        maxNumBoxes: 20,
        iouThreshold: 0.2,
        scoreThreshold: 0.6,
        modelType: "ssd320fpnlite",
        modelSize: "large",
        bboxLineWidth: "2",
        fontSize: 17,
      });

      await handTrack.startVideo(videoRef.current!);

      runDetection(model);
    })();

    return () => handTrack.stopVideo(videoRef.current!);
  }, [runDetection]);

  return (
    <>
      <Header />
      <video
        ref={videoRef}
        autoPlay
        style={{ width: 400, height: 400 }}
      />
      <div className="w-full h-screen flex justify-center items-center">
        <PuzzleGrid
          accept="puzzlePiece"
          onDrop={() => console.log("Mic dropped!")}
          data={{
            id: 1,
            solved: false,
            problem: "U mad??",
          }}
        />
        <PuzzlePiece ref={draggingRef} id={1} result={1} />
      </div>
    </>
  );
};

export default MathPuzzleSpecial;
