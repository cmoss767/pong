import { usePongContext } from "./PongContext";

const Ball = () => {
  const { ballPosition } = usePongContext();

  return (
    <div
      className="absolute left-2/4 transform -translate-x-2/4 -translate-y-2/4 w-4 h-4 bg-color-4 rounded-full"
      style={{ left: `${ballPosition.x}%`, top: `${ballPosition.y}%` }}
    />
  );
};

export default Ball;
