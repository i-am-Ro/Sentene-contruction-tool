import React from "react";
import OptionsGrid from "./OptionsGrid";

export default function SentenceQuestion({ question, answer, setAnswer }) {
  const selected = answer;

  const handleOptionClick = (word) => {
    const firstEmptyIndex = selected.findIndex((val) => val === "");
    if (firstEmptyIndex !== -1) {
      const updated = [...selected];
      updated[firstEmptyIndex] = word;
      setAnswer(updated);
    }
  };

  const handleBlankClick = (index) => {
    const updated = [...selected];
    updated[index] = "";
    setAnswer(updated);
  };

  const parts = question.question.split("_____________");

  return (
    <div className="space-y-6">
      <p className="text-lg leading-relaxed text-gray-800">
        {parts.map((part, idx) => (
          <React.Fragment key={idx}>
            {part}
            {idx < 4 && (
              <span
                onClick={() => handleBlankClick(idx)}
                className="inline-flex items-center justify-center min-w-[90px] px-3 py-1 mx-1 text-sm font-medium text-gray-800 bg-gray-100 border border-gray-300 rounded-full shadow-sm cursor-pointer hover:bg-gray-200"
              >
                {selected[idx] || "_____"}
              </span>
            )}
          </React.Fragment>
        ))}
      </p>
      <OptionsGrid
        options={question.options}
        usedWords={selected}
        onSelect={handleOptionClick}
      />
    </div>
  );
}
