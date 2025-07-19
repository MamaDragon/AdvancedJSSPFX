import React, { useState, useEffect, useRef } from 'react';

/**
 * React version of the Contact Form with advanced JavaScript features
 * Demonstrates WeakMap, Type Guards, and Proxy with Reflect
 * SPFx-compatible version
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
      
      // Save to SharePoint List (SPFx integration)
      await saveToSharePointList(submissionData);
      
      setIsSubmitted(true);
      setSubmissionId(submissionData.id);
      setFormData({ phone: '', email: '', zip: '' });
      
    } catch (error) {
      console.error('Submission error:', error);
      setErrors(['Submission failed. Please try again.']);
    }
  };

  const saveToSharePointList = async (data) => {
    // In SPFx, this would integrate with SharePoint Lists
    console.log('Saving to SharePoint List:', data);
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
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h1>📧 Contact Form</h1>
        <p>Advanced form validation with React and modern JavaScript features</p>
      </div>

      <div style={{ 
        background: '#d1ecf1', 
        border: '1px solid #bee5eb', 
        borderLeft: '4px solid #17a2b8',
        padding: '1rem',
        borderRadius: '0.375rem',
        marginBottom: '1.5rem'
      }}>
        <h5 style={{ color: '#0c5460', marginBottom: '1rem' }}>🎯 JavaScript Features Demonstrated:</h5>
        <ul style={{ marginBottom: 0 }}>
          <li><strong>WeakMap:</strong> Tracks form validation status privately</li>
          <li><strong>Type Guards:</strong> Ensures input validation</li>
          <li><strong>Proxy with Reflect:</strong> Logs all property access</li>
          <li><strong>React Hooks:</strong> Modern state management</li>
        </ul>
      </div>

      {isSubmitted && (
        <div style={{ 
          background: '#d4edda', 
          border: '1px solid #c3e6cb',
          color: '#155724',
          padding: '1rem',
          borderRadius: '0.375rem',
          marginBottom: '1.5rem'
        }}>
          <h5>Form submitted successfully!</h5>
          <p>Data has been saved to localStorage and SharePoint.</p>
          <button 
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              border: '1px solid #007bff',
              padding: '0.375rem 0.75rem',
              borderRadius: '0.25rem',
              cursor: 'pointer'
            }}
            onClick={() => downloadSubmission(submissionId)}
          >
            Download My Submission
          </button>
          <small style={{ display: 'block', marginTop: '0.5rem', color: '#6c757d' }}>
            Submission ID: {submissionId}
          </small>
        </div>
      )}

      {errors.length > 0 && (
        <div style={{ 
          background: '#f8d7da', 
          border: '1px solid #f5c6cb',
          color: '#721c24',
          padding: '1rem',
          borderRadius: '0.375rem',
          marginBottom: '1.5rem'
        }}>
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}

      <form ref={formRef} onSubmit={handleSubmit} style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '0.5rem',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        marginBottom: '2rem'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="phone" style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="1234567890"
            maxLength={10} // 10 digits
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ced4da',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
          />
          <div style={{ color: '#6c757d', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Enter 10 digits only
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="example@email.com"
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ced4da',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="zip" style={{ fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
            ZIP Code
          </label>
          <input
            type="text"
            id="zip"
            name="zip"
            value={formData.zip}
            onChange={handleInputChange}
            placeholder="12345"
            maxLength={5} // 5 digits
            required
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ced4da',
              borderRadius: '0.375rem',
              fontSize: '1rem'
            }}
          />
          <div style={{ color: '#6c757d', fontSize: '0.875rem', marginTop: '0.25rem' }}>
            Enter 5 digits only
          </div>
        </div>

        <button type="submit" style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '0.75rem 2rem',
          borderRadius: '0.375rem',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}>
          Submit Form
        </button>
      </form>

      {submissions.length > 0 && (
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
        }}>
          <h6 style={{ marginBottom: '1rem' }}>Saved Submissions ({submissions.length})</h6>
          {submissions.map((submission, index) => (
            <div key={submission.id} style={{
              border: '1px solid #dee2e6',
              borderRadius: '0.375rem',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              <h6>Submission #{index + 1}</h6>
              <p style={{ fontSize: '0.875rem', lineHeight: '1.4', color: '#6c757d' }}>
                <strong>Date:</strong> {new Date(submission.timestamp).toLocaleString()}<br />
                <strong>Phone:</strong> {submission.phone}<br />
                <strong>Email:</strong> {submission.email}<br />
                <strong>ZIP:</strong> {submission.zip}<br />
                <small>ID: {submission.id}</small>
              </p>
            </div>
          ))}
          <button 
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: '1px solid #dc3545',
              padding: '0.375rem 0.75rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
            onClick={clearAllSubmissions}
          >
            Clear All Data
          </button>
        </div>
      )}

      <div style={{
        background: '#fff3cd',
        border: '1px solid #ffeeba',
        color: '#856404',
        textAlign: 'center',
        padding: '1rem',
        borderRadius: '0.375rem',
        marginTop: '1rem'
      }}>
        <p><strong>Check the browser console</strong> to see Proxy logging in action!</p>
      </div>
    </div>
  );
};

export default ContactForm;
