import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-slate-400 py-10">
      <div className="w-16 h-16 border-4 border-teal-500 border-dashed rounded-full animate-spin border-t-transparent"></div>
      <p className="mt-4 text-lg font-semibold text-slate-200">Gerando Conteúdo...</p>
      <p className="text-sm">Por favor, aguarde enquanto a IA prepara seus materiais de estudo.</p>
    </div>
  );
};

export default LoadingSpinner;