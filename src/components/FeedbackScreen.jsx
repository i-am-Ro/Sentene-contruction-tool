import React from "react";

export default function FeedbackScreen({ questions, userAnswers }) {
  let score = 0;

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg w-full max-w-4xl space-y-6">
      {/* Final Score */}
      <div className="text-3xl font-bold text-center text-blue-800 mb-6">
        🎯 Your Score:{" "}
        {
          userAnswers.filter((ans, idx) => {
            const correct = questions[idx]?.correctAnswer;
            return JSON.stringify(ans) === JSON.stringify(correct);
          }).length
        }{" "}
        / {questions.length}
      </div>

      {/* Feedback for each question */}
      {questions.map((q, idx) => {
        const user = userAnswers[idx] || [];
        const correct = q.correctAnswer;
        const isCorrect = JSON.stringify(user) === JSON.stringify(correct);
        const isAnswered = user.length > 0 && !user.every((w) => w === "");
        const isTimedOut = q.timeUp && !isAnswered;

        if (isCorrect) score++;

        // Question filled with correct answers
        const correctFilled = q.question
          .split("_____________")
          .map((part, i) => (
            <React.Fragment key={i}>
              {part}
              {i < correct.length && (
                <span className="font-semibold text-blue-800">
                  {correct[i]}
                </span>
              )}
            </React.Fragment>
          ));

        // Question filled with user's answers
        const userFilled = q.question.split("_____________").map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < user.length && (
              <span className="font-semibold text-gray-800">
                {user[i] || "_____"}
              </span>
            )}
          </React.Fragment>
        ));

        return (
          <div
            key={q.questionId}
            className="relative p-6 border border-gray-200 rounded-xl bg-gray-50 space-y-4"
          >
            {/* Question Number Top Right */}
            <div className="absolute top-2 right-4 text-lg font-bold text-gray-700">
              Q{idx + 1}
            </div>

            {/* Correctly Filled Question */}
            <div>
              <p className="text-gray-800 font-medium">✅ Correct Answer:</p>
              <p className="text-lg text-blue-800">{correctFilled}</p>
            </div>

            {/* User Response */}
            <div>
              <p className="text-gray-800 font-medium">📝 Your Response:</p>
              {isAnswered ? (
                <>
                  <p
                    className={`text-base font-semibold ${
                      isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isCorrect ? "Correct ✅" : "Incorrect ❌"}
                  </p>
                  <p className="text-gray-700 mt-1">{userFilled}</p>
                </>
              ) : isTimedOut ? (
                <p className="text-gray-500 font-semibold">
                  You didn't answer in time ⏱️
                </p>
              ) : (
                <p className="text-gray-500 font-semibold">Not answered ❌</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
