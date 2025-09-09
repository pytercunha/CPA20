import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="w-full text-center py-4 mt-8">
            <div className="text-slate-400 text-sm">
                <p>
                    Criado por{' '}
                    <span className="font-semibold text-teal-400">
                        Pyter Boulhosa Cunha
                    </span>
                    . Este é um projeto de estudo para a certificação CPA-20.
                </p>
                <p className="mt-4 text-xs text-slate-500">
                    Aviso: Este site é uma ferramenta de estudo e não possui vínculo oficial com a ANBIMA ou com o exame de certificação.
                </p>
            </div>
        </footer>
    );
};

export default Footer;