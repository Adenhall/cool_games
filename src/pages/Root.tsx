import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { LoaderFunction, Outlet, redirect } from "react-router-dom";

import Header from "../components/Header";

export const loader: LoaderFunction = ({ request }) => {
  const user = JSON.parse(window.localStorage.getItem("user") || "null");
  if (user?.name && !request.url.includes("pick")) return redirect("/pick");
  return user;
};

function Root() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <Outlet />
    </DndProvider>
  );
}

export default Root;
