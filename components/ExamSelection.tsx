
import React from 'react';
import { CheckIcon } from './icons';
import ResourceLinks from './ResourceLinks';
import { Difficulty } from '../types';

interface ExamSelectionProps {
    onSelectTopic: (topic: string, difficulty: Difficulty) => void;
}

const ExamSelection: React.FC<ExamSelectionProps> = ({ onSelectTopic }) => {
    const provas = [
        { label: 'Prova 1', difficulty: Difficulty.EASY },
        { label: 'Prova 2', difficulty: Difficulty.EASY },
        { label: 'Prova 3', difficulty: Difficulty.MEDIUM },
        { label: 'Prova 4', difficulty: Difficulty.HARD },
        { label: 'Prova 5', difficulty: Difficulty.HARD },
    ];
    const modulos = ['Módulo 1', 'Módulo 2', 'Módulo 3', 'Módulo 4', 'Módulo 5', 'Módulo 6', 'Módulo 7'];

    const SelectionButton: React.FC<{ label: string; difficulty: Difficulty }> = ({ label, difficulty }) => (
        <button
            onClick={() => onSelectTopic(label, difficulty)}
            className="flex items-center justify-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md"
        >
            <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center">
                 <CheckIcon className="w-3 h-3 text-teal-600" />
            </div>
            <span>{label}</span>
        </button>
    );

    return (
        <div className="w-full max-w-4xl mx-auto space-y-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-slate-100">
                Exame para Certificação CPA-20
            </h1>
            
            <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-700">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-100 mb-2">
                    Simulados das Provas
                </h2>
                <p className="text-center text-slate-400 mb-6 sm:mb-8">
                    Escolha uma das provas e avalie seu desempenho:
                </p>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                    {provas.map(prova => <SelectionButton key={prova.label} label={prova.label} difficulty={prova.difficulty} />)}
                </div>
            </div>

            <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-700">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-100 mb-2">
                    Simulados dos Módulos
                </h2>
                <p className="text-center text-slate-400 mb-6 sm:mb-8">
                    Escolha um dos Módulos e foque nos conteúdos que precisa aperfeiçoar:
                </p>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                    {modulos.map(modulo => <SelectionButton key={modulo} label={modulo} difficulty={Difficulty.MEDIUM} />)}
                </div>
            </div>

            <ResourceLinks />
        </div>
    );
};

export default ExamSelection;