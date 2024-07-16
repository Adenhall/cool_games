import { useRef } from "react";
import { useLocalStorage } from "usehooks-ts";
import { LocalStorageKeys } from "../config/localStorage";
import { useNavigate } from "react-router";
import { User } from "../types/user";

const Welcome = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [, setUser] = useLocalStorage<User | null>(LocalStorageKeys.USER, null);
  const navigate = useNavigate();

  const handleNameSubmit = () => {
    if (inputRef.current?.value) {
      setUser({ name: inputRef.current.value });
      navigate("/pick");
    }
  };
  return (
    <div className="w-full h-full mt-20 flex justify-center overflow-y-auto">
      <div>
        <label
          htmlFor="name"
          className="block text-2xl font-medium leading-6 mb-5 text-center"
        >
          What's your name, player?
        </label>
        <div className="w-96 h-20 rounded-md shadow-sm">
          <input
            ref={inputRef}
            id="name"
            name="name"
            type="text"
            className="w-full h-full rounded-full border-0 py-1.5 pl-7 pr-20 text-4xl text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          />
        </div>
        <button
          className="text-gray-900 mt-6 w-full"
          onClick={handleNameSubmit}
        >
          Let's gooo!
        </button>
      </div>
    </div>
  );
};

export default Welcome;
