import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface PongContextType {
  paddlePosition: number;
  rightPaddlePosition: number;
  setPaddlePosition: Dispatch<SetStateAction<number>>;
  setRightPaddlePosition: Dispatch<SetStateAction<number>>;
  ballPosition: { x: number; y: number };
}
interface PongProviderProps {
  children?: ReactNode;
}

export const PongContext = createContext<PongContextType | null>(null);

export const PongProvider = ({ children }: PongProviderProps) => {
  const [paddlePosition, setPaddlePosition] = useState<number>(50);
  const [rightPaddlePosition, setRightPaddlePosition] = useState<number>(50);
  const [ballPosition, setBallPosition] = useState<{ x: number; y: number }>({
    x: 50,
    y: 50,
  });
  const [ballVelocity, setBallVelocity] = useState<{ x: number; y: number }>({
    x: 0.75,
    y: 0.75,
  });

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
    <PongContext.Provider
      value={{
        paddlePosition,
        rightPaddlePosition,
        setPaddlePosition,
        setRightPaddlePosition,
        ballPosition,
      }}
    >
      {children}
    </PongContext.Provider>
  );
};

export const usePongContext = () => {
  const context = useContext(PongContext);

  if (context === null) {
    throw new Error("useAccount must be used within a AccountProvider");
  }
  return context;
};
