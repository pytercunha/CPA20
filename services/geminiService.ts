import { GoogleGenAI, Type } from "@google/genai";
import { McqItem, TrueFalseItem, Difficulty, GroundingChunk } from '../types';

const apiKey = process.env.API_KEY;

if (!apiKey) {
    throw new Error("A variável de ambiente API_KEY não foi definida");
}

const ai = new GoogleGenAI({ apiKey });
const model = 'gemini-2.5-flash';

const mcqSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            question: {
                type: Type.STRING,
                description: 'O texto da questão de múltipla escolha.'
            },
            options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: 'Um array com 4 possíveis respostas.'
            },
            answer: {
                type: Type.STRING,
                description: 'A resposta correta dentre as opções.'
            },
            explanation: {
                type: Type.STRING,
                description: 'Uma explicação detalhada do porquê a resposta está correta.'
            },
        },
        required: ['question', 'options', 'answer', 'explanation']
    }
};

const trueFalseSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            question: {
                type: Type.STRING,
                description: 'A afirmação de verdadeiro ou falso.'
            },
            answer: {
                type: Type.BOOLEAN,
                description: 'A resposta correta, verdadeiro ou falso.'
            },
            explanation: {
                type: Type.STRING,
                description: 'Uma explicação detalhada do porquê a afirmação é verdadeira ou falsa.'
            }
        },
        required: ['question', 'answer', 'explanation']
    }
};

export async function generateMcqs(topic: string, difficulty: Difficulty, count: number): Promise<McqItem[]> {
    const prompt = `Gere ${count} questões de múltipla escolha desafiadoras, nível exame CPA-20, sobre "${topic}" com dificuldade ${difficulty}. Cada questão deve ter exatamente 4 opções. Toda a resposta, incluindo perguntas, opções e explicações, deve ser em português brasileiro.`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: mcqSchema,
        },
    });

    const jsonText = (response.text ?? "").trim();
    try {
        return JSON.parse(jsonText);
    } catch (e) {
        console.error("Falha ao analisar JSON de Múltipla Escolha:", jsonText);
        throw new Error("Recebemos dados malformados da IA.");
    }
}

// FIX: Updated prompt to explicitly request JSON, and removed responseMimeType/responseSchema from config as they are not allowed with the googleSearch tool.
export async function generateGroundedMcqs(topic: string, difficulty: Difficulty, count: number): Promise<{ questions: McqItem[], sources: GroundingChunk[] }> {
    const prompt = `Atuando como um especialista na certificação brasileira CPA-20, gere ${count} questões de múltipla escolha nível exame sobre "${topic}" com dificuldade ${difficulty}. Use seu conhecimento e informações de fontes públicas da web para garantir que as questões sejam realistas e relevantes. Cada questão deve ter exatamente 4 opções. Sua resposta deve ser um array JSON válido de objetos, onde cada objeto tem as seguintes chaves: "question" (string), "options" (array de 4 strings), "answer" (string), e "explanation" (string). Não inclua nenhum outro texto ou formatação. A resposta deve ser inteiramente em português brasileiro.`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            tools: [{ googleSearch: {} }],
        },
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];

    let jsonText = (response.text ?? "").trim();

    // The model response might be wrapped in markdown.
    const match = jsonText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match) {
        jsonText = match[1];
    }

    try {
        const questions = JSON.parse(jsonText);
        return { questions, sources };
    } catch (e) {
        console.error("Falha ao analisar JSON de Múltipla Escolha com Fontes:", jsonText);
        throw new Error("Recebemos dados malformados da IA.");
    }
}

export async function generateTrueFalse(topic: string, difficulty: Difficulty, count: number): Promise<TrueFalseItem[]> {
    const prompt = `Gere ${count} questões de verdadeiro ou falso desafiadoras, nível exame CPA-20, sobre "${topic}" com dificuldade ${difficulty}. Toda a resposta, incluindo perguntas e explicações, deve ser em português brasileiro.`;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: trueFalseSchema,
        },
    });

    const jsonText = (response.text ?? "").trim();
    try {
        return JSON.parse(jsonText);
    } catch (e) {
        console.error("Falha ao analisar JSON de Verdadeiro/Falso:", jsonText);
        throw new Error("Recebemos dados malformados da IA.");
    }
}

export async function explainConcept(topic: string): Promise<string> {
    const prompt = `Forneça uma explicação clara e abrangente sobre o tópico do exame CPA-20: "${topic}". Estruture a explicação com títulos e marcadores para facilitar a leitura. Explique como se estivesse ensinando alguém que está estudando para o exame. A resposta deve ser em português brasileiro.`;
    
    const response = await ai.models.generateContent({
        model,
        contents: prompt
    });

    return response.text ?? "";
}
