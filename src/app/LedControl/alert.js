// Alert.js
import React from 'react';

const Alert = ({ message, type, onClose }) => {
  const alertStyles = {
    success: 'bg-white text-gray-800',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${alertStyles[type]} transition-transform transform ${message ? 'scale-100' : 'scale-0'}`}
    >
      <div className="flex flex-col items-center">
        <span className="mb-4 text-center">{message}</span>
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition duration-300 ease-in-out"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default Alert;
