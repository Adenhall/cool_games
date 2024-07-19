import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Root, { loader as rootLoader } from "./pages/Root";
import Welcome from "./pages/Welcome";
import GamePicker from "./pages/GamePicker";
import MathPuzzle, { loader as mathPuzzleLoader } from "./pages/MathPuzzle";
import SymbolSearch, { loader as symbolSearchLoader } from "./pages/SymbolSearch";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" loader={rootLoader} element={<Root />}>
      <Route path="/" loader={rootLoader} element={<Welcome />} />
      <Route path="/pick" element={<GamePicker />} />
      <Route path="/symbol-search" loader={symbolSearchLoader} element={<SymbolSearch />} />
      <Route
        path="/math-puzzle"
        loader={mathPuzzleLoader}
        element={<MathPuzzle />}
      />
    </Route>,
  ),
);
