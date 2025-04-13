import React from "react";

export default function QuitButton({ onQuit }) {
  return (
    <button
      onClick={onQuit}
      className="absolute top-35 right-9 p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600"
    >
      Quit
    </button>
  );
}
