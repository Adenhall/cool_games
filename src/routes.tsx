import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Root, { loader as rootLoader } from "./pages/Root";
import Welcome from "./pages/Welcome";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" loader={rootLoader} element={<Root />}>
      <Route path="/" loader={rootLoader} element={<Welcome />} />
      <Route path="/pick" element={<div>Pick a game!</div>} />
    </Route>,
  ),
);
