import { useEffect } from "react";
import Ball from "./Ball";
import { usePongContext } from "./PongContext";

function App() {
  const { paddlePosition, rightPaddlePosition, setPaddlePosition } =
    usePongContext();
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowUp") {
      setPaddlePosition((prevPosition) => Math.max(prevPosition - 5, 0));
    } else if (event.key === "ArrowDown") {
      setPaddlePosition((prevPosition) => Math.min(prevPosition + 5, 100));
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
      <div className="h-screen flex items-center justify-center bg-color-1 ">
        <div className="relative w-120 h-64 bg-color-5 border-4 border-color-2">
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
