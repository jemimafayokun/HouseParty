import React from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./HomePage";
import { GuestCanPauseProvider } from "../contexts/GuestsCanPause";
import { VotesToSkipProvider } from "../contexts/VotesToSkipContext";

const App = () => {
  return (
    <div className="center">
      <HomePage />
    </div>
  );
};

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);
