function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-color-1">
      <div className="relative w-96 h-48 bg-color-5 border-4 border-color-2">
        {/* Paddle 1 */}
        <div
          className="absolute left-2/4 transform -translate-x-2/4 w-4 h-16 bg-color-2"
          style={{ top: "50%" }}
        ></div>

        {/* Paddle 2 */}
        <div
          className="absolute left-full transform translate-x-2/4 w-4 h-16 bg-color-3"
          style={{ top: "50%" }}
        ></div>

        {/* Ball */}
        <div className="absolute left-2/4 transform -translate-x-2/4 -translate-y-2/4 w-4 h-4 bg-color-4 rounded-full"></div>
      </div>
    </div>
  );
}

export default App;
