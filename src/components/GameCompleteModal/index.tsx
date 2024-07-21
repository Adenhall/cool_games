import { HTMLAttributes } from "react";
import { useNavigate } from "react-router-dom";

import { useGameManager } from "../../contexts/GameManagerContext";

import Modal from "../Modal";

const GameCompleteModal = (props: HTMLAttributes<HTMLDivElement>) => {
  const { resetGame } = useGameManager();
  const navigate = useNavigate();

  return (
    <Modal {...props}>
      <div className="space-y-12">
        <h1 className="text-4xl text-white text-center">
          Ready for more fun?
        </h1>
        <div className="flex gap-4">
          <button className="bg-red-400" onClick={resetGame}>
            No thank you! Let me replay
          </button>
          <button onClick={() => navigate("/pick")}>
            Ooohh! Show me more!
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GameCompleteModal;
