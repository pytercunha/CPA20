
import React from 'react';
import { TrueFalseItem } from '../types';
import { CheckCircleIcon, XCircleIcon } from './icons';

interface TrueFalseCardProps {
  item: TrueFalseItem;
  userAnswer: boolean | null;
  onAnswer: (answer: boolean) => void;
}

const TrueFalseCard: React.FC<TrueFalseCardProps> = ({ item, userAnswer, onAnswer }) => {
  const isAnswered = userAnswer !== null;

  const getButtonClass = (value: boolean) => {
    if (!isAnswered) {
      return 'bg-slate-700 hover:bg-slate-600 text-slate-200 border-slate-600';
    }
    if (value === item.answer) {
      return 'bg-emerald-500 text-white border-emerald-600';
    }
    if (value === userAnswer) {
      return 'bg-red-500 text-white border-red-600';
    }
    return 'bg-slate-700 text-slate-500 opacity-60 border-slate-600';
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-md border border-slate-700 transition-shadow hover:shadow-lg">
      <h3 className="text-xl font-semibold text-slate-100 mb-4">{item.question}</h3>
      <div className="flex space-x-4">
        <button
          onClick={() => !isAnswered && onAnswer(true)}
          disabled={isAnswered}
          className={`w-full py-3 text-lg font-bold rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${getButtonClass(true)}`}
        >
          Verdadeiro
          {isAnswered && item.answer === true && <CheckCircleIcon className="w-6 h-6 ml-2" />}
          {isAnswered && userAnswer === true && item.answer === false && <XCircleIcon className="w-6 h-6 ml-2" />}
        </button>
        <button
          onClick={() => !isAnswered && onAnswer(false)}
          disabled={isAnswered}
          className={`w-full py-3 text-lg font-bold rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${getButtonClass(false)}`}
        >
          Falso
           {isAnswered && item.answer === false && <CheckCircleIcon className="w-6 h-6 ml-2" />}
           {isAnswered && userAnswer === false && item.answer === true && <XCircleIcon className="w-6 h-6 ml-2" />}
        </button>
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

export default TrueFalseCard;