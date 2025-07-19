import React, { useState, useEffect, useRef } from 'react';

/**
 * React version of the Contact Form with advanced JavaScript features
 * Demonstrates WeakMap, Type Guards, and Proxy with Reflect
 */
const ContactForm = () => {
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    zip: ''
  });
  const [errors, setErrors] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  
  // WeakMap for form metadata (React equivalent)
  const formMetaRef = useRef(new WeakMap());
  const formRef = useRef(null);
  
  // Proxy wrapper for logging (React-compatible)
  const createFormProxy = (obj) => {
    return new Proxy(obj, {
      get(target, prop) {
        const value = Reflect.get(target, prop);
        console.log(`Accessed ${String(prop)}:`, value);
        return value;
      },
      set(target, prop, value) {
        console.log(`Set ${String(prop)} = ${value}`);
        return Reflect.set(target, prop, value);
      }
    });
  };

  // Type guards
  const isValidEmail = (email) => /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email);
  const isValidPhone = (phone) => /^\d{10}$/.test(phone);
  const isValidZip = (zip) => /^\d{5}$/.test(zip);

  // Load saved submissions on component mount
  useEffect(() => {
    loadSavedSubmissions();
  }, []);

  const loadSavedSubmissions = () => {
    try {
      const saved = localStorage.getItem('contactSubmissions');
      if (saved) {
        setSubmissions(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading submissions:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Use proxy for logging
    const proxiedFormData = createFormProxy(formData);
    proxiedFormData[name] = value;
    
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  const validateForm = () => {
    const newErrors = [];
    
    if (!isValidPhone(formData.phone)) {
      newErrors.push('Phone must be 10 digits.');
    }
    if (!isValidEmail(formData.email)) {
      newErrors.push('Invalid email format.');
    }
    if (!isValidZip(formData.zip)) {
      newErrors.push('Zip must be 5 digits.');
    }
    
    // Store validation result in WeakMap
    if (formRef.current) {
      formMetaRef.current.set(formRef.current, { validated: newErrors.length === 0 });
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const submissionData = {
        timestamp: new Date().toISOString(),
        phone: formData.phone,
        email: formData.email,
        zip: formData.zip,
        id: Date.now()
      };

      // Save to localStorage
      const savedSubmissions = [...submissions, submissionData];
      localStorage.setItem('contactSubmissions', JSON.stringify(savedSubmissions));
      setSubmissions(savedSubmissions);
      
      // Save to contacts.json (simulated)
      await saveToContactsFile(submissionData);
      
      setIsSubmitted(true);
      setSubmissionId(submissionData.id);
      setFormData({ phone: '', email: '', zip: '' });
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors(['Submission failed. Please try again.']);
    }
  };

  const saveToContactsFile = async (data) => {
    // In SPFx, this would integrate with SharePoint Lists or other storage
    console.log('Saving to contacts file:', data);
    return Promise.resolve();
  };

  const downloadSubmission = (id) => {
    const submission = submissions.find(s => s.id === id);
    if (submission) {
      const dataStr = JSON.stringify(submission, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `submission-${id}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  const clearAllSubmissions = () => {
    localStorage.removeItem('contactSubmissions');
    setSubmissions([]);
  };

  return (
    <div className="contact-form-container">
      <div className="contact-header">
        <h1>📧 Contact Form</h1>
        <p>Advanced form validation with React and modern JavaScript features</p>
      </div>

      <div className="features-showcase alert alert-info">
        <h5>🎯 JavaScript Features Demonstrated:</h5>
        <ul className="mb-0">
          <li><strong>WeakMap:</strong> Tracks form validation status privately</li>
          <li><strong>Type Guards:</strong> Ensures input validation</li>
          <li><strong>Proxy with Reflect:</strong> Logs all property access</li>
          <li><strong>React Hooks:</strong> Modern state management</li>
        </ul>
      </div>

      {isSubmitted && (
        <div className="alert alert-success">
          <h5>Form submitted successfully!</h5>
          <p>Data has been saved to localStorage and contacts file.</p>
          <button 
            className="btn btn-outline-primary btn-sm"
            onClick={() => downloadSubmission(submissionId)}
          >
            Download My Submission
          </button>
          <small className="text-muted d-block mt-2">Submission ID: {submissionId}</small>
        </div>
      )}

      {errors.length > 0 && (
        <div className="alert alert-danger">
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="1234567890"
            maxLength="10"
            required
          />
          <div className="form-text">Enter 10 digits only</div>
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="example@email.com"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="zip" className="form-label">ZIP Code</label>
          <input
            type="text"
            className="form-control"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleInputChange}
            placeholder="12345"
            maxLength="5"
            required
          />
          <div className="form-text">Enter 5 digits only</div>
        </div>

        <button type="submit" className="btn btn-primary">Submit Form</button>
      </form>

      {submissions.length > 0 && (
        <div className="submissions-section mt-4">
          <h6>Saved Submissions ({submissions.length})</h6>
          {submissions.map((submission, index) => (
            <div key={submission.id} className="card mb-2">
              <div className="card-body">
                <h6 className="card-title">Submission #{index + 1}</h6>
                <p className="card-text">
                  <strong>Date:</strong> {new Date(submission.timestamp).toLocaleString()}<br />
                  <strong>Phone:</strong> {submission.phone}<br />
                  <strong>Email:</strong> {submission.email}<br />
                  <strong>ZIP:</strong> {submission.zip}<br />
                  <small className="text-muted">ID: {submission.id}</small>
                </p>
              </div>
            </div>
          ))}
          <button 
            className="btn btn-outline-danger btn-sm"
            onClick={clearAllSubmissions}
          >
            Clear All Data
          </button>
        </div>
      )}

      <div className="console-info mt-3 alert alert-warning">
        <p><strong>Check the browser console</strong> to see Proxy logging in action!</p>
      </div>
    </div>
  );
};

export default ContactForm;
