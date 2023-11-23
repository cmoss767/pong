import { useEffect, useState } from "react";

function App() {
  const [paddlePosition, setPaddlePosition] = useState<number>(50);
  const [rightPaddlePosition, setRightPaddlePosition] = useState<number>(50);
  const [ballPosition, setBallPosition] = useState<{ x: number; y: number }>({
    x: 50,
    y: 50,
  });
  const [ballVelocity, setBallVelocity] = useState<{ x: number; y: number }>({
    x: 1,
    y: 1,
  });

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
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate automated movement with randomness for the right paddle
      const randomAdjustment = Math.random() * 10 - 5; // Random number between -5 and 5
      setRightPaddlePosition((prevPosition) =>
        Math.max(Math.min(prevPosition + randomAdjustment, 100), 0)
      );
    }, 500); // Adjust the interval based on your preference

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Move the ball
      setBallPosition((prevPosition) => ({
        x: prevPosition.x + ballVelocity.x,
        y: prevPosition.y + ballVelocity.y,
      }));

      // Check for collisions with top and bottom borders
      if (ballPosition.y <= 0 || ballPosition.y >= 100) {
        setBallVelocity((prevVelocity) => ({
          ...prevVelocity,
          y: -prevVelocity.y,
        }));
      }

      // Check for collision with left paddle
      if (
        ballPosition.x <= 2 + 4 && // Left edge of the paddle
        ballPosition.y >= paddlePosition &&
        ballPosition.y <= paddlePosition + 16
      ) {
        setBallVelocity((prevVelocity) => ({
          ...prevVelocity,
          x: -prevVelocity.x,
        }));
      }

      // Check for collision with right paddle
      if (
        ballPosition.x >= 94 && // Right edge of the paddle
        ballPosition.y >= rightPaddlePosition &&
        ballPosition.y <= rightPaddlePosition + 16
      ) {
        setBallVelocity((prevVelocity) => ({
          ...prevVelocity,
          x: -prevVelocity.x,
        }));
      }

      // Check if the ball went past the left paddle
      if (ballPosition.x < 0) {
        setBallPosition({ x: 50, y: 50 });
        setBallVelocity({ x: 1, y: 1 });
      }

      // Check if the ball went past the right paddle
      if (ballPosition.x > 96) {
        setBallPosition({ x: 50, y: 50 });
        setBallVelocity({ x: -1, y: 1 });
      }
    }, 16); // Adjust the interval based on your preference

    return () => {
      clearInterval(intervalId);
    };
  }, [ballPosition, ballVelocity, paddlePosition, rightPaddlePosition]);
  return (
    <div className="h-screen flex items-center justify-center bg-color-1">
      <div className="relative w-96 h-48 bg-color-5 border-4 border-color-2">
        {/* Paddle 1 */}
        <div
          className=" absolute  -translate-x-7 w-4 h-16 bg-color-2"
          style={{ top: `${paddlePosition}%` }}
        ></div>

        {/* Paddle 2 */}
        <div
          className="absolute left-full  translate-x-2/4 w-4 h-16 bg-color-3"
          style={{ top: `${rightPaddlePosition}%` }}
        ></div>

        {/* Ball */}
        <div
          className="absolute left-2/4 transform -translate-x-2/4 -translate-y-2/4 w-4 h-4 bg-color-4 rounded-full"
          style={{ left: `${ballPosition.x}%`, top: `${ballPosition.y}%` }}
        ></div>
      </div>
    </div>
  );
}

export default App;
