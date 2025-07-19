import React, { useState, useEffect, useRef } from 'react';
import './AdminComponent.css';

/**
 * React version of the Admin Component with CRUD operations
 * Demonstrates dynamic form generation and state management
 */
const AdminComponent = () => {
  const [quizData, setQuizData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    choices: '',
    correctAnswer: ''
  });

  // Refs for form handling
  const questionRefs = useRef({});

  useEffect(() => {
    loadQuizData();
  }, []);

  const loadQuizData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('./quiz-data.json');
      const data = await response.json();
      setQuizData(data);
    } catch (error) {
      console.error('Failed to load quiz data:', error);
      loadMockData();
    } finally {
      setIsLoading(false);
    }
  };

  const loadMockData = () => {
    setQuizData([
      {
        id: 1,
        question: "What is a WeakMap in JavaScript?",
        choices: ["Array type", "Object collection", "String method", "Function type"],
        correctAnswer: "Object collection"
      },
      {
        id: 2,
        question: "What does a Proxy do?",
        choices: ["Server connection", "Interceptable operations", "Data storage", "Event handling"],
        correctAnswer: "Interceptable operations"
      }
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const updatedData = [...quizData];
    if (field === 'choices') {
      updatedData[index][field] = value.split(',').map(c => c.trim()).filter(c => c);
    } else {
      updatedData[index][field] = value;
    }
    setQuizData(updatedData);
  };

  const deleteQuestion = (index) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      const updatedData = quizData.filter((_, i) => i !== index);
      setQuizData(updatedData);
      showMessage('Question deleted successfully!', 'success');
    }
  };

  const addQuestion = () => {
    if (!newQuestion.question || !newQuestion.choices || !newQuestion.correctAnswer) {
      showMessage('Please fill in all fields for the new question.', 'error');
      return;
    }

    const choices = newQuestion.choices.split(',').map(c => c.trim()).filter(c => c);
    if (choices.length < 2) {
      showMessage('Please provide at least 2 choices.', 'error');
      return;
    }

    if (!choices.includes(newQuestion.correctAnswer.trim())) {
      showMessage('The correct answer must be one of the choices.', 'error');
      return;
    }

    const newQuestionData = {
      id: Date.now(),
      question: newQuestion.question,
      choices: choices,
      correctAnswer: newQuestion.correctAnswer.trim()
    };

    setQuizData([...quizData, newQuestionData]);
    setNewQuestion({ question: '', choices: '', correctAnswer: '' });
    showMessage('Question added successfully!', 'success');
  };

  const saveAllChanges = async () => {
    try {
      // In SPFx, this would save to SharePoint Lists
      const jsonData = JSON.stringify(quizData, null, 2);
      localStorage.setItem('quizData', jsonData);
      
      showMessage('All changes saved successfully!', 'success');
    } catch (error) {
      console.error('Save failed:', error);
      showMessage('Failed to save changes.', 'error');
    }
  };

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  const previewQuestion = (index) => {
    const question = quizData[index];
    const previewMessage = `
      Question: ${question.question}
      Choices: ${question.choices.join(' | ')}
      Correct Answer: ${question.correctAnswer}
    `;
    alert(previewMessage);
  };

  const exportQuizData = () => {
    const dataStr = JSON.stringify(quizData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'quiz-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className="admin-container">
        <div className="text-center">
          <h2>Loading Admin Panel...</h2>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>⚙️ Quiz Administration Panel</h1>
        <p>Manage quiz questions with dynamic React forms</p>
      </div>

      <div className="features-showcase alert alert-info">
        <h5>🎯 JavaScript Features Demonstrated:</h5>
        <ul className="mb-0">
          <li><strong>Dynamic Forms:</strong> React-controlled components</li>
          <li><strong>CRUD Operations:</strong> Create, Read, Update, Delete</li>
          <li><strong>State Management:</strong> Complex state with hooks</li>
          <li><strong>Real-time Updates:</strong> Immediate UI feedback</li>
        </ul>
      </div>

      {message && (
        <div className={`alert ${messageType === 'error' ? 'alert-danger' : 'alert-success'} alert-dismissible`}>
          {message}
          <button 
            type="button" 
            className="btn-close"
            onClick={() => setMessage('')}
          ></button>
        </div>
      )}

      <div className="admin-stats mb-4">
        <div className="row">
          <div className="col-md-4">
            <div className="stat-card">
              <h3>{quizData.length}</h3>
              <p>Total Questions</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card">
              <h3>{quizData.filter(q => q.choices.length >= 4).length}</h3>
              <p>Complete Questions</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="stat-card">
              <button className="btn btn-primary" onClick={exportQuizData}>
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="questions-section">
        <h3>Existing Questions</h3>
        
        {quizData.map((question, index) => (
          <div key={question.id} className="question-item">
            <h6>Question {index + 1}</h6>
            
            <div className="mb-3">
              <label className="form-label">Question Text</label>
              <input
                type="text"
                className="form-control"
                value={question.question}
                onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                placeholder="Enter question text"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Choices (comma-separated)</label>
              <input
                type="text"
                className="form-control"
                value={question.choices.join(', ')}
                onChange={(e) => updateQuestion(index, 'choices', e.target.value)}
                placeholder="Choice 1, Choice 2, Choice 3, Choice 4"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Correct Answer</label>
              <input
                type="text"
                className="form-control"
                value={question.correctAnswer}
                onChange={(e) => updateQuestion(index, 'correctAnswer', e.target.value)}
                placeholder="Enter the correct answer"
              />
            </div>

            <div className="question-actions">
              <button 
                className="btn btn-sm btn-outline-info me-2"
                onClick={() => previewQuestion(index)}
              >
                👁️ Preview
              </button>
              <button 
                className="btn btn-sm btn-outline-danger"
                onClick={() => deleteQuestion(index)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="add-question-section">
        <h3>Add New Question</h3>
        
        <div className="mb-3">
          <label className="form-label">Question Text</label>
          <input
            type="text"
            className="form-control"
            value={newQuestion.question}
            onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
            placeholder="Enter new question text"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Choices (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            value={newQuestion.choices}
            onChange={(e) => setNewQuestion({...newQuestion, choices: e.target.value})}
            placeholder="Choice 1, Choice 2, Choice 3, Choice 4"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Correct Answer</label>
          <input
            type="text"
            className="form-control"
            value={newQuestion.correctAnswer}
            onChange={(e) => setNewQuestion({...newQuestion, correctAnswer: e.target.value})}
            placeholder="Enter the correct answer"
          />
        </div>

        <button className="btn btn-success me-2" onClick={addQuestion}>
          Add Question
        </button>
      </div>

      <div className="save-section text-center mt-4">
        <button className="btn btn-primary btn-lg" onClick={saveAllChanges}>
          Save All Changes
        </button>
      </div>

      <div className="architecture-info mt-4">
        <h5>Admin Module Architecture:</h5>
        <ul>
          <li><strong>React Components:</strong> Functional components with hooks</li>
          <li><strong>Dynamic Forms:</strong> Controlled components with validation</li>
          <li><strong>State Management:</strong> Complex state updates</li>
          <li><strong>CRUD Operations:</strong> Full data manipulation</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminComponent;
