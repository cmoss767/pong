import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PongProvider } from "./PongContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PongProvider>
      <App />
    </PongProvider>
  </React.StrictMode>
);
