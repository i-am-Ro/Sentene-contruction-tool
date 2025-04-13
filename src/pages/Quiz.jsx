import React, { useEffect, useState } from "react";
import SentenceQuestion from "../components/SentenceQuestion";
import FeedbackScreen from "../components/FeedbackScreen";
import QuitButton from "../components/QuitButton";
import QuitModal from "../components/QuitModal";

const hardcodedQuestions = [
  {
    questionId: "b28af948-db8b-465e-92e6-3d42534c4533",
    question:
      "The company's _____________ approach to product development _____________ customer feedback at every stage, _____________ user satisfaction and _____________ a loyal consumer base.",
    questionType: "text",
    answerType: "options",
    options: ["Incorporated", "User-centric", "Enhancing", "Cultivating"],
    correctAnswer: ["User-centric", "Incorporated", "Enhancing", "Cultivating"],
  },
  {
    questionId: "6e6534ea-260a-4c26-96fd-f830b27601fb",
    question:
      "The _____________ musical performance _____________ elements from various genres, _____________ the audience with its unique sound and _____________ critical acclaim from industry experts.",
    questionType: "text",
    answerType: "options",
    options: ["Captivating", "Eclectic", "Garnering", "Blended"],
    correctAnswer: ["Eclectic", "Blended", "Captivating", "Garnering"],
  },
  {
    questionId: "7186e3da-0384-460a-af19-5a3984758e78",
    question:
      "The scientist's _____________ research on quantum computing _____________ new possibilities for data processing, _____________ traditional limitations and _____________ the way for groundbreaking technological advancements.",
    questionType: "text",
    answerType: "options",
    options: ["Pioneering", "Paving", "Overcoming", "Opened up"],
    correctAnswer: ["Pioneering", "Opened up", "Overcoming", "Paving"],
  },
  {
    questionId: "10cbe3c2-13bb-4973-a794-18bf309b0791",
    question:
      "The _____________ implementation of machine learning algorithms in medical diagnostics _____________ early detection of diseases, _____________ treatment outcomes and _____________ the workload of healthcare professionals.",
    questionType: "text",
    answerType: "options",
    options: ["Improving", "Reducing", "Enabled", "Revolutionary"],
    correctAnswer: ["Revolutionary", "Enabled", "Improving", "Reducing"],
  },
  {
    questionId: "71ffe41e-8732-48e6-87f2-f84ea07eb060",
    question:
      "The _____________ security breach at the tech giant _____________ millions of users' data, _____________ concerns about online privacy and _____________ calls for stricter regulations.",
    questionType: "text",
    answerType: "options",
    options: ["Raising", "Massive", "Prompting", "Compromised"],
    correctAnswer: ["Massive", "Compromised", "Raising", "Prompting"],
  },
  {
    questionId: "48b9b4bd-5c2c-4c25-92c0-ce453b14e8d7",
    question:
      "The _____________ educational reform _____________ a more inclusive curriculum, _____________ equal opportunities for all students and _____________ the overall quality of public schooling.",
    questionType: "text",
    answerType: "options",
    options: ["Comprehensive", "Enhancing", "Implemented", "Promoting"],
    correctAnswer: ["Comprehensive", "Implemented", "Promoting", "Enhancing"],
  },
  {
    questionId: "ed5e6e2d-8408-406e-be32-777ac26460e2",
    question:
      "The company's _____________ commitment to sustainability _____________ eco-friendly practices across all departments, _____________ its carbon footprint and _____________ a model for corporate responsibility.",
    questionType: "text",
    answerType: "options",
    options: ["Implemented", "Setting", "Unwavering", "Reducing"],
    correctAnswer: ["Unwavering", "Implemented", "Reducing", "Setting"],
  },
  {
    questionId: "936eccaa-2f3b-4322-a3d3-ceabf2219dc5",
    question:
      "The _____________ implementation of artificial intelligence in healthcare _____________ patient outcomes, _____________ the workload of medical professionals and _____________ new avenues for personalized treatment.",
    questionType: "text",
    answerType: "options",
    options: ["Opening", "Improved", "Gradual", "Reducing"],
    correctAnswer: ["Gradual", "Improved", "Reducing", "Opening"],
  },
  {
    questionId: "d78effdf-88ab-4667-8115-3bfb2baa0a24",
    question:
      "The _____________ festival _____________ artists from diverse backgrounds, _____________ cultural exchange and _____________ a platform for emerging talents to showcase their work.",
    questionType: "text",
    answerType: "options",
    options: ["Providing", "Brought together", "Promoting", "International"],
    correctAnswer: [
      "International",
      "Brought together",
      "Promoting",
      "Providing",
    ],
  },
  {
    questionId: "2d08ec76-a253-4f34-bc45-e12ef21b78fb",
    question:
      "The _____________ implementation of smart city technologies _____________ urban efficiency and sustainability, _____________ quality of life for residents and _____________ a model for future urban development.",
    questionType: "text",
    answerType: "options",
    options: ["Enhancing", "Improved", "Providing", "Widespread"],
    correctAnswer: ["Widespread", "Improved", "Enhancing", "Providing"],
  },
];

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
    setQuestions(hardcodedQuestions); // Load hardcoded data
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
    window.location.href = "/";
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
              <p className="text-gray-500">{hardcodedQuestions.length}</p>
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
      <QuitButton onQuit={handleQuit} />
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
