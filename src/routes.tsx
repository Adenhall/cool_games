import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Root from "./pages/Root";
import Welcome from "./pages/Welcome";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<Welcome />} />
      <Route path="/pick" element={<div>Pick a game!</div>} />
    </Route>,
  ),
);
