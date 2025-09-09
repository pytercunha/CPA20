
import React from 'react';
import { McqItem } from '../types';
import { CheckCircleIcon, XCircleIcon } from './icons';

interface McqCardProps {
  item: McqItem;
  userAnswer: string | null;
  onAnswer: (answer: string) => void;
}

const McqCard: React.FC<McqCardProps> = ({ item, userAnswer, onAnswer }) => {
  const isAnswered = userAnswer !== null;

  // Function to style the main option container
  const getOptionContainerClass = (option: string) => {
    const base = 'flex items-center p-3 rounded-lg border-2 transition-all duration-200';
    if (!isAnswered) {
      return `${base} bg-slate-700 border-slate-600 hover:bg-slate-600 cursor-pointer text-slate-200`;
    }
    if (option === item.answer) {
      return `${base} bg-emerald-500 border-emerald-600 text-white`;
    }
    if (option === userAnswer) {
      return `${base} bg-red-500 border-red-600 text-white`;
    }
    return `${base} bg-slate-700 border-slate-600 text-slate-400 opacity-60 cursor-not-allowed`;
  };

  // Function to style the letter circle prefix
  const getLetterCircleClass = (option: string) => {
      const base = 'flex-shrink-0 flex items-center justify-center w-7 h-7 mr-4 font-bold text-sm rounded-full border-2';
      if (!isAnswered) {
          return `${base} border-slate-500 text-slate-300`;
      }
      if (option === item.answer) {
          return `${base} bg-white border-emerald-500 text-emerald-600`;
      }
      if (option === userAnswer) {
          return `${base} bg-white border-red-500 text-red-600`;
      }
      return `${base} border-slate-600 text-slate-500`;
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-md border border-slate-700 transition-shadow hover:shadow-lg">
      <h3 className="text-xl font-semibold text-slate-100 mb-5">{item.question}</h3>
      <div className="space-y-3">
        {item.options.map((option, index) => (
          <div
            key={index}
            onClick={() => !isAnswered && onAnswer(option)}
            className={getOptionContainerClass(option)}
            aria-disabled={isAnswered}
          >
            <div className={getLetterCircleClass(option)}>
                {String.fromCharCode(65 + index)}
            </div>
            <span className="flex-grow">{option}</span>
            {isAnswered && option === item.answer && <CheckCircleIcon className="w-6 h-6 ml-auto text-white" />}
            {isAnswered && option === userAnswer && option !== item.answer && <XCircleIcon className="w-6 h-6 ml-auto text-white" />}
          </div>
        ))}
      </div>
      {isAnswered && (
        <div className="mt-5 p-4 bg-slate-900 rounded-md border border-slate-700">
          <h4 className="font-bold text-slate-200">Explicação:</h4>
          <p className="text-slate-300 mt-1">{item.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default McqCard;