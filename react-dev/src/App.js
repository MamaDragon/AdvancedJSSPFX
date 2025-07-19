import React, { useState } from 'react';
import ContactForm from './components/ContactForm';
import QuizComponent from './components/QuizComponent';
import FilterComponent from './components/FilterComponent';
import AdminComponent from './components/AdminComponent';
import './App.css';

/**
 * Main App component with tabbed navigation for all advanced JS features
 */
function App() {
  const [activeTab, setActiveTab] = useState('contact');

  const tabs = [
    { id: 'contact', label: '📧 Contact Form', component: ContactForm },
    { id: 'quiz', label: '🧠 Quiz System', component: QuizComponent },
    { id: 'filter', label: '🔍 Filter Demo', component: FilterComponent },
    { id: 'admin', label: '⚙️ Admin Panel', component: AdminComponent }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ContactForm;

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Advanced JavaScript Features in React</h1>
        <p>Modern React implementation showcasing ES6+ and advanced JavaScript concepts</p>
      </header>

      <div className="container">
        <div className="features-overview">
          <h2>🎯 JavaScript Features Demonstrated</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h4>WeakMap & Type Guards</h4>
              <p>Private data storage and runtime type checking</p>
            </div>
            <div className="feature-card">
              <h4>Proxy & Reflect</h4>
              <p>Object property access interception and logging</p>
            </div>
            <div className="feature-card">
              <h4>Set & Symbol</h4>
              <p>Unique collections and private object properties</p>
            </div>
            <div className="feature-card">
              <h4>Generators & Iterators</h4>
              <p>Custom iteration patterns and lazy evaluation</p>
            </div>
            <div className="feature-card">
              <h4>RxJS & Reactive Programming</h4>
              <p>Observable streams and reactive data flow</p>
            </div>
            <div className="feature-card">
              <h4>Map & Advanced Collections</h4>
              <p>Key-value storage with object keys</p>
            </div>
          </div>
        </div>

        <nav className="tab-navigation">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="tab-content">
          <ActiveComponent />
        </div>

        <footer className="app-footer">
          <p>
            <strong>Node.js Compatible:</strong> This React development environment works with Node.js v24.4.0<br/>
            <strong>SPFx Ready:</strong> Components are designed for SharePoint Framework deployment
          </p>
          <p className="text-muted">
            Check the browser console to see advanced JavaScript features in action!
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
