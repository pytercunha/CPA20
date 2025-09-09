
import React from 'react';
import { ExternalLinkIcon } from './icons';

const links = [
    { name: 'TopInvest Simulados', url: 'https://simulados.topinvest.com.br/simulados/cpa20/questoes-de-prova' },
    { name: 'Elite Bancária - Simulado Gratuito', url: 'https://elitebancaria.com.br/cpa20-simulados/' },
    { name: 'Eu Me Banco - Simulados CPA-20', url: 'https://eumebanco.com.br/simulado-cpa-20/' },
    { name: 'Pro Educacional - Provas e Simulados', url: 'https://www.proeducacional.com/simulados/cpa-20/' },
];

const ResourceLinks: React.FC = () => {
    return (
        <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-700">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-100 mb-2">
                Links Úteis para Simulados
            </h2>
            <p className="text-center text-slate-400 mb-6 sm:mb-8">
                Diversifique seus estudos com outros recursos online:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {links.map(link => (
                    <a
                        key={link.name}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 shadow-md"
                    >
                        <span>{link.name}</span>
                        <ExternalLinkIcon className="w-5 h-5" />
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ResourceLinks;