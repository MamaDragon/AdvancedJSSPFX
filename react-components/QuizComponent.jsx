import React, { useState, useEffect, useCallback } from 'react';
import './QuizComponent.css';

/**
 * React version of the Quiz Component with advanced JavaScript features
 * Demonstrates generators, iterators, and dynamic DOM manipulation
 */
const QuizComponent = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Generator function for quiz iteration
  const quizIterator = function* (questions) {
    for (let i = 0; i < questions.length; i++) {
      yield {
        question: questions[i],
        index: i,
        isLast: i === questions.length - 1
      };
    }
  };

  // Custom iterator for results
  const createResultsIterator = (results) => {
    let index = 0;
    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        if (index < results.length) {
          return { value: results[index++], done: false };
        }
        return { done: true };
      }
    };
  };

  // Load quiz data on component mount
  useEffect(() => {
    loadQuizData();
  }, []);

  const loadQuizData = async () => {
    try {
      setIsLoading(true);
      // In SPFx, this would fetch from SharePoint Lists
      const response = await fetch('./quiz-data.json');
      const data = await response.json();
      setQuizData(data);
    } catch (error) {
      console.error('Failed to load quiz data:', error);
      // Fallback to mock data
      setQuizData([
        {
          question: "What is a WeakMap in JavaScript?",
          choices: ["Array type", "Object collection", "String method", "Function type"],
          correctAnswer: "Object collection"
        },
        {
          question: "What does a Proxy do?",
          choices: ["Server connection", "Interceptable operations", "Data storage", "Event handling"],
          correctAnswer: "Interceptable operations"
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    setCurrentAnswers(prev => ({
      ...prev,
      [questionIndex]: selectedAnswer
    }));
  };

  const calculateScore = useCallback(() => {
    const results = [];
    let score = 0;

    // Use generator to iterate through questions
    for (const { question, index } of quizIterator(quizData)) {
      const userAnswer = currentAnswers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      
      if (isCorrect) score++;
      
      results.push({
        question: index + 1,
        questionText: question.question,
        selected: userAnswer || 'Not answered',
        correct: question.correctAnswer,
        isCorrect: isCorrect
      });
    }

    return {
      score,
      total: quizData.length,
      percentage: Math.round((score / quizData.length) * 100),
      results
    };
  }, [quizData, currentAnswers]);

  const handleSubmit = () => {
    const quizResults = calculateScore();
    setResults(quizResults);
    setIsSubmitted(true);
    
    // Save results to localStorage
    localStorage.setItem('quizResults', JSON.stringify(quizResults));
  };

  const resetQuiz = () => {
    setCurrentAnswers({});
    setIsSubmitted(false);
    setResults(null);
  };

  if (isLoading) {
    return (
      <div className="quiz-container">
        <div className="text-center">
          <h2>Loading Quiz...</h2>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>📚 Interactive Quiz System</h1>
        <p>Demonstrating generators, iterators, and dynamic React components</p>
      </div>

      <div className="features-showcase alert alert-info">
        <h5>🎯 JavaScript Features Demonstrated:</h5>
        <ul className="mb-0">
          <li><strong>Generators:</strong> Quiz iteration with yield</li>
          <li><strong>Iterators:</strong> Custom result processing</li>
          <li><strong>React Hooks:</strong> State management and effects</li>
          <li><strong>Dynamic Rendering:</strong> Question components</li>
        </ul>
      </div>

      {!isSubmitted ? (
        <div className="quiz-section">
          <h3>Answer the following questions:</h3>
          
          {quizData.map((question, questionIndex) => (
            <div key={questionIndex} className="question-card mb-4">
              <h5>{questionIndex + 1}. {question.question}</h5>
              
              {question.choices.map((choice, choiceIndex) => (
                <div key={choiceIndex} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`question-${questionIndex}`}
                    id={`q${questionIndex}-${choiceIndex}`}
                    value={choice}
                    checked={currentAnswers[questionIndex] === choice}
                    onChange={() => handleAnswerChange(questionIndex, choice)}
                  />
                  <label 
                    className="form-check-label" 
                    htmlFor={`q${questionIndex}-${choiceIndex}`}
                  >
                    {choice}
                  </label>
                </div>
              ))}
            </div>
          ))}

          <div className="submit-section text-center">
            <button 
              className="btn btn-success btn-lg"
              onClick={handleSubmit}
              disabled={Object.keys(currentAnswers).length === 0}
            >
              Submit Quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="results-section">
          <div className="alert alert-success">
            <h4>Quiz Results</h4>
            <p>
              Score: {results.score} / {results.total} ({results.percentage}%)
            </p>
          </div>

          <h5>Detailed Results:</h5>
          {(() => {
            const resultsList = [];
            const resultsIterator = createResultsIterator(results.results);
            
            for (const result of resultsIterator) {
              resultsList.push(
                <div key={result.question} className={`card mb-2 ${result.isCorrect ? 'border-success' : 'border-danger'}`}>
                  <div className="card-body">
                    <h6 className="card-title">
                      Question {result.question} 
                      {result.isCorrect ? ' ✅' : ' ❌'}
                    </h6>
                    <p className="card-text">
                      <strong>Question:</strong> {result.questionText}<br />
                      <strong>Your Answer:</strong> {result.selected}<br />
                      <strong>Correct Answer:</strong> {result.correct}
                    </p>
                  </div>
                </div>
              );
            }
            
            return resultsList;
          })()}

          <div className="text-center mt-4">
            <button className="btn btn-primary" onClick={resetQuiz}>
              Take Quiz Again
            </button>
          </div>
        </div>
      )}

      <div className="architecture-info mt-4">
        <h5>Code Architecture:</h5>
        <ul>
          <li><strong>React Components:</strong> Functional components with hooks</li>
          <li><strong>Generator Functions:</strong> Quiz iteration management</li>
          <li><strong>Custom Iterators:</strong> Result processing</li>
          <li><strong>State Management:</strong> React hooks for data flow</li>
        </ul>
      </div>
    </div>
  );
};

export default QuizComponent;
