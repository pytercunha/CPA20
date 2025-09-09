
import React from 'react';
import { McqItem, TrueFalseItem, GroundingChunk } from '../types';
import { CheckCircleIcon, XCircleIcon } from './icons';

interface QuizSummaryProps {
  items: Array<McqItem | TrueFalseItem>;
  userAnswers: (string | boolean | null)[];
  onRestart: () => void;
  sources?: GroundingChunk[];
}

const QuizSummary: React.FC<QuizSummaryProps> = ({ items, userAnswers, onRestart, sources }) => {
  const correctAnswersCount = items.reduce((count, item, index) => {
    const userAnswer = userAnswers[index];
    const isCorrect = userAnswer === item.answer;
    return isCorrect ? count + 1 : count;
  }, 0);

  const scorePercentage = Math.round((correctAnswersCount / items.length) * 100);

  const getResultColor = () => {
    if (scorePercentage >= 80) return 'text-emerald-400';
    if (scorePercentage >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  // FIX: Filter sources to ensure they have a URI before attempting to render a link.
  const validSources = sources?.filter(s => s.web?.uri) ?? [];

  return (
    <div className="bg-slate-800 text-slate-200 p-8 rounded-lg shadow-xl border border-slate-700">
      <h2 className="text-3xl font-bold text-slate-100 mb-2">Quiz Concluído!</h2>
      <p className="text-lg text-slate-400 mb-6">Aqui está o resumo do seu desempenho.</p>
      
      <div className="text-center bg-slate-700 p-6 rounded-lg border border-slate-600 mb-8">
        <p className="text-xl text-slate-300">Sua Pontuação</p>
        <p className={`text-6xl font-bold my-2 ${getResultColor()}`}>{scorePercentage}%</p>
        <p className="text-lg text-slate-300">Você respondeu {correctAnswersCount} de {items.length} questões corretamente.</p>
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-semibold text-slate-100 border-b border-slate-600 pb-2">Revise Suas Respostas</h3>
        {items.map((item, index) => {
          const userAnswer = userAnswers[index];
          const isCorrect = userAnswer === item.answer;

          return (
            <div key={index} className={`p-4 rounded-lg border-l-4 ${isCorrect ? 'border-emerald-500 bg-emerald-900/50' : 'border-red-500 bg-red-900/50'}`}>
              <p className="font-semibold text-slate-200 mb-2">{index + 1}. {item.question}</p>
              <div className="flex items-center text-sm">
                {isCorrect ? <CheckCircleIcon className="w-5 h-5 mr-2 text-emerald-500" /> : <XCircleIcon className="w-5 h-5 mr-2 text-red-500" />}
                <p className="text-slate-300">
                  <span className="font-medium">Sua resposta:</span> {String(userAnswer)}
                  {!isCorrect && <span className="ml-4"><span className="font-medium">Resposta correta:</span> {String(item.answer)}</span>}
                </p>
              </div>
               <details className="mt-2 text-sm">
                    <summary className="cursor-pointer font-medium text-teal-400 hover:underline">
                        Ver Explicação
                    </summary>
                    <p className="text-slate-400 mt-1 pl-2 border-l-2 border-slate-500">{item.explanation}</p>
                </details>
            </div>
          );
        })}
      </div>

      {validSources.length > 0 && (
        <div className="mt-8">
            <h3 className="text-2xl font-semibold text-slate-100 border-b border-slate-600 pb-2 mb-4">Fontes Consultadas</h3>
            <ul className="space-y-2 list-disc list-inside">
                {validSources.map((source, index) => (
                    <li key={index} className="text-sm">
                        <a 
                            href={source.web!.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-teal-400 hover:underline"
                        >
                            {source.web!.title || source.web!.uri}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
      )}

      <div className="mt-8 text-center">
        <button
          onClick={onRestart}
          className="px-8 py-3 text-lg font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500/50 transition-all duration-200"
        >
          Voltar ao Início
        </button>
      </div>
    </div>
  );
};

export default QuizSummary;