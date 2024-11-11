import React from 'react';

const Question = ({ question, answers, onAnswer, answerStatus }) => {
  return (
    <div className="question-container">
      <h2>{question.question}</h2>
      <div className="answers">
        {question.answers.map((answer, index) => (
          <button key={index} onClick={() => onAnswer(index)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
