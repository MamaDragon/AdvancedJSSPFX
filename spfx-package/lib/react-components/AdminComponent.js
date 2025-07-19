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
import './AdminComponent.css';
var AdminComponent = function () {
    var _a = __read(useState([]), 2), quizData = _a[0], setQuizData = _a[1];
    var _b = __read(useState(true), 2), isLoading = _b[0], setIsLoading = _b[1];
    var _c = __read(useState(''), 2), message = _c[0], setMessage = _c[1];
    var _d = __read(useState(''), 2), messageType = _d[0], setMessageType = _d[1];
    var _e = __read(useState({
        question: '',
        choices: '',
        correctAnswer: ''
    }), 2), newQuestion = _e[0], setNewQuestion = _e[1];
    // Refs for form handling
    var questionRefs = useRef({});
    useEffect(function () {
        loadQuizData();
    }, []);
    var loadQuizData = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    setIsLoading(true);
                    return [4 /*yield*/, fetch('./quiz-data.json')];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    setQuizData(data);
                    return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.error('Failed to load quiz data:', error_1);
                    loadMockData();
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var loadMockData = function () {
        setQuizData([
            {
                id: 1,
                question: "What is a WeakMap in JavaScript?",
                choices: ["Array type", "Object collection", "String method", "Function type"],
                correctAnswer: "Object collection"
            },
            {
                id: 2,
                question: "What does a Proxy do?",
                choices: ["Server connection", "Interceptable operations", "Data storage", "Event handling"],
                correctAnswer: "Interceptable operations"
            }
        ]);
    };
    var updateQuestion = function (index, field, value) {
        var updatedData = __spreadArray([], __read(quizData), false);
        if (field === 'choices') {
            updatedData[index][field] = value.split(',').map(function (c) { return c.trim(); }).filter(function (c) { return c; });
        }
        else {
            updatedData[index][field] = value;
        }
        setQuizData(updatedData);
    };
    var deleteQuestion = function (index) {
        if (window.confirm('Are you sure you want to delete this question?')) {
            var updatedData = quizData.filter(function (_, i) { return i !== index; });
            setQuizData(updatedData);
            showMessage('Question deleted successfully!', 'success');
        }
    };
    var addQuestion = function () {
        if (!newQuestion.question || !newQuestion.choices || !newQuestion.correctAnswer) {
            showMessage('Please fill in all fields for the new question.', 'error');
            return;
        }
        var choices = newQuestion.choices.split(',').map(function (c) { return c.trim(); }).filter(function (c) { return c; });
        if (choices.length < 2) {
            showMessage('Please provide at least 2 choices.', 'error');
            return;
        }
        if (!choices.includes(newQuestion.correctAnswer.trim())) {
            showMessage('The correct answer must be one of the choices.', 'error');
            return;
        }
        var newQuestionData = {
            id: Date.now(),
            question: newQuestion.question,
            choices: choices,
            correctAnswer: newQuestion.correctAnswer.trim()
        };
        setQuizData(__spreadArray(__spreadArray([], __read(quizData), false), [newQuestionData], false));
        setNewQuestion({ question: '', choices: '', correctAnswer: '' });
        showMessage('Question added successfully!', 'success');
    };
    var saveAllChanges = function () { return __awaiter(void 0, void 0, void 0, function () {
        var jsonData;
        return __generator(this, function (_a) {
            try {
                jsonData = JSON.stringify(quizData, null, 2);
                localStorage.setItem('quizData', jsonData);
                showMessage('All changes saved successfully!', 'success');
            }
            catch (error) {
                console.error('Save failed:', error);
                showMessage('Failed to save changes.', 'error');
            }
            return [2 /*return*/];
        });
    }); };
    var showMessage = function (text, type) {
        setMessage(text);
        setMessageType(type);
        setTimeout(function () {
            setMessage('');
            setMessageType('');
        }, 5000);
    };
    var previewQuestion = function (index) {
        var question = quizData[index];
        var previewMessage = "\n      Question: ".concat(question.question, "\n      Choices: ").concat(question.choices.join(' | '), "\n      Correct Answer: ").concat(question.correctAnswer, "\n    ");
        alert(previewMessage);
    };
    var exportQuizData = function () {
        var dataStr = JSON.stringify(quizData, null, 2);
        var dataBlob = new Blob([dataStr], { type: 'application/json' });
        var url = URL.createObjectURL(dataBlob);
        var link = document.createElement('a');
        link.href = url;
        link.download = 'quiz-data.json';
        link.click();
        URL.revokeObjectURL(url);
    };
    if (isLoading) {
        return (React.createElement("div", { className: "admin-container" },
            React.createElement("div", { className: "text-center" },
                React.createElement("h2", null, "Loading Admin Panel..."),
                React.createElement("div", { className: "spinner-border", role: "status" },
                    React.createElement("span", { className: "visually-hidden" }, "Loading...")))));
    }
    return (React.createElement("div", { className: "admin-container" },
        React.createElement("div", { className: "admin-header" },
            React.createElement("h1", null, "\u2699\uFE0F Quiz Administration Panel"),
            React.createElement("p", null, "Manage quiz questions with dynamic React forms")),
        React.createElement("div", { className: "features-showcase alert alert-info" },
            React.createElement("h5", null, "\uD83C\uDFAF JavaScript Features Demonstrated:"),
            React.createElement("ul", { className: "mb-0" },
                React.createElement("li", null,
                    React.createElement("strong", null, "Dynamic Forms:"),
                    " React-controlled components"),
                React.createElement("li", null,
                    React.createElement("strong", null, "CRUD Operations:"),
                    " Create, Read, Update, Delete"),
                React.createElement("li", null,
                    React.createElement("strong", null, "State Management:"),
                    " Complex state with hooks"),
                React.createElement("li", null,
                    React.createElement("strong", null, "Real-time Updates:"),
                    " Immediate UI feedback"))),
        message && (React.createElement("div", { className: "alert ".concat(messageType === 'error' ? 'alert-danger' : 'alert-success', " alert-dismissible") },
            message,
            React.createElement("button", { type: "button", className: "btn-close", onClick: function () { return setMessage(''); } }))),
        React.createElement("div", { className: "admin-stats mb-4" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("div", { className: "stat-card" },
                        React.createElement("h3", null, quizData.length),
                        React.createElement("p", null, "Total Questions"))),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("div", { className: "stat-card" },
                        React.createElement("h3", null, quizData.filter(function (q) { return q.choices.length >= 4; }).length),
                        React.createElement("p", null, "Complete Questions"))),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("div", { className: "stat-card" },
                        React.createElement("button", { className: "btn btn-primary", onClick: exportQuizData }, "Export Data"))))),
        React.createElement("div", { className: "questions-section" },
            React.createElement("h3", null, "Existing Questions"),
            quizData.map(function (question, index) { return (React.createElement("div", { key: question.id, className: "question-item" },
                React.createElement("h6", null,
                    "Question ",
                    index + 1),
                React.createElement("div", { className: "mb-3" },
                    React.createElement("label", { className: "form-label" }, "Question Text"),
                    React.createElement("input", { type: "text", className: "form-control", value: question.question, onChange: function (e) { return updateQuestion(index, 'question', e.target.value); }, placeholder: "Enter question text" })),
                React.createElement("div", { className: "mb-3" },
                    React.createElement("label", { className: "form-label" }, "Choices (comma-separated)"),
                    React.createElement("input", { type: "text", className: "form-control", value: question.choices.join(', '), onChange: function (e) { return updateQuestion(index, 'choices', e.target.value); }, placeholder: "Choice 1, Choice 2, Choice 3, Choice 4" })),
                React.createElement("div", { className: "mb-3" },
                    React.createElement("label", { className: "form-label" }, "Correct Answer"),
                    React.createElement("input", { type: "text", className: "form-control", value: question.correctAnswer, onChange: function (e) { return updateQuestion(index, 'correctAnswer', e.target.value); }, placeholder: "Enter the correct answer" })),
                React.createElement("div", { className: "question-actions" },
                    React.createElement("button", { className: "btn btn-sm btn-outline-info me-2", onClick: function () { return previewQuestion(index); } }, "\uD83D\uDC41\uFE0F Preview"),
                    React.createElement("button", { className: "btn btn-sm btn-outline-danger", onClick: function () { return deleteQuestion(index); } }, "\uD83D\uDDD1\uFE0F Delete")))); })),
        React.createElement("div", { className: "add-question-section" },
            React.createElement("h3", null, "Add New Question"),
            React.createElement("div", { className: "mb-3" },
                React.createElement("label", { className: "form-label" }, "Question Text"),
                React.createElement("input", { type: "text", className: "form-control", value: newQuestion.question, onChange: function (e) { return setNewQuestion(__assign(__assign({}, newQuestion), { question: e.target.value })); }, placeholder: "Enter new question text" })),
            React.createElement("div", { className: "mb-3" },
                React.createElement("label", { className: "form-label" }, "Choices (comma-separated)"),
                React.createElement("input", { type: "text", className: "form-control", value: newQuestion.choices, onChange: function (e) { return setNewQuestion(__assign(__assign({}, newQuestion), { choices: e.target.value })); }, placeholder: "Choice 1, Choice 2, Choice 3, Choice 4" })),
            React.createElement("div", { className: "mb-3" },
                React.createElement("label", { className: "form-label" }, "Correct Answer"),
                React.createElement("input", { type: "text", className: "form-control", value: newQuestion.correctAnswer, onChange: function (e) { return setNewQuestion(__assign(__assign({}, newQuestion), { correctAnswer: e.target.value })); }, placeholder: "Enter the correct answer" })),
            React.createElement("button", { className: "btn btn-success me-2", onClick: addQuestion }, "Add Question")),
        React.createElement("div", { className: "save-section text-center mt-4" },
            React.createElement("button", { className: "btn btn-primary btn-lg", onClick: saveAllChanges }, "Save All Changes")),
        React.createElement("div", { className: "architecture-info mt-4" },
            React.createElement("h5", null, "Admin Module Architecture:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("strong", null, "React Components:"),
                    " Functional components with hooks"),
                React.createElement("li", null,
                    React.createElement("strong", null, "Dynamic Forms:"),
                    " Controlled components with validation"),
                React.createElement("li", null,
                    React.createElement("strong", null, "State Management:"),
                    " Complex state updates"),
                React.createElement("li", null,
                    React.createElement("strong", null, "CRUD Operations:"),
                    " Full data manipulation")))));
};
export default AdminComponent;
//# sourceMappingURL=AdminComponent.js.map