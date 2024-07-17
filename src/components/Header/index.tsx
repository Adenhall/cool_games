import { Link, useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

import { LocalStorageKeys } from "../../config/localStorage";
import { User } from "../../types/user";
import { useGameManager } from "../../contexts/GameManagerContext";

const Header = () => {
  const [user, , removeUser] = useLocalStorage<User | null>(
    LocalStorageKeys.USER,
    null,
  );
  const navigate = useNavigate();
  const { currentLevel, nextLevel, gameInfo } = useGameManager();

  const logout = () => {
    removeUser();
    navigate("/");
  };

  return (
    <header className="bg-[#d1d8e0] border-b">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <Link
          to="/"
          className="flex items-center space-x-2 lg:flex-1 -m-1.5 p-1.5"
        >
          <span className="sr-only">Your Company</span>
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          />
          <h1 className="font-bold text-2xl">Cool Games</h1>
        </Link>
        {gameInfo && (
          <div className="text-[#45aaf2] flex gap-2">
            <h3>{gameInfo.title}</h3>
            <p>Level {currentLevel}</p>
            <button onClick={nextLevel}>Next Level</button>
          </div>
        )}
        {user && (
          <div className="flex items-center space-x-4">
            <h1 className="text-[#45aaf2] text-lg">Welcome, {user.name}!</h1>
            <button className="text-gray-900" onClick={logout}>Not you?</button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
