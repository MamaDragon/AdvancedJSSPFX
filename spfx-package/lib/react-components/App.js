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
var App = function () {
    var _a = __read(useState('home'), 2), activeComponent = _a[0], setActiveComponent = _a[1];
    var components = {
        home: function () { return React.createElement(HomeComponent, { setActiveComponent: setActiveComponent }); },
        contact: function () { return React.createElement(ContactForm, null); },
        quiz: function () { return React.createElement(QuizComponent, null); },
        filter: function () { return React.createElement(FilterComponent, null); },
        admin: function () { return React.createElement(AdminComponent, null); }
    };
    var ActiveComponent = components[activeComponent];
    return (React.createElement("div", { className: "advanced-js-app" },
        React.createElement("nav", { className: "navbar navbar-expand-lg navbar-dark bg-dark" },
            React.createElement("div", { className: "container" },
                React.createElement("a", { className: "navbar-brand", href: "#", onClick: function () { return setActiveComponent('home'); } }, "Advanced JavaScript Features"),
                React.createElement("div", { className: "navbar-nav" },
                    React.createElement("button", { className: "nav-link btn ".concat(activeComponent === 'home' ? 'active' : ''), onClick: function () { return setActiveComponent('home'); } }, "Home"),
                    React.createElement("button", { className: "nav-link btn ".concat(activeComponent === 'contact' ? 'active' : ''), onClick: function () { return setActiveComponent('contact'); } }, "Contact Form"),
                    React.createElement("button", { className: "nav-link btn ".concat(activeComponent === 'quiz' ? 'active' : ''), onClick: function () { return setActiveComponent('quiz'); } }, "Quiz"),
                    React.createElement("button", { className: "nav-link btn ".concat(activeComponent === 'filter' ? 'active' : ''), onClick: function () { return setActiveComponent('filter'); } }, "Filter Demo"),
                    React.createElement("button", { className: "nav-link btn ".concat(activeComponent === 'admin' ? 'active' : ''), onClick: function () { return setActiveComponent('admin'); } }, "Admin Panel")))),
        React.createElement("div", { className: "container-fluid py-4" },
            React.createElement(ActiveComponent, null))));
};
/**
 * Home Component - Landing page with feature overview
 */
var HomeComponent = function (_a) {
    var setActiveComponent = _a.setActiveComponent;
    return (React.createElement("div", { className: "home-container" },
        React.createElement("div", { className: "hero-section text-center mb-5" },
            React.createElement("h1", { className: "display-4" }, "Advanced JavaScript Assignment"),
            React.createElement("p", { className: "lead" }, "Demonstrating WeakMap, Type Guards, Proxy with Reflect, Set, Symbol, Generators, Iterators, and RxJS in React components")),
        React.createElement("div", { className: "row g-4" },
            React.createElement("div", { className: "col-md-6" },
                React.createElement("div", { className: "feature-card card h-100" },
                    React.createElement("div", { className: "card-body" },
                        React.createElement("h5", { className: "card-title" }, "\uD83D\uDCE7 Contact Form"),
                        React.createElement("p", { className: "card-text" }, "Advanced form validation with modern JavaScript features."),
                        React.createElement("div", { className: "features-list" },
                            React.createElement("strong", null, "Features:"),
                            React.createElement("ul", null,
                                React.createElement("li", null, "WeakMap for private metadata"),
                                React.createElement("li", null, "Type Guards for safety"),
                                React.createElement("li", null, "Proxy with Reflect for logging"),
                                React.createElement("li", null, "React hooks for state management"))),
                        React.createElement("button", { className: "btn btn-primary", onClick: function () { return setActiveComponent('contact'); } }, "Try Contact Form")))),
            React.createElement("div", { className: "col-md-6" },
                React.createElement("div", { className: "feature-card card h-100" },
                    React.createElement("div", { className: "card-body" },
                        React.createElement("h5", { className: "card-title" }, "\uD83C\uDFAF Interactive Quiz"),
                        React.createElement("p", { className: "card-text" }, "Dynamic quiz system with advanced JavaScript patterns."),
                        React.createElement("div", { className: "features-list" },
                            React.createElement("strong", null, "Features:"),
                            React.createElement("ul", null,
                                React.createElement("li", null, "Generators for iteration"),
                                React.createElement("li", null, "Custom iterators"),
                                React.createElement("li", null, "Dynamic component rendering"),
                                React.createElement("li", null, "State management with hooks"))),
                        React.createElement("button", { className: "btn btn-success", onClick: function () { return setActiveComponent('quiz'); } }, "Take Quiz")))),
            React.createElement("div", { className: "col-md-6" },
                React.createElement("div", { className: "feature-card card h-100" },
                    React.createElement("div", { className: "card-body" },
                        React.createElement("h5", { className: "card-title" }, "\uD83D\uDD0D Filter Demo"),
                        React.createElement("p", { className: "card-text" }, "Reactive search with RxJS observables and Set collections."),
                        React.createElement("div", { className: "features-list" },
                            React.createElement("strong", null, "Features:"),
                            React.createElement("ul", null,
                                React.createElement("li", null, "RxJS reactive programming"),
                                React.createElement("li", null, "Set for unique collections"),
                                React.createElement("li", null, "Symbol for unique identifiers"),
                                React.createElement("li", null, "Debounced search"))),
                        React.createElement("button", { className: "btn btn-info", onClick: function () { return setActiveComponent('filter'); } }, "Try Filter")))),
            React.createElement("div", { className: "col-md-6" },
                React.createElement("div", { className: "feature-card card h-100" },
                    React.createElement("div", { className: "card-body" },
                        React.createElement("h5", { className: "card-title" }, "\u2699\uFE0F Admin Panel"),
                        React.createElement("p", { className: "card-text" }, "Quiz administration with CRUD operations and dynamic forms."),
                        React.createElement("div", { className: "features-list" },
                            React.createElement("strong", null, "Features:"),
                            React.createElement("ul", null,
                                React.createElement("li", null, "Dynamic form generation"),
                                React.createElement("li", null, "Real-time data binding"),
                                React.createElement("li", null, "CRUD operations"),
                                React.createElement("li", null, "State management"))),
                        React.createElement("button", { className: "btn btn-warning", onClick: function () { return setActiveComponent('admin'); } }, "Admin Panel"))))),
        React.createElement("div", { className: "technical-info mt-5" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-md-6" },
                    React.createElement("h3", null, "\uD83D\uDEE0\uFE0F Technical Stack"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("strong", null, "Frontend:"),
                            " React 18, TypeScript (optional)"),
                        React.createElement("li", null,
                            React.createElement("strong", null, "Styling:"),
                            " Bootstrap 5.1.3"),
                        React.createElement("li", null,
                            React.createElement("strong", null, "Reactive Programming:"),
                            " RxJS 7.x"),
                        React.createElement("li", null,
                            React.createElement("strong", null, "Package:"),
                            " SPFx WebPart"),
                        React.createElement("li", null,
                            React.createElement("strong", null, "Testing:"),
                            " Jest, React Testing Library"))),
                React.createElement("div", { className: "col-md-6" },
                    React.createElement("h3", null, "\uD83D\uDCCB JavaScript Features"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("strong", null, "WeakMap:"),
                            " Private metadata storage"),
                        React.createElement("li", null,
                            React.createElement("strong", null, "Type Guards:"),
                            " Runtime type checking"),
                        React.createElement("li", null,
                            React.createElement("strong", null, "Proxy & Reflect:"),
                            " Operation interception"),
                        React.createElement("li", null,
                            React.createElement("strong", null, "Set:"),
                            " Unique value collections"),
                        React.createElement("li", null,
                            React.createElement("strong", null, "Symbol:"),
                            " Unique identifiers"),
                        React.createElement("li", null,
                            React.createElement("strong", null, "Generators:"),
                            " Function state management"),
                        React.createElement("li", null,
                            React.createElement("strong", null, "Iterators:"),
                            " Custom iteration patterns"),
                        React.createElement("li", null,
                            React.createElement("strong", null, "RxJS:"),
                            " Reactive data streams"))))),
        React.createElement("div", { className: "spfx-info mt-4 alert alert-success" },
            React.createElement("h5", null, "\uD83D\uDE80 SPFx Ready!"),
            React.createElement("p", null, "This React application is designed to be packaged as a SharePoint Framework (SPFx) WebPart. All components are self-contained and can be deployed to SharePoint Online or on-premises."))));
};
export default App;
//# sourceMappingURL=App.js.map