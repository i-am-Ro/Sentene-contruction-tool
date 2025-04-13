import React, { useEffect, useState } from "react";
import SentenceQuestion from "../components/SentenceQuestion";
import FeedbackScreen from "../components/FeedbackScreen";
import QuitButton from "../components/QuitButton";
import QuitModal from "../components/QuitModal";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [timer, setTimer] = useState(30);
  const [currentAnswer, setCurrentAnswer] = useState(["", "", "", ""]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showQuitModal, setShowQuitModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/data")
      .then((res) => res.json())
      .then((data) => setQuestions(data.questions));
  }, []);

  useEffect(() => {
    if (quizStarted) {
      setTimer(30);
      setCurrentAnswer(["", "", "", ""]);
    }
  }, [currentIndex, quizStarted]);

  useEffect(() => {
    if (timer === 0) handleNext();
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleNext = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentIndex] = currentAnswer;
    setUserAnswers(updatedAnswers);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setShowFeedback(true);
    }
  };

  const startQuiz = () => setQuizStarted(true);

  const handleQuit = () => setShowQuitModal(true);

  const handleConfirmQuit = () => {
    window.location.href = "/"; // Redirect to home page
  };

  const handleCancelQuit = () => setShowQuitModal(false);

  const current = questions[currentIndex];
  const allFilled = currentAnswer.every((w) => w !== "");

  if (showFeedback) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4">
        <FeedbackScreen questions={questions} userAnswers={userAnswers} />
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="bg-white rounded-xl text-center space-y-6 max-w-2xl w-full">
          <div className="text-5xl text-gray-600">
            <i className="fas fa-align-center"></i>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Sentence Construction
          </h1>

          <p className="text-gray-500">
            User have to contract a sentence a sentence with random words by
            placing it in a correct order.
          </p>

          <div className="grid grid-cols-3 gap-6 text-gray-700 text-sm mt-6">
            <div className="flex flex-col items-center">
              <p className="font-semibold">Time Per Question</p>
              <p className="text-gray-500">30 second</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Total Questions</p>
              <p className="text-gray-500">{questions.length || 10}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-semibold">Coins</p>
              <p className="text-yellow-500 font-medium">20 coins</p>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              className="px-6 py-2 border border-gray-400 text-gray-700 rounded-lg hover:bg-gray-100"
              onClick={() => window.history.back()}
            >
              Back
            </button>
            <button
              onClick={startQuiz}
              className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 shadow"
            >
              Start
            </button>
          </div>
        </div>
      </div>
    );
  }

  return current ? (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4 relative">
      {/* Quit Button in the top-right corner */}
      <QuitButton onQuit={handleQuit} />

      {/* Quit Modal */}
      <QuitModal
        isVisible={showQuitModal}
        onCancel={handleCancelQuit}
        onConfirm={handleConfirmQuit}
      />

      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 space-y-6">
        <div className="flex justify-start">
          <div className="text-xl font-semibold text-blue-700">
            Time Left: {timer}s
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
          <div className="flex">
            {questions.map((_, idx) => (
              <div
                key={idx}
                className={`h-2.5 ${
                  currentIndex >= idx ? "bg-yellow-400" : "bg-white"
                } rounded-full transition-all duration-300`}
                style={{ flex: 1, boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
              />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <SentenceQuestion
            question={current}
            answer={currentAnswer}
            setAnswer={setCurrentAnswer}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={!allFilled}
            className={`px-6 py-2 rounded-xl font-semibold text-white transition ${
              allFilled
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-300 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-center text-lg font-semibold">Loading questions...</p>
  );
}
