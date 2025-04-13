import React from "react";

export default function OptionsGrid({ options, usedWords, onSelect }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {options.map((opt, idx) => {
        const isUsed = usedWords.includes(opt);

        return (
          <button
            key={idx}
            onClick={() => onSelect(opt)}
            disabled={isUsed}
            className={`px-5 py-2 rounded-xl border text-sm font-medium transition-all duration-200
              ${
                isUsed
                  ? "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                  : "bg-white text-gray-800 border-gray-400 hover:bg-gray-100 shadow"
              }
            `}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
