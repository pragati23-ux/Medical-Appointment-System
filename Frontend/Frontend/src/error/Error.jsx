import React from "react";
import { useNavigate } from "react-router-dom";

const Error = ({ 
  message = "Something went wrong!", 
  statusCode = "Error",
  showBackButton = true 
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
        <div className="text-6xl font-bold text-red-600 mb-4">{statusCode}</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Oops!</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        
        {showBackButton && (
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  );
};

export default Error;
