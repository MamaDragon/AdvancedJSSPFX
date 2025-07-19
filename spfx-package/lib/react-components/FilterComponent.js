var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import React, { useState, useEffect, useMemo } from 'react';
import { fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import './FilterComponent.css';
var FilterComponent = function () {
    // JavaScript concepts data
    var javascriptConcepts = [
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
    // State for filtered data
    var _a = __read(useState([]), 2), filteredData = _a[0], setFilteredData = _a[1];
    // State for search term
    var _b = __read(useState(''), 2), searchTerm = _b[0], setSearchTerm = _b[1];
    // State for search info message
    var _c = __read(useState(''), 2), searchInfo = _c[0], setSearchInfo = _c[1];
    var categories = useMemo(function () {
        var categorySet = new Set();
        javascriptConcepts.forEach(function (concept) { return categorySet.add(concept.category); });
        return Array.from(categorySet);
    }, [javascriptConcepts]);
    // Using Symbol for unique identifiers
    var searchSymbol = useMemo(function () { return Symbol('search'); }, []);
    // Initialize filtered data
    useEffect(function () {
        setFilteredData(javascriptConcepts);
        updateSearchInfo('', javascriptConcepts.length);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // RxJS observable setup
    useEffect(function () {
        var searchInput = document.getElementById('search-input');
        if (!searchInput)
            return;
        var subscription = fromEvent(searchInput, 'input')
            .pipe(map(function (e) { return e.target.value.toLowerCase(); }), debounceTime(300), distinctUntilChanged())
            .subscribe(function (value) {
            var filtered = filterData(value);
            setFilteredData(filtered);
            updateSearchInfo(value, filtered.length);
        });
        return function () { return subscription.unsubscribe(); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var filterData = function (searchValue) {
        if (!searchValue)
            return javascriptConcepts;
        return javascriptConcepts.filter(function (item) {
            var searchableText = "".concat(item.concept, " ").concat(item.description, " ").concat(item.category, " ").concat(item.level).toLowerCase();
            return searchableText.includes(searchValue);
        });
    };
    var updateSearchInfo = function (term, resultCount) {
        if (term) {
            var message = "Showing ".concat(resultCount, " results for \"").concat(term, "\"").concat(resultCount === 0 ? ' - Try different keywords!' : '');
            setSearchInfo(message);
        }
        else {
            setSearchInfo("Showing all ".concat(javascriptConcepts.length, " JavaScript concepts"));
        }
    };
    var handleChange = function (e) {
        var value = e.target.value;
        setSearchTerm(value);
        // RxJS will handle the actual filtering
    };
    var getLevelBadgeClass = function (level) {
        switch (level) {
            case 'Basic': return 'bg-success';
            case 'Intermediate': return 'bg-warning';
            case 'Advanced': return 'bg-danger';
            default: return 'bg-secondary';
        }
    };
    var getCategoryBadgeClass = function (category) {
        // Using hash of category name for consistent colors
        var hash = category.split('').reduce(function (a, b) {
            a = ((a << 5) - a) + b.charCodeAt(0);
            return a & a;
        }, 0);
        var colors = ['primary', 'secondary', 'info', 'dark'];
        return "bg-".concat(colors[Math.abs(hash) % colors.length]);
    };
    return (React.createElement("div", { className: "filter-container" },
        React.createElement("div", { className: "filter-header" },
            React.createElement("h1", null, "\uD83D\uDD0D Advanced Filter System"),
            React.createElement("p", null, "Demonstrating RxJS observables, Set collections, and Symbol identifiers")),
        React.createElement("div", { className: "features-showcase alert alert-info" },
            React.createElement("h5", null, "\uD83C\uDFAF JavaScript Features Demonstrated:"),
            React.createElement("ul", { className: "mb-0" },
                React.createElement("li", null,
                    React.createElement("strong", null, "RxJS Observables:"),
                    " Reactive search with debouncing"),
                React.createElement("li", null,
                    React.createElement("strong", null, "Set Collection:"),
                    " Unique category management"),
                React.createElement("li", null,
                    React.createElement("strong", null, "Symbol:"),
                    " Unique identifier creation"),
                React.createElement("li", null,
                    React.createElement("strong", null, "Functional Programming:"),
                    " Array methods and immutability"))),
        React.createElement("div", { className: "search-section mb-4" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-md-8" },
                    React.createElement("label", { htmlFor: "search-input", className: "form-label" }, "Search JavaScript Concepts"),
                    React.createElement("input", { type: "text", className: "form-control search-input", id: "search-input", value: searchTerm, onChange: handleChange, placeholder: "Type to search concepts, descriptions, categories..." })),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("label", { className: "form-label" },
                        "Categories (",
                        categories.length,
                        ")"),
                    React.createElement("div", { className: "category-tags" }, categories.map(function (category) { return (React.createElement("span", { key: category, className: "badge ".concat(getCategoryBadgeClass(category), " me-1 mb-1") }, category)); })))),
            React.createElement("div", { className: "search-info mt-2 text-muted small" },
                React.createElement("i", { className: "bi bi-info-circle" }),
                " ",
                searchInfo)),
        React.createElement("div", { className: "table-container" },
            React.createElement("table", { className: "table table-striped table-hover" },
                React.createElement("thead", { className: "table-dark" },
                    React.createElement("tr", null,
                        React.createElement("th", null, "Concept"),
                        React.createElement("th", null, "Description"),
                        React.createElement("th", null, "Category"),
                        React.createElement("th", null, "Level"))),
                React.createElement("tbody", null, filteredData.map(function (item, index) { return (React.createElement("tr", { key: "".concat(String(searchSymbol), "-").concat(index) },
                    React.createElement("td", null,
                        React.createElement("strong", null, item.concept)),
                    React.createElement("td", null, item.description),
                    React.createElement("td", null,
                        React.createElement("span", { className: "badge ".concat(getCategoryBadgeClass(item.category)) }, item.category)),
                    React.createElement("td", null,
                        React.createElement("span", { className: "badge ".concat(getLevelBadgeClass(item.level)) }, item.level)))); }))),
            filteredData.length === 0 && (React.createElement("div", { className: "text-center p-4" },
                React.createElement("h5", null, "No results found"),
                React.createElement("p", { className: "text-muted" }, "Try adjusting your search terms")))),
        React.createElement("div", { className: "implementation-details mt-4" },
            React.createElement("h5", null, "RxJS Implementation Details:"),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-md-6" },
                    React.createElement("h6", null, "Observable Chain:"),
                    React.createElement("code", { className: "d-block p-2 bg-light border rounded" },
                        "fromEvent(input, 'input')",
                        React.createElement("br", null),
                        "\u00A0\u00A0.pipe(",
                        React.createElement("br", null),
                        "\u00A0\u00A0\u00A0\u00A0map(e => e.target.value.toLowerCase()),",
                        React.createElement("br", null),
                        "\u00A0\u00A0\u00A0\u00A0debounceTime(300),",
                        React.createElement("br", null),
                        "\u00A0\u00A0\u00A0\u00A0distinctUntilChanged()",
                        React.createElement("br", null),
                        "\u00A0\u00A0)",
                        React.createElement("br", null),
                        "\u00A0\u00A0.subscribe(filterData)")),
                React.createElement("div", { className: "col-md-6" },
                    React.createElement("h6", null, "Benefits:"),
                    React.createElement("ul", null,
                        React.createElement("li", null, "Debounced search (300ms delay)"),
                        React.createElement("li", null, "Case-insensitive filtering"),
                        React.createElement("li", null, "Prevents duplicate API calls"),
                        React.createElement("li", null, "Reactive and declarative")))))));
};
export default FilterComponent;
//# sourceMappingURL=FilterComponent.js.map