import './App.css'
import { useState } from 'react';
import Quiz from './components/Quiz';

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  const handleStartQuiz = () => {
    setIsQuizStarted(true);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-black text-gray-300">
        {!isQuizStarted ? (
          <>
            <h1 className="text-3xl font-bold text-gray-200 mb-4">Welcome to the Quiz App!</h1>
            <button onClick={handleStartQuiz} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Start the Quiz
            </button>
          </>
        ) : (
          <Quiz />
        )}
      </div>
    </>
  );
}

export default App;
