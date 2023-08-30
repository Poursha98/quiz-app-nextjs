'use client'
import React from "react";
import {useState} from "react";
import {quiz} from '../data'

export default function Page() {
    const [activeQuestion, setActiveQuestion] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState(false)
    const [checked, setChecked] = useState(false)
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
    const [showResult, setShowResult] = useState(false)
    const [result, setResult] = useState({
        score: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    })

    const {questions} = quiz
    const {question, answers, correctAnswer} = questions[activeQuestion]

    //selecting and checking the answer
    const onAnswerSelected = (ans, i) => {
        setChecked(true)
        setSelectedAnswerIndex(i)
        if (ans === correctAnswer) {
            setSelectedAnswer(true)
            console.log('true')
        } else {
            setSelectedAnswer(false)
            console.log('false')
        }
    }

    //calculating scores and going to the next question
    const nextQuestion = () => {
        setSelectedAnswerIndex(null)
        setResult((prev) =>
            selectedAnswer ? {
                ...prev,
                score: prev.score + 5,
                correctAnswers: prev.correctAnswers + 1,
                wrongAnswers: prev.wrongAnswers + 1
            } : {
                ...prev,
                wrongAnswers: prev.wrongAnswers + 1
            }
        )
        if (activeQuestion !== questions.length - 1) {
            setActiveQuestion(prev => prev + 1)
        } else {
            setActiveQuestion(0)
            setShowResult(true)
        }
        setChecked(false)
    }

    return (
        <main>
            <div className="container">
                <div>
                    <h1>Quiz app</h1>
                    {
                        !showResult ?
                            <h2>
                                Question: {activeQuestion + 1}
                                <span>/{questions.length}</span>
                            </h2>
                            : null
                    }
                </div>
                <div>
                    {!showResult ? (
                        <div className="quiz-container">
                            <h3>{questions[activeQuestion].question}</h3>
                            {answers.map((ans, i) => (
                                (
                                    <li key={i}
                                        onClick={() => onAnswerSelected(ans, i)}
                                        className={selectedAnswerIndex === i ? 'li-selected' : 'li-hover'}
                                    >
                                        <span>{ans}</span>
                                    </li>
                                )
                            ))}
                            {checked ? (
                                <button onClick={nextQuestion}
                                        className='btn'>{activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}</button>
                            ) : (
                                <button
                                    className='btn-disabled'>{activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}</button>
                            )}
                        </div>
                    ) : (
                        <div className="quiz-container">
                            <h3>Quiz Result:</h3>
                            <h3>Overall score: {result.score / 25 * 100}%</h3>
                            <p>Total Questions: {questions.length}</p>
                            <p>Total Score: {result.score}</p>
                            <p>Correct Answers: {result.correctAnswers}</p>
                            <p>Wrong Answers: {result.wrongAnswers}</p>
                            <button onClick={() => window.location.reload()}>Restart the Test</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    )
}
