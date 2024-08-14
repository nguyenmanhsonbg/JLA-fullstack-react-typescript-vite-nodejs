import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { message } = location.state || { message: 'An unexpected error occurred.' };

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleGoHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">Error</h1>
        <p className="mt-4 text-2xl">{message}</p>
        <div className="mt-8">
          <button onClick={handleGoBack} className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">
            Go Back
          </button>
          <button onClick={handleGoHome} className="px-4 py-2 bg-green-500 text-white rounded">
            Home Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
