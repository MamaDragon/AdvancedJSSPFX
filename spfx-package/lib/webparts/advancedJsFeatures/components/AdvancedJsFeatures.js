var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as React from 'react';
import ContactForm from '../../../react-components/ContactForm';
import QuizComponent from '../../../react-components/QuizComponent';
import FilterComponent from '../../../react-components/FilterComponent';
import AdminComponent from '../../../react-components/AdminComponent';
import './AdvancedJsFeatures.module.scss';
var AdvancedJsFeatures = /** @class */ (function (_super) {
    __extends(AdvancedJsFeatures, _super);
    function AdvancedJsFeatures(props) {
        var _this = _super.call(this, props) || this;
        _this.setActiveComponent = function (component) {
            _this.setState({ activeComponent: component });
        };
        _this.renderHomeComponent = function () {
            return (React.createElement("div", { className: "home-container" },
                React.createElement("div", { className: "hero-section" },
                    React.createElement("h1", null, "Advanced JavaScript Features"),
                    React.createElement("p", null, "Demonstrating modern JavaScript concepts in SharePoint Framework")),
                React.createElement("div", { className: "features-grid" },
                    React.createElement("div", { className: "feature-card" },
                        React.createElement("h3", null, "\uD83D\uDCE7 Contact Form"),
                        React.createElement("p", null, "WeakMap, Type Guards, and Proxy with Reflect"),
                        React.createElement("button", { className: "btn btn-primary", onClick: function () { return _this.setActiveComponent('contact'); } }, "Try Contact Form")),
                    React.createElement("div", { className: "feature-card" },
                        React.createElement("h3", null, "\uD83C\uDFAF Interactive Quiz"),
                        React.createElement("p", null, "Generators, Iterators, and Dynamic Components"),
                        React.createElement("button", { className: "btn btn-success", onClick: function () { return _this.setActiveComponent('quiz'); } }, "Take Quiz")),
                    React.createElement("div", { className: "feature-card" },
                        React.createElement("h3", null, "\uD83D\uDD0D Filter Demo"),
                        React.createElement("p", null, "RxJS Observables, Set, and Symbol"),
                        React.createElement("button", { className: "btn btn-info", onClick: function () { return _this.setActiveComponent('filter'); } }, "Try Filter")),
                    React.createElement("div", { className: "feature-card" },
                        React.createElement("h3", null, "\u2699\uFE0F Admin Panel"),
                        React.createElement("p", null, "CRUD Operations and Dynamic Forms"),
                        React.createElement("button", { className: "btn btn-warning", onClick: function () { return _this.setActiveComponent('admin'); } }, "Admin Panel"))),
                React.createElement("div", { className: "spfx-info" },
                    React.createElement("h4", null, "\uD83D\uDE80 SharePoint Framework Integration"),
                    React.createElement("p", null, "This web part demonstrates advanced JavaScript features within the SharePoint Framework. All components are optimized for SharePoint Online and on-premises environments."),
                    React.createElement("ul", null,
                        React.createElement("li", null, "Modern React components with TypeScript"),
                        React.createElement("li", null, "SharePoint context integration"),
                        React.createElement("li", null, "Office UI Fabric styling"),
                        React.createElement("li", null, "Responsive design for all devices")))));
        };
        _this.renderActiveComponent = function () {
            var activeComponent = _this.state.activeComponent;
            switch (activeComponent) {
                case 'contact':
                    return React.createElement(ContactForm, null);
                case 'quiz':
                    return React.createElement(QuizComponent, null);
                case 'filter':
                    return React.createElement(FilterComponent, null);
                case 'admin':
                    return React.createElement(AdminComponent, null);
                default:
                    return _this.renderHomeComponent();
            }
        };
        _this.state = {
            activeComponent: 'home'
        };
        return _this;
    }
    AdvancedJsFeatures.prototype.render = function () {
        var _this = this;
        var activeComponent = this.state.activeComponent;
        return (React.createElement("div", { className: "advanced-js-features" },
            React.createElement("div", { className: "navigation" },
                React.createElement("button", { className: "nav-btn ".concat(activeComponent === 'home' ? 'active' : ''), onClick: function () { return _this.setActiveComponent('home'); } }, "Home"),
                React.createElement("button", { className: "nav-btn ".concat(activeComponent === 'contact' ? 'active' : ''), onClick: function () { return _this.setActiveComponent('contact'); } }, "Contact"),
                React.createElement("button", { className: "nav-btn ".concat(activeComponent === 'quiz' ? 'active' : ''), onClick: function () { return _this.setActiveComponent('quiz'); } }, "Quiz"),
                React.createElement("button", { className: "nav-btn ".concat(activeComponent === 'filter' ? 'active' : ''), onClick: function () { return _this.setActiveComponent('filter'); } }, "Filter"),
                React.createElement("button", { className: "nav-btn ".concat(activeComponent === 'admin' ? 'active' : ''), onClick: function () { return _this.setActiveComponent('admin'); } }, "Admin")),
            React.createElement("div", { className: "content" }, this.renderActiveComponent())));
    };
    return AdvancedJsFeatures;
}(React.Component));
export default AdvancedJsFeatures;
//# sourceMappingURL=AdvancedJsFeatures.js.map