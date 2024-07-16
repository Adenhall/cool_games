import JigsawPuzzle from "../components/JigsawPuzzle";

const MathPuzzle = () => {
  return (
    <div className="w-full h-full p-6 max-h-[90vh]">
      <JigsawPuzzle image="/vite.svg" rows={3} columns={3} />
    </div>
  );
};

export default MathPuzzle;
