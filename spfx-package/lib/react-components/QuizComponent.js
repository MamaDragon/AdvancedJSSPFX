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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import React, { useState, useEffect, useCallback } from 'react';
import './QuizComponent.css';
/**
 * React version of the Quiz Component with advanced JavaScript features
 * Demonstrates generators, iterators, and dynamic DOM manipulation
 */
var QuizComponent = function () {
    var _a = __read(useState([]), 2), quizData = _a[0], setQuizData = _a[1];
    var _b = __read(useState({}), 2), currentAnswers = _b[0], setCurrentAnswers = _b[1];
    var _c = __read(useState(false), 2), isSubmitted = _c[0], setIsSubmitted = _c[1];
    var _d = __read(useState(null), 2), results = _d[0], setResults = _d[1];
    var _e = __read(useState(true), 2), isLoading = _e[0], setIsLoading = _e[1];
    // Generator function for quiz iteration
    var quizIterator = function (questions) {
        var i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < questions.length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, {
                            question: questions[i],
                            index: i,
                            isLast: i === questions.length - 1
                        }];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    };
    // Custom iterator for results
    var createResultsIterator = function (results) {
        var _a;
        var index = 0;
        return _a = {},
            _a[Symbol.iterator] = function () {
                return this;
            },
            _a.next = function () {
                if (index < results.length) {
                    return { value: results[index++], done: false };
                }
                return { done: true };
            },
            _a;
    };
    // Load quiz data on component mount
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
                    // Fallback to mock data
                    setQuizData([
                        {
                            question: "What is a WeakMap in JavaScript?",
                            choices: ["Array type", "Object collection", "String method", "Function type"],
                            correctAnswer: "Object collection"
                        },
                        {
                            question: "What does a Proxy do?",
                            choices: ["Server connection", "Interceptable operations", "Data storage", "Event handling"],
                            correctAnswer: "Interceptable operations"
                        }
                    ]);
                    return [3 /*break*/, 5];
                case 4:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleAnswerChange = function (questionIndex, selectedAnswer) {
        setCurrentAnswers(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[questionIndex] = selectedAnswer, _a)));
        });
    };
    var calculateScore = useCallback(function () {
        var e_1, _a;
        var results = [];
        var score = 0;
        try {
            // Use generator to iterate through questions
            for (var _b = __values(quizIterator(quizData)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = _c.value, question = _d.question, index = _d.index;
                var userAnswer = currentAnswers[index];
                var isCorrect = userAnswer === question.correctAnswer;
                if (isCorrect)
                    score++;
                results.push({
                    question: index + 1,
                    questionText: question.question,
                    selected: userAnswer || 'Not answered',
                    correct: question.correctAnswer,
                    isCorrect: isCorrect
                });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return {
            score: score,
            total: quizData.length,
            percentage: Math.round((score / quizData.length) * 100),
            results: results
        };
    }, [quizData, currentAnswers]);
    var handleSubmit = function () {
        var quizResults = calculateScore();
        setResults(quizResults);
        setIsSubmitted(true);
        // Save results to localStorage
        localStorage.setItem('quizResults', JSON.stringify(quizResults));
    };
    var resetQuiz = function () {
        setCurrentAnswers({});
        setIsSubmitted(false);
        setResults(null);
    };
    if (isLoading) {
        return (React.createElement("div", { className: "quiz-container" },
            React.createElement("div", { className: "text-center" },
                React.createElement("h2", null, "Loading Quiz..."),
                React.createElement("div", { className: "spinner-border", role: "status" },
                    React.createElement("span", { className: "visually-hidden" }, "Loading...")))));
    }
    return (React.createElement("div", { className: "quiz-container" },
        React.createElement("div", { className: "quiz-header" },
            React.createElement("h1", null, "\uD83D\uDCDA Interactive Quiz System"),
            React.createElement("p", null, "Demonstrating generators, iterators, and dynamic React components")),
        React.createElement("div", { className: "features-showcase alert alert-info" },
            React.createElement("h5", null, "\uD83C\uDFAF JavaScript Features Demonstrated:"),
            React.createElement("ul", { className: "mb-0" },
                React.createElement("li", null,
                    React.createElement("strong", null, "Generators:"),
                    " Quiz iteration with yield"),
                React.createElement("li", null,
                    React.createElement("strong", null, "Iterators:"),
                    " Custom result processing"),
                React.createElement("li", null,
                    React.createElement("strong", null, "React Hooks:"),
                    " State management and effects"),
                React.createElement("li", null,
                    React.createElement("strong", null, "Dynamic Rendering:"),
                    " Question components"))),
        !isSubmitted ? (React.createElement("div", { className: "quiz-section" },
            React.createElement("h3", null, "Answer the following questions:"),
            quizData.map(function (question, questionIndex) { return (React.createElement("div", { key: questionIndex, className: "question-card mb-4" },
                React.createElement("h5", null,
                    questionIndex + 1,
                    ". ",
                    question.question),
                question.choices.map(function (choice, choiceIndex) { return (React.createElement("div", { key: choiceIndex, className: "form-check" },
                    React.createElement("input", { className: "form-check-input", type: "radio", name: "question-".concat(questionIndex), id: "q".concat(questionIndex, "-").concat(choiceIndex), value: choice, checked: currentAnswers[questionIndex] === choice, onChange: function () { return handleAnswerChange(questionIndex, choice); } }),
                    React.createElement("label", { className: "form-check-label", htmlFor: "q".concat(questionIndex, "-").concat(choiceIndex) }, choice))); }))); }),
            React.createElement("div", { className: "submit-section text-center" },
                React.createElement("button", { className: "btn btn-success btn-lg", onClick: handleSubmit, disabled: Object.keys(currentAnswers).length === 0 }, "Submit Quiz")))) : (React.createElement("div", { className: "results-section" },
            React.createElement("div", { className: "alert alert-success" },
                React.createElement("h4", null, "Quiz Results"),
                React.createElement("p", null,
                    "Score: ",
                    results.score,
                    " / ",
                    results.total,
                    " (",
                    results.percentage,
                    "%)")),
            React.createElement("h5", null, "Detailed Results:"),
            (function () {
                var e_2, _a;
                var resultsList = [];
                var resultsIterator = createResultsIterator(results.results);
                try {
                    for (var resultsIterator_1 = __values(resultsIterator), resultsIterator_1_1 = resultsIterator_1.next(); !resultsIterator_1_1.done; resultsIterator_1_1 = resultsIterator_1.next()) {
                        var result = resultsIterator_1_1.value;
                        resultsList.push(React.createElement("div", { key: result.question, className: "card mb-2 ".concat(result.isCorrect ? 'border-success' : 'border-danger') },
                            React.createElement("div", { className: "card-body" },
                                React.createElement("h6", { className: "card-title" },
                                    "Question ",
                                    result.question,
                                    result.isCorrect ? ' ✅' : ' ❌'),
                                React.createElement("p", { className: "card-text" },
                                    React.createElement("strong", null, "Question:"),
                                    " ",
                                    result.questionText,
                                    React.createElement("br", null),
                                    React.createElement("strong", null, "Your Answer:"),
                                    " ",
                                    result.selected,
                                    React.createElement("br", null),
                                    React.createElement("strong", null, "Correct Answer:"),
                                    " ",
                                    result.correct))));
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (resultsIterator_1_1 && !resultsIterator_1_1.done && (_a = resultsIterator_1.return)) _a.call(resultsIterator_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return resultsList;
            })(),
            React.createElement("div", { className: "text-center mt-4" },
                React.createElement("button", { className: "btn btn-primary", onClick: resetQuiz }, "Take Quiz Again")))),
        React.createElement("div", { className: "architecture-info mt-4" },
            React.createElement("h5", null, "Code Architecture:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("strong", null, "React Components:"),
                    " Functional components with hooks"),
                React.createElement("li", null,
                    React.createElement("strong", null, "Generator Functions:"),
                    " Quiz iteration management"),
                React.createElement("li", null,
                    React.createElement("strong", null, "Custom Iterators:"),
                    " Result processing"),
                React.createElement("li", null,
                    React.createElement("strong", null, "State Management:"),
                    " React hooks for data flow")))));
};
export default QuizComponent;
//# sourceMappingURL=QuizComponent.js.map