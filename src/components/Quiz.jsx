import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);
  const [isLastQuestion, setIsLastQuestion] = useState(false);



const fetchQuestions = async () => {
    try {
      const proxyUrl = 'https://api.allorigins.win/raw?url=';
      const url = 'https://api.jsonserve.com/Uw5CrX';
      
      const response = await axios.get(proxyUrl + encodeURIComponent(url));
      console.log(response.data.questions);
      setQuestions(response.data.questions);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => { 
    fetchQuestions();
  }, []);


  const handleOptionClick = (option) => { 
    // Check if the selected option is correct
    if(option.is_correct) { 
        setScore(score + 1);
    }



    // Update the selected option array
    const updatedSelectedOption = [...selectedOption];
    updatedSelectedOption[currentQuestion] = option;
    setSelectedOption(updatedSelectedOption);

    // Move to the next question or show the score if it's the last question
    if(currentQuestion < questions.length - 1) { 
        setCurrentQuestion(currentQuestion + 1);
        setIsFirstQuestion(false);
    } else { 
        setShowScore(true);
    }
  }

  const handlePlayAgain = () => { 
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption([]);
    setIsFirstQuestion(true);
  }

  const handleNextQuestion = () => { 
    setCurrentQuestion(currentQuestion + 1);
    setIsFirstQuestion(false);
    if(currentQuestion === questions.length - 2) { 
        setIsLastQuestion(true);
    }
  }

  const handlePreviousQuestion = () => { 
    setCurrentQuestion(currentQuestion - 1);
    setIsLastQuestion(false);
    if(currentQuestion === 1) { 
        setIsFirstQuestion(true);
    }
  }
  
  return (
    <div className='quiz-container bg-black text-gray-300 p-4 rounded-lg shadow-lg flex flex-col items-center justify-center' style={{ width: '600px' }}>
      <h1 className='text-3xl font-bold text-gray-200'>Quiz App</h1>
      {showScore ? (
        <>
        <div className='score-section text-center'>
          <h2 className='text-2xl font-semibold text-gray-200'>You scored {score} out of {questions.length}</h2>
          <button onClick={handlePlayAgain} className='mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
            Play Again
          </button>
        </div>
        </>
      ) : (
        <> 
        <div className='question-section'>
          <div className='question-count text-gray-400'>
            <span>Question {currentQuestion + 1}</span>/{questions.length}
          </div>
          <div className='question-text text-xl text-gray-200'>{questions[currentQuestion]?.description || 'Question not available'}</div>
        </div>
        <div className='answer-section flex flex-col w-full'>
          {questions[currentQuestion]?.options.map((option) => (
            <button key={option.id} onClick={() => handleOptionClick(option)} className='mt-2 bg-gray-700 hover:bg-gray-600 text-gray-200 py-2 px-4 rounded w-full'>
              {option.description}
            </button>
          ))}
        </div>
        <div className='navigation-buttons flex justify-center mt-4'>
          {!isFirstQuestion && <button onClick={handlePreviousQuestion} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4'>
            Previous
          </button>}
          {!isLastQuestion && <button onClick={handleNextQuestion} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4'>
            Next
          </button>}
        </div>
        </> ) }
      
    </div>
  )
}

export default Quiz
