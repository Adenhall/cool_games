import { LoaderFunction, Outlet, redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { GameManagerProvider } from "../contexts/GameManagerContext";

export const loader: LoaderFunction = ({ request }) => {
  const user = JSON.parse(window.localStorage.getItem("user") || "null");
  if (user?.name && request.url.endsWith("/")) return redirect("/pick");
  return user;
};

function Root() {
  return (
    <GameManagerProvider>
      <Outlet />
      <ToastContainer />
    </GameManagerProvider>
  );
}

export default Root;
