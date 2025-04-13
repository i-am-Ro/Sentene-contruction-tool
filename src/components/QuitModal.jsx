import React from "react";

export default function QuitModal({ isVisible, onCancel, onConfirm }) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full">
        <p className="text-lg font-semibold text-gray-800 mb-4">
          Are you sure you want to quit? None of your answers will be saved.
        </p>
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Quit
          </button>
        </div>
      </div>
    </div>
  );
}
