import { useEffect } from "react";
import Ball from "./Ball";
import { usePongContext } from "./PongContext";

function App() {
  const {
    paddlePosition,
    rightPaddlePosition,
    setPaddlePosition,
    gameStarted,
    setGameStarted,
    score,
  } = usePongContext();
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      setPaddlePosition((prevPosition) => Math.max(prevPosition - 5, 0));
    } else if (event.key === "ArrowDown") {
      setPaddlePosition((prevPosition) => Math.min(prevPosition + 5, 100 - 20));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <div className="h-screen flex items-center justify-center bg-color-1 flex-col">
        {/* Scorecard */}
        <div className="mb-4 p-4 bg-color-5 text-color-1 text-xl font-bold rounded">
          Score: {score.left} - {score.right}
        </div>
        <div className="relative w-120 h-80 bg-color-5 border-4 border-color-2">
          {!gameStarted && (
            <div className="absolute inset-0 bg-blur flex items-center justify-center z-50">
              <button
                onClick={() => setGameStarted(true)}
                className="bg-color-1 text-white font-bold py-2 px-4 border border-white rounded"
              >
                Start Game
              </button>
            </div>
          )}

          {/* Paddle 1 */}
          <div
            className=" absolute translate-x-1 w-4 h-16 bg-color-2"
            style={{ top: `${paddlePosition}%` }}
          ></div>

          {/* Paddle 2 */}
          <div
            className="absolute left-full  -translate-x-6 w-4 h-16 bg-color-3"
            style={{ top: `${rightPaddlePosition}%` }}
          ></div>

          <Ball />
        </div>
      </div>
    </>
  );
}

export default App;
