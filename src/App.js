import React, { useState } from 'react';
import './styles/global.css';
import Question from './components/Question/Question';
import Lifelines from './components/Lifelines/Lifelines';

const questions = [
  { id: 1, question: "What is 2 + 2?", answers: ["3", "4", "5", "6"], correct: 1, prize: 100 },
  { id: 2, question: "Which ocean is the largest?", answers: ["Atlantic", "Indian", "Pacific", "Arctic"], correct: 2, prize: 150 },
  { id: 3, question: "What year was React founded?", answers: ["2010", "2013", "2015", "2017"], correct: 1, prize: 250 },
  { id: 4, question: "Who was the first President of the United States?", answers: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"], correct: 0, prize: 500 },
  { id: 5, question: "What is JSX?", answers: ["JavaScript XML", "JavaScript X", "JavaScript", "XML"], correct: 0, prize: 1500 },
  { id: 6, question: "How many primitive data types are there in JavaScript?", answers: ["6", "7", "8", "5"], correct: 0, prize: 2500 },
  { id: 7, question: "Which planet is known as the Red Planet?", answers: ["Venus", "Earth", "Mars", "Jupiter"], correct: 2, prize: 5000 },
  { id: 8, question: "What is the capital of Japan?", answers: ["Beijing", "Seoul", "Tokyo", "Bangkok"], correct: 2, prize: 15000 },
  { id: 9, question: "Who wrote 'Romeo and Juliet'?", answers: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correct: 1, prize: 25000 },
  { id: 10, question: "Which element has the chemical symbol 'O'?", answers: ["Oxygen", "Osmium", "Ozone", "Opium"], correct: 0, prize: 50000 },
  { id: 11, question: "What is the largest continent by area?", answers: ["Africa", "Asia", "North America", "Europe"], correct: 1, prize: 100000 },
  { id: 12, question: "In which year did World War II end?", answers: ["1941", "1943", "1945", "1947"], correct: 2, prize: 150000 },
  { id: 13, question: "Which programming language is used for Android development?", answers: ["Swift", "Kotlin", "Python", "C#"], correct: 1, prize: 250000 },
  { id: 14, question: "What is the chemical symbol for gold?", answers: ["Ag", "Au", "Pb", "Fe"], correct: 1, prize: 400000 },
];

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [prize, setPrize] = useState(0);
  const [helpUsed, setHelpUsed] = useState({ 50: false, audience: false });
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [answers, setAnswers] = useState(questions[0].answers);
  const [lifelinesDisabled, setLifelinesDisabled] = useState({ 50: false, audience: false });
  const [answerStatus, setAnswerStatus] = useState(null);  // null, "correct", "incorrect"

  const handleAnswer = (index) => {
    const correctIndex = questions[currentQuestion].correct;

    if (index === correctIndex) {
      setAnswerStatus("correct");
      setPrize(prize + questions[currentQuestion].prize);
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setAnswers(questions[currentQuestion + 1].answers);
          setAnswerStatus(null);  // сбрасываем состояние для следующего вопроса
        } else {
          setGameOver(true);
          setGameResult(`Congratulations, you won ${prize + questions[currentQuestion].prize}$!`);
        }
      }, 1000);
    } else {
      setAnswerStatus("incorrect");
      setTimeout(() => {
        setGameOver(true);
        setGameResult(`Wrong answer. You won ${prize}$`);
      }, 1000);
    }
  };

  const useFiftyFifty = () => {
    if (!helpUsed[50]) {
      const correctAnswer = questions[currentQuestion].correct;
      let wrongAnswers = questions[currentQuestion].answers.filter((_, index) => index !== correctAnswer);
      const randomWrongAnswers = wrongAnswers.sort(() => Math.random() - 0.5).slice(0, 2);
      const newAnswers = [questions[currentQuestion].answers[correctAnswer], ...randomWrongAnswers];

      setAnswers(newAnswers);
      setHelpUsed({ ...helpUsed, 50: true });
      setLifelinesDisabled({ ...lifelinesDisabled, 50: true });
    }
  };

  const useAudienceHelp = () => {
    if (!helpUsed.audience) {
      alert("Audience Help: The correct answer is likely " + questions[currentQuestion].answers[questions[currentQuestion].correct]);
      setHelpUsed({ ...helpUsed, audience: true });
      setLifelinesDisabled({ ...lifelinesDisabled, audience: true });
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setPrize(0);
    setHelpUsed({ 50: false, audience: false });
    setGameOver(false);
    setGameResult('');
    setGameStarted(true);
    setAnswers(questions[0].answers);
    setLifelinesDisabled({ 50: false, audience: false });
    setAnswerStatus(null);  // сбрасываем статус при перезапуске
  };

  const startNewGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="game-container">
      <h1>Who Wants to Be a Millionaire?</h1>
      {!gameStarted ? (
        <div className="start-menu">
          <h2>Welcome to "Who Wants to Be a Millionaire?"</h2>
          <button onClick={startNewGame}>New Game</button>
        </div>
      ) : !gameOver ? (
        <>
          <Question 
            question={questions[currentQuestion]} 
            answers={answers}
            onAnswer={handleAnswer} 
            answerStatus={answerStatus}  // передаем статус ответа
          />
          <Lifelines 
            use50={useFiftyFifty} 
            useAudience={useAudienceHelp}
            disabled50={lifelinesDisabled[50]} 
            disabledAudience={lifelinesDisabled.audience}
          />
          <div className="prize">Your prize: ${prize}</div>
        </>
      ) : (
        <div className="game-over">
          <h2>{gameResult}</h2>
          <button onClick={restartGame}>Try Again</button>
        </div>
      )}
    </div>
  );
};

export default App;
