import * as React from 'react';
import { IAdvancedJsFeaturesProps } from './IAdvancedJsFeaturesProps';
import ContactForm from '../../../react-components/ContactForm';
import QuizComponent from '../../../react-components/QuizComponent';
import FilterComponent from '../../../react-components/FilterComponent';
import AdminComponent from '../../../react-components/AdminComponent';
import './AdvancedJsFeatures.module.scss';

export interface IAdvancedJsFeaturesState {
  activeComponent: string;
}

export default class AdvancedJsFeatures extends React.Component<IAdvancedJsFeaturesProps, IAdvancedJsFeaturesState> {
  
  constructor(props: IAdvancedJsFeaturesProps) {
    super(props);
    this.state = {
      activeComponent: 'home'
    };
  }

  private setActiveComponent = (component: string): void => {
    this.setState({ activeComponent: component });
  }

  private renderHomeComponent = (): JSX.Element => {
    return (
      <div className="home-container">
        <div className="hero-section">
          <h1>Advanced JavaScript Features</h1>
          <p>Demonstrating modern JavaScript concepts in SharePoint Framework</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3>📧 Contact Form</h3>
            <p>WeakMap, Type Guards, and Proxy with Reflect</p>
            <button 
              className="btn btn-primary"
              onClick={() => this.setActiveComponent('contact')}
            >
              Try Contact Form
            </button>
          </div>

          <div className="feature-card">
            <h3>🎯 Interactive Quiz</h3>
            <p>Generators, Iterators, and Dynamic Components</p>
            <button 
              className="btn btn-success"
              onClick={() => this.setActiveComponent('quiz')}
            >
              Take Quiz
            </button>
          </div>

          <div className="feature-card">
            <h3>🔍 Filter Demo</h3>
            <p>RxJS Observables, Set, and Symbol</p>
            <button 
              className="btn btn-info"
              onClick={() => this.setActiveComponent('filter')}
            >
              Try Filter
            </button>
          </div>

          <div className="feature-card">
            <h3>⚙️ Admin Panel</h3>
            <p>CRUD Operations and Dynamic Forms</p>
            <button 
              className="btn btn-warning"
              onClick={() => this.setActiveComponent('admin')}
            >
              Admin Panel
            </button>
          </div>
        </div>

        <div className="spfx-info">
          <h4>🚀 SharePoint Framework Integration</h4>
          <p>
            This web part demonstrates advanced JavaScript features within the SharePoint Framework.
            All components are optimized for SharePoint Online and on-premises environments.
          </p>
          <ul>
            <li>Modern React components with TypeScript</li>
            <li>SharePoint context integration</li>
            <li>Office UI Fabric styling</li>
            <li>Responsive design for all devices</li>
          </ul>
        </div>
      </div>
    );
  }

  private renderActiveComponent = (): JSX.Element => {
    const { activeComponent } = this.state;
    
    switch (activeComponent) {
      case 'contact':
        return <ContactForm />;
      case 'quiz':
        return <QuizComponent />;
      case 'filter':
        return <FilterComponent />;
      case 'admin':
        return <AdminComponent />;
      default:
        return this.renderHomeComponent();
    }
  }

  public render(): React.ReactElement<IAdvancedJsFeaturesProps> {
    const { activeComponent } = this.state;
    
    return (
      <div className="advanced-js-features">
        <div className="navigation">
          <button 
            className={`nav-btn ${activeComponent === 'home' ? 'active' : ''}`}
            onClick={() => this.setActiveComponent('home')}
          >
            Home
          </button>
          <button 
            className={`nav-btn ${activeComponent === 'contact' ? 'active' : ''}`}
            onClick={() => this.setActiveComponent('contact')}
          >
            Contact
          </button>
          <button 
            className={`nav-btn ${activeComponent === 'quiz' ? 'active' : ''}`}
            onClick={() => this.setActiveComponent('quiz')}
          >
            Quiz
          </button>
          <button 
            className={`nav-btn ${activeComponent === 'filter' ? 'active' : ''}`}
            onClick={() => this.setActiveComponent('filter')}
          >
            Filter
          </button>
          <button 
            className={`nav-btn ${activeComponent === 'admin' ? 'active' : ''}`}
            onClick={() => this.setActiveComponent('admin')}
          >
            Admin
          </button>
        </div>

        <div className="content">
          {this.renderActiveComponent()}
        </div>
      </div>
    );
  }
}
