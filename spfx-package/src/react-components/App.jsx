import React, { useState } from 'react';
import ContactForm from './ContactForm';
import QuizComponent from './QuizComponent';
import FilterComponent from './FilterComponent';
import AdminComponent from './AdminComponent';
import './App.css';

/**
 * Main App Component for SPFx WebPart
 * Demonstrates navigation and component composition
 */
const App = () => {
  const [activeComponent, setActiveComponent] = useState('home');

  const components = {
    home: () => <HomeComponent setActiveComponent={setActiveComponent} />,
    contact: () => <ContactForm />,
    quiz: () => <QuizComponent />,
    filter: () => <FilterComponent />,
    admin: () => <AdminComponent />
  };

  const ActiveComponent = components[activeComponent];

  return (
    <div className="advanced-js-app">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <a 
            className="navbar-brand" 
            href="#"
            onClick={() => setActiveComponent('home')}
          >
            Advanced JavaScript Features
          </a>
          
          <div className="navbar-nav">
            <button 
              className={`nav-link btn ${activeComponent === 'home' ? 'active' : ''}`}
              onClick={() => setActiveComponent('home')}
            >
              Home
            </button>
            <button 
              className={`nav-link btn ${activeComponent === 'contact' ? 'active' : ''}`}
              onClick={() => setActiveComponent('contact')}
            >
              Contact Form
            </button>
            <button 
              className={`nav-link btn ${activeComponent === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveComponent('quiz')}
            >
              Quiz
            </button>
            <button 
              className={`nav-link btn ${activeComponent === 'filter' ? 'active' : ''}`}
              onClick={() => setActiveComponent('filter')}
            >
              Filter Demo
            </button>
            <button 
              className={`nav-link btn ${activeComponent === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveComponent('admin')}
            >
              Admin Panel
            </button>
          </div>
        </div>
      </nav>

      <div className="container-fluid py-4">
        <ActiveComponent />
      </div>
    </div>
  );
};

/**
 * Home Component - Landing page with feature overview
 */
const HomeComponent = ({ setActiveComponent }) => {
  return (
    <div className="home-container">
      <div className="hero-section text-center mb-5">
        <h1 className="display-4">Advanced JavaScript Assignment</h1>
        <p className="lead">
          Demonstrating WeakMap, Type Guards, Proxy with Reflect, Set, Symbol, 
          Generators, Iterators, and RxJS in React components
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="feature-card card h-100">
            <div className="card-body">
              <h5 className="card-title">📧 Contact Form</h5>
              <p className="card-text">
                Advanced form validation with modern JavaScript features.
              </p>
              <div className="features-list">
                <strong>Features:</strong>
                <ul>
                  <li>WeakMap for private metadata</li>
                  <li>Type Guards for safety</li>
                  <li>Proxy with Reflect for logging</li>
                  <li>React hooks for state management</li>
                </ul>
              </div>
              <button 
                className="btn btn-primary"
                onClick={() => setActiveComponent('contact')}
              >
                Try Contact Form
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="feature-card card h-100">
            <div className="card-body">
              <h5 className="card-title">🎯 Interactive Quiz</h5>
              <p className="card-text">
                Dynamic quiz system with advanced JavaScript patterns.
              </p>
              <div className="features-list">
                <strong>Features:</strong>
                <ul>
                  <li>Generators for iteration</li>
                  <li>Custom iterators</li>
                  <li>Dynamic component rendering</li>
                  <li>State management with hooks</li>
                </ul>
              </div>
              <button 
                className="btn btn-success"
                onClick={() => setActiveComponent('quiz')}
              >
                Take Quiz
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="feature-card card h-100">
            <div className="card-body">
              <h5 className="card-title">🔍 Filter Demo</h5>
              <p className="card-text">
                Reactive search with RxJS observables and Set collections.
              </p>
              <div className="features-list">
                <strong>Features:</strong>
                <ul>
                  <li>RxJS reactive programming</li>
                  <li>Set for unique collections</li>
                  <li>Symbol for unique identifiers</li>
                  <li>Debounced search</li>
                </ul>
              </div>
              <button 
                className="btn btn-info"
                onClick={() => setActiveComponent('filter')}
              >
                Try Filter
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="feature-card card h-100">
            <div className="card-body">
              <h5 className="card-title">⚙️ Admin Panel</h5>
              <p className="card-text">
                Quiz administration with CRUD operations and dynamic forms.
              </p>
              <div className="features-list">
                <strong>Features:</strong>
                <ul>
                  <li>Dynamic form generation</li>
                  <li>Real-time data binding</li>
                  <li>CRUD operations</li>
                  <li>State management</li>
                </ul>
              </div>
              <button 
                className="btn btn-warning"
                onClick={() => setActiveComponent('admin')}
              >
                Admin Panel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="technical-info mt-5">
        <div className="row">
          <div className="col-md-6">
            <h3>🛠️ Technical Stack</h3>
            <ul>
              <li><strong>Frontend:</strong> React 18, TypeScript (optional)</li>
              <li><strong>Styling:</strong> Bootstrap 5.1.3</li>
              <li><strong>Reactive Programming:</strong> RxJS 7.x</li>
              <li><strong>Package:</strong> SPFx WebPart</li>
              <li><strong>Testing:</strong> Jest, React Testing Library</li>
            </ul>
          </div>
          <div className="col-md-6">
            <h3>📋 JavaScript Features</h3>
            <ul>
              <li><strong>WeakMap:</strong> Private metadata storage</li>
              <li><strong>Type Guards:</strong> Runtime type checking</li>
              <li><strong>Proxy & Reflect:</strong> Operation interception</li>
              <li><strong>Set:</strong> Unique value collections</li>
              <li><strong>Symbol:</strong> Unique identifiers</li>
              <li><strong>Generators:</strong> Function state management</li>
              <li><strong>Iterators:</strong> Custom iteration patterns</li>
              <li><strong>RxJS:</strong> Reactive data streams</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="spfx-info mt-4 alert alert-success">
        <h5>🚀 SPFx Ready!</h5>
        <p>
          This React application is designed to be packaged as a SharePoint Framework (SPFx) WebPart.
          All components are self-contained and can be deployed to SharePoint Online or on-premises.
        </p>
      </div>
    </div>
  );
};

export default App;
