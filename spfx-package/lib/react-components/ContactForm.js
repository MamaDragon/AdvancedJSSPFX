var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useEffect, useRef } from 'react';
/**
 * React version of the Contact Form with advanced JavaScript features
 * Demonstrates WeakMap, Type Guards, and Proxy with Reflect
 * SPFx-compatible version
 */
var ContactForm = function () {
    var _a = __read(useState({
        phone: '',
        email: '',
        zip: ''
    }), 2), formData = _a[0], setFormData = _a[1];
    var _b = __read(useState([]), 2), errors = _b[0], setErrors = _b[1];
    var _c = __read(useState(false), 2), isSubmitted = _c[0], setIsSubmitted = _c[1];
    var _d = __read(useState(null), 2), submissionId = _d[0], setSubmissionId = _d[1];
    var _e = __read(useState([]), 2), submissions = _e[0], setSubmissions = _e[1];
    // WeakMap for form metadata (React equivalent)
    var formMetaRef = useRef(new WeakMap());
    var formRef = useRef(null);
    // Proxy wrapper for logging (React-compatible)
    var createFormProxy = function (obj) {
        return new Proxy(obj, {
            get: function (target, prop) {
                var value = Reflect.get(target, prop);
                console.log("Accessed ".concat(String(prop), ":"), value);
                return value;
            },
            set: function (target, prop, value) {
                console.log("Set ".concat(String(prop), " = ").concat(value));
                return Reflect.set(target, prop, value);
            }
        });
    };
    // Type guards
    var isValidEmail = function (email) { return /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email); };
    var isValidPhone = function (phone) { return /^\d{10}$/.test(phone); };
    var isValidZip = function (zip) { return /^\d{5}$/.test(zip); };
    // Load saved submissions on component mount
    useEffect(function () {
        loadSavedSubmissions();
    }, []);
    var loadSavedSubmissions = function () {
        try {
            var saved = localStorage.getItem('contactSubmissions');
            if (saved) {
                setSubmissions(JSON.parse(saved));
            }
        }
        catch (error) {
            console.error('Error loading submissions:', error);
        }
    };
    var handleInputChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        // Use proxy for logging
        var proxiedFormData = createFormProxy(formData);
        proxiedFormData[name] = value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
        // Clear errors when user starts typing
        if (errors.length > 0) {
            setErrors([]);
        }
    };
    var validateForm = function () {
        var newErrors = [];
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
    var handleSubmit = function (e) { return __awaiter(void 0, void 0, void 0, function () {
        var validationErrors, submissionData, savedSubmissions, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    validationErrors = validateForm();
                    if (validationErrors.length > 0) {
                        setErrors(validationErrors);
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    submissionData = {
                        timestamp: new Date().toISOString(),
                        phone: formData.phone,
                        email: formData.email,
                        zip: formData.zip,
                        id: Date.now()
                    };
                    savedSubmissions = __spreadArray(__spreadArray([], __read(submissions), false), [submissionData], false);
                    localStorage.setItem('contactSubmissions', JSON.stringify(savedSubmissions));
                    setSubmissions(savedSubmissions);
                    // Save to SharePoint List (SPFx integration)
                    return [4 /*yield*/, saveToSharePointList(submissionData)];
                case 2:
                    // Save to SharePoint List (SPFx integration)
                    _a.sent();
                    setIsSubmitted(true);
                    setSubmissionId(submissionData.id);
                    setFormData({ phone: '', email: '', zip: '' });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Submission error:', error_1);
                    setErrors(['Submission failed. Please try again.']);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var saveToSharePointList = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // In SPFx, this would integrate with SharePoint Lists
            console.log('Saving to SharePoint List:', data);
            return [2 /*return*/, Promise.resolve()];
        });
    }); };
    var downloadSubmission = function (id) {
        var submission = submissions.find(function (s) { return s.id === id; });
        if (submission) {
            var dataStr = JSON.stringify(submission, null, 2);
            var dataBlob = new Blob([dataStr], { type: 'application/json' });
            var url = URL.createObjectURL(dataBlob);
            var link = document.createElement('a');
            link.href = url;
            link.download = "submission-".concat(id, ".json");
            link.click();
            URL.revokeObjectURL(url);
        }
    };
    var clearAllSubmissions = function () {
        localStorage.removeItem('contactSubmissions');
        setSubmissions([]);
    };
    return (React.createElement("div", { style: { padding: '20px', maxWidth: '800px', margin: '0 auto' } },
        React.createElement("div", { style: { textAlign: 'center', marginBottom: '2rem' } },
            React.createElement("h1", null, "\uD83D\uDCE7 Contact Form"),
            React.createElement("p", null, "Advanced form validation with React and modern JavaScript features")),
        React.createElement("div", { style: {
                background: '#d1ecf1',
                border: '1px solid #bee5eb',
                borderLeft: '4px solid #17a2b8',
                padding: '1rem',
                borderRadius: '0.375rem',
                marginBottom: '1.5rem'
            } },
            React.createElement("h5", { style: { color: '#0c5460', marginBottom: '1rem' } }, "\uD83C\uDFAF JavaScript Features Demonstrated:"),
            React.createElement("ul", { style: { marginBottom: 0 } },
                React.createElement("li", null,
                    React.createElement("strong", null, "WeakMap:"),
                    " Tracks form validation status privately"),
                React.createElement("li", null,
                    React.createElement("strong", null, "Type Guards:"),
                    " Ensures input validation"),
                React.createElement("li", null,
                    React.createElement("strong", null, "Proxy with Reflect:"),
                    " Logs all property access"),
                React.createElement("li", null,
                    React.createElement("strong", null, "React Hooks:"),
                    " Modern state management"))),
        isSubmitted && (React.createElement("div", { style: {
                background: '#d4edda',
                border: '1px solid #c3e6cb',
                color: '#155724',
                padding: '1rem',
                borderRadius: '0.375rem',
                marginBottom: '1.5rem'
            } },
            React.createElement("h5", null, "Form submitted successfully!"),
            React.createElement("p", null, "Data has been saved to localStorage and SharePoint."),
            React.createElement("button", { style: {
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: '1px solid #007bff',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '0.25rem',
                    cursor: 'pointer'
                }, onClick: function () { return downloadSubmission(submissionId); } }, "Download My Submission"),
            React.createElement("small", { style: { display: 'block', marginTop: '0.5rem', color: '#6c757d' } },
                "Submission ID: ",
                submissionId))),
        errors.length > 0 && (React.createElement("div", { style: {
                background: '#f8d7da',
                border: '1px solid #f5c6cb',
                color: '#721c24',
                padding: '1rem',
                borderRadius: '0.375rem',
                marginBottom: '1.5rem'
            } }, errors.map(function (error, index) { return (React.createElement("div", { key: index }, error)); }))),
        React.createElement("form", { ref: formRef, onSubmit: handleSubmit, style: {
                background: 'white',
                padding: '2rem',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                marginBottom: '2rem'
            } },
            React.createElement("div", { style: { marginBottom: '1rem' } },
                React.createElement("label", { htmlFor: "phone", style: { fontWeight: '600', display: 'block', marginBottom: '0.5rem' } }, "Phone Number"),
                React.createElement("input", { type: "text", id: "phone", name: "phone", value: formData.phone, onChange: handleInputChange, placeholder: "1234567890", maxLength: 10, required: true, style: {
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ced4da',
                        borderRadius: '0.375rem',
                        fontSize: '1rem'
                    } }),
                React.createElement("div", { style: { color: '#6c757d', fontSize: '0.875rem', marginTop: '0.25rem' } }, "Enter 10 digits only")),
            React.createElement("div", { style: { marginBottom: '1rem' } },
                React.createElement("label", { htmlFor: "email", style: { fontWeight: '600', display: 'block', marginBottom: '0.5rem' } }, "Email Address"),
                React.createElement("input", { type: "email", id: "email", name: "email", value: formData.email, onChange: handleInputChange, placeholder: "example@email.com", required: true, style: {
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ced4da',
                        borderRadius: '0.375rem',
                        fontSize: '1rem'
                    } })),
            React.createElement("div", { style: { marginBottom: '1rem' } },
                React.createElement("label", { htmlFor: "zip", style: { fontWeight: '600', display: 'block', marginBottom: '0.5rem' } }, "ZIP Code"),
                React.createElement("input", { type: "text", id: "zip", name: "zip", value: formData.zip, onChange: handleInputChange, placeholder: "12345", maxLength: 5, required: true, style: {
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #ced4da',
                        borderRadius: '0.375rem',
                        fontSize: '1rem'
                    } }),
                React.createElement("div", { style: { color: '#6c757d', fontSize: '0.875rem', marginTop: '0.25rem' } }, "Enter 5 digits only")),
            React.createElement("button", { type: "submit", style: {
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '0.75rem 2rem',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                } }, "Submit Form")),
        submissions.length > 0 && (React.createElement("div", { style: {
                background: 'white',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
            } },
            React.createElement("h6", { style: { marginBottom: '1rem' } },
                "Saved Submissions (",
                submissions.length,
                ")"),
            submissions.map(function (submission, index) { return (React.createElement("div", { key: submission.id, style: {
                    border: '1px solid #dee2e6',
                    borderRadius: '0.375rem',
                    padding: '1rem',
                    marginBottom: '1rem'
                } },
                React.createElement("h6", null,
                    "Submission #",
                    index + 1),
                React.createElement("p", { style: { fontSize: '0.875rem', lineHeight: '1.4', color: '#6c757d' } },
                    React.createElement("strong", null, "Date:"),
                    " ",
                    new Date(submission.timestamp).toLocaleString(),
                    React.createElement("br", null),
                    React.createElement("strong", null, "Phone:"),
                    " ",
                    submission.phone,
                    React.createElement("br", null),
                    React.createElement("strong", null, "Email:"),
                    " ",
                    submission.email,
                    React.createElement("br", null),
                    React.createElement("strong", null, "ZIP:"),
                    " ",
                    submission.zip,
                    React.createElement("br", null),
                    React.createElement("small", null,
                        "ID: ",
                        submission.id)))); }),
            React.createElement("button", { style: {
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: '1px solid #dc3545',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem',
                    cursor: 'pointer'
                }, onClick: clearAllSubmissions }, "Clear All Data"))),
        React.createElement("div", { style: {
                background: '#fff3cd',
                border: '1px solid #ffeeba',
                color: '#856404',
                textAlign: 'center',
                padding: '1rem',
                borderRadius: '0.375rem',
                marginTop: '1rem'
            } },
            React.createElement("p", null,
                React.createElement("strong", null, "Check the browser console"),
                " to see Proxy logging in action!"))));
};
export default ContactForm;
//# sourceMappingURL=ContactForm.js.map