import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Root, { loader as rootLoader } from "./pages/Root";
import Welcome from "./pages/Welcome";
import GamePicker from "./pages/GamePicker";
import MathPuzzle, { loader as mathPuzzleLoader } from "./pages/MathPuzzle";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" loader={rootLoader} element={<Root />}>
      <Route path="/" loader={rootLoader} element={<Welcome />} />
      <Route path="/pick" element={<GamePicker />} />
      <Route path="/symbol-search" element={<h1>Under construction 🚧</h1>} />
      <Route path="/math-puzzle" loader={mathPuzzleLoader} element={<MathPuzzle />} />
    </Route>,
  ),
);
