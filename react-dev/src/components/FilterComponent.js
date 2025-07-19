import React, { useState, useEffect, useMemo } from 'react';
import { fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';

/**
 * React version of the Filter Component with RxJS and Set/Symbol features
 * Demonstrates reactive programming and advanced JavaScript data structures
 */
const FilterComponent = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searchInfo, setSearchInfo] = useState('');

  // Using Set for unique categories
  const categories = useMemo(() => {
    const categorySet = new Set();
    javascriptConcepts.forEach(concept => categorySet.add(concept.category));
    return Array.from(categorySet);
  }, []);

  // Using Symbol for unique identifiers
  const searchSymbol = useMemo(() => Symbol('search'), []);

  // JavaScript concepts data
  const javascriptConcepts = [
    { concept: 'Array', description: 'A list-like object for storing multiple values', category: 'Data Structure', level: 'Basic' },
    { concept: 'Object', description: 'A collection of key-value pairs', category: 'Data Structure', level: 'Basic' },
    { concept: 'Function', description: 'A reusable block of code that performs a specific task', category: 'Function', level: 'Basic' },
    { concept: 'Promise', description: 'An object representing eventual completion or failure of an async operation', category: 'Async', level: 'Intermediate' },
    { concept: 'Async/Await', description: 'Syntactic sugar for working with promises in a synchronous manner', category: 'Async', level: 'Intermediate' },
    { concept: 'Modules', description: 'A way to organize and encapsulate code in separate files', category: 'Organization', level: 'Intermediate' },
    { concept: 'Classes', description: 'Template for creating objects with shared properties and methods', category: 'OOP', level: 'Intermediate' },
    { concept: 'Closures', description: 'Functions that have access to variables in their outer scope', category: 'Scope', level: 'Advanced' },
    { concept: 'WeakMap', description: 'A collection of key-value pairs where keys are objects and may be garbage collected', category: 'Data Structure', level: 'Advanced' },
    { concept: 'Proxy', description: 'Allows you to intercept and customize operations performed on objects', category: 'Meta', level: 'Advanced' },
    { concept: 'Generator', description: 'A function that can be paused and resumed, yielding multiple values', category: 'Function', level: 'Advanced' },
    { concept: 'Symbol', description: 'A primitive data type that is unique and immutable', category: 'Data Type', level: 'Advanced' }
  ];

  // Initialize filtered data
  useEffect(() => {
    setFilteredData(javascriptConcepts);
    updateSearchInfo('', javascriptConcepts.length);
  }, []);

  // RxJS observable setup
  useEffect(() => {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    const subscription = fromEvent(searchInput, 'input')
      .pipe(
        map(e => e.target.value.toLowerCase()),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(value => {
        const filtered = filterData(value);
        setFilteredData(filtered);
        updateSearchInfo(value, filtered.length);
      });

    return () => subscription.unsubscribe();
  }, []);

  const filterData = (searchValue) => {
    if (!searchValue) return javascriptConcepts;
    
    return javascriptConcepts.filter(item => {
      const searchableText = `${item.concept} ${item.description} ${item.category} ${item.level}`.toLowerCase();
      return searchableText.includes(searchValue);
    });
  };

  const updateSearchInfo = (term, resultCount) => {
    if (term) {
      const message = `Showing ${resultCount} results for "${term}"${resultCount === 0 ? ' - Try different keywords!' : ''}`;
      setSearchInfo(message);
    } else {
      setSearchInfo(`Showing all ${javascriptConcepts.length} JavaScript concepts`);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // RxJS will handle the actual filtering
  };

  const getLevelBadgeClass = (level) => {
    switch (level) {
      case 'Basic': return 'bg-success';
      case 'Intermediate': return 'bg-warning';
      case 'Advanced': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  const getCategoryBadgeClass = (category) => {
    // Using hash of category name for consistent colors
    const hash = category.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    const colors = ['primary', 'secondary', 'info', 'dark'];
    return `bg-${colors[Math.abs(hash) % colors.length]}`;
  };

  return (
    <div className="filter-container">
      <div className="filter-header">
        <h1>🔍 Advanced Filter System</h1>
        <p>Demonstrating RxJS observables, Set collections, and Symbol identifiers</p>
      </div>

      <div className="features-showcase alert alert-info">
        <h5>🎯 JavaScript Features Demonstrated:</h5>
        <ul className="mb-0">
          <li><strong>RxJS Observables:</strong> Reactive search with debouncing</li>
          <li><strong>Set Collection:</strong> Unique category management</li>
          <li><strong>Symbol:</strong> Unique identifier creation</li>
          <li><strong>Functional Programming:</strong> Array methods and immutability</li>
        </ul>
      </div>

      <div className="search-section mb-4">
        <div className="row">
          <div className="col-md-8">
            <label htmlFor="search-input" className="form-label">
              Search JavaScript Concepts
            </label>
            <input
              type="text"
              className="form-control search-input"
              id="search-input"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Type to search concepts, descriptions, categories..."
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Categories ({categories.length})</label>
            <div className="category-tags">
              {categories.map(category => (
                <span
                  key={category}
                  className={`badge ${getCategoryBadgeClass(category)} me-1 mb-1`}
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="search-info mt-2 text-muted small">
          <i className="bi bi-info-circle"></i> {searchInfo}
        </div>
      </div>

      <div className="table-container">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Concept</th>
              <th>Description</th>
              <th>Category</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={`${searchSymbol.toString()}-${index}`}>
                <td><strong>{item.concept}</strong></td>
                <td>{item.description}</td>
                <td>
                  <span className={`badge ${getCategoryBadgeClass(item.category)}`}>
                    {item.category}
                  </span>
                </td>
                <td>
                  <span className={`badge ${getLevelBadgeClass(item.level)}`}>
                    {item.level}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredData.length === 0 && (
          <div className="text-center p-4">
            <h5>No results found</h5>
            <p className="text-muted">Try adjusting your search terms</p>
          </div>
        )}
      </div>

      <div className="implementation-details mt-4">
        <h5>RxJS Implementation Details:</h5>
        <div className="row">
          <div className="col-md-6">
            <h6>Observable Chain:</h6>
            <code className="d-block p-2 bg-light border rounded">
              fromEvent(input, 'input')<br />
              &nbsp;&nbsp;.pipe(<br />
              &nbsp;&nbsp;&nbsp;&nbsp;map(e =&gt; e.target.value.toLowerCase()),<br />
              &nbsp;&nbsp;&nbsp;&nbsp;debounceTime(300),<br />
              &nbsp;&nbsp;&nbsp;&nbsp;distinctUntilChanged()<br />
              &nbsp;&nbsp;)<br />
              &nbsp;&nbsp;.subscribe(filterData)
            </code>
          </div>
          <div className="col-md-6">
            <h6>Benefits:</h6>
            <ul>
              <li>Debounced search (300ms delay)</li>
              <li>Case-insensitive filtering</li>
              <li>Prevents duplicate API calls</li>
              <li>Reactive and declarative</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
