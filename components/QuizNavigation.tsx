
import React from 'react';

interface QuizNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  goToPrevious: () => void;
  goToNext: () => void;
  finishQuiz: () => void;
}

const QuizNavigation: React.FC<QuizNavigationProps> = ({
  currentIndex,
  totalQuestions,
  goToPrevious,
  goToNext,
  finishQuiz,
}) => {
  const isFirstQuestion = currentIndex === 0;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  return (
    <div className="mt-6 flex items-center justify-between bg-slate-800 p-4 rounded-lg shadow-md border border-slate-700">
      <button
        onClick={goToPrevious}
        disabled={isFirstQuestion}
        className="px-5 py-2 text-md font-semibold text-slate-200 bg-slate-600 hover:bg-slate-500 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Anterior
      </button>
      <div className="text-md font-medium text-slate-300">
        Questão {currentIndex + 1} de {totalQuestions}
      </div>
      {isLastQuestion ? (
        <button
          onClick={finishQuiz}
          className="px-5 py-2 text-md font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-emerald-500 transition-colors"
        >
          Finalizar Quiz
        </button>
      ) : (
        <button
          onClick={goToNext}
          className="px-5 py-2 text-md font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-500 transition-colors"
        >
          Próxima
        </button>
      )}
    </div>
  );
};

export default QuizNavigation;