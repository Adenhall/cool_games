import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import JigsawPuzzle from "./components/JigsawPuzzle";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <JigsawPuzzle
        image="/vite.svg"
        rows={4}
        columns={4}
      />
    </DndProvider>
  );
}

export default App;
