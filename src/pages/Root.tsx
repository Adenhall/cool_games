import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";

function Root() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <Outlet />
    </DndProvider>
  );
}

export default Root;
