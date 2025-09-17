import { useState, useCallback } from "react";
import { StudyMode, McqItem, TrueFalseItem, Difficulty, QuizState, GroundingChunk } from './types';
import LoadingSpinner from './components/LoadingSpinner';
import McqCard from './components/McqCard';
import TrueFalseCard from './components/TrueFalseCard';
import ExplanationCard from './components/ExplanationCard';
import { generateMcqs, generateTrueFalse, explainConcept, generateGroundedMcqs } from './services/geminiService';
import QuizNavigation from './components/QuizNavigation';
import QuizSummary from './components/QuizSummary';
import ExamSelection from './components/ExamSelection';
import Footer from './components/Footer';


export default function App() {
  const [topic, setTopic] = useState<string>('');
  
  const [generatedContent, setGeneratedContent] = useState<Array<McqItem | TrueFalseItem> | string | null>(null);
  const [sources, setSources] = useState<GroundingChunk[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [quizState, setQuizState] = useState<QuizState>(QuizState.IDLE);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<(string | boolean | null)[]>([]);

  const restartQuiz = () => {
    setTopic('');
    setQuizState(QuizState.IDLE);
    setGeneratedContent(null);
    setUserAnswers([]);
    setCurrentQuestionIndex(0);
    setError(null);
    setSources([]);
  };

  const handleGenerate = useCallback(async (selectedTopic: string, difficulty: Difficulty, mode: StudyMode = StudyMode.MCQ) => {
    if (!selectedTopic.trim()) {
      setError('Por favor, selecione um tópico para começar.');
      return;
    }
    setTopic(selectedTopic);
    restartQuiz(); // Restart clears state, so setTopic must be called again after.
    setTopic(selectedTopic);
    setIsLoading(true);

    try {
      // Hardcoded count for the new UI
      const questionCount = 10;
      let content;

      switch (mode) {
        case StudyMode.MCQ:
          content = await generateMcqs(selectedTopic, difficulty, questionCount);
          setGeneratedContent(content);
          break;
        case StudyMode.TRUE_FALSE:
          content = await generateTrueFalse(selectedTopic, difficulty, questionCount);
          setGeneratedContent(content);
          break;
        case StudyMode.EXPLAINER:
          content = await explainConcept(selectedTopic);
          setGeneratedContent(content);
          setQuizState(QuizState.IDLE); // No quiz for explainer
          break;
        case StudyMode.WEB_GROUNDED:
          const groundedResult = await generateGroundedMcqs(selectedTopic, difficulty, questionCount);
          content = groundedResult.questions;
          setGeneratedContent(content);
          setSources(groundedResult.sources);
          break;
        default:
          throw new Error('Modo de estudo inválido selecionado.');
      }
      
      if (Array.isArray(content)) {
        setUserAnswers(new Array(content.length).fill(null));
        setQuizState(QuizState.IN_PROGRESS);
      }
    } catch (e: unknown) {
      console.error(e);
      setError(e instanceof Error ? `Falha ao gerar conteúdo: ${e.message}` : 'Ocorreu um erro desconhecido.');
      setQuizState(QuizState.IDLE);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAnswerSelect = (answer: string | boolean) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setUserAnswers(newAnswers);
  };

  // FIX: Use a type guard on the question data to determine which card component to render.
  // This resolves the type error and makes the rendering logic more robust against changes in study modes.
  const renderQuizContent = () => {
    if (!Array.isArray(generatedContent) || generatedContent.length === 0) return null;

    const currentQuestion = generatedContent[currentQuestionIndex];
    const isMcqItem = (item: McqItem | TrueFalseItem): item is McqItem => 'options' in item;
    
    return (
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6 text-slate-100">{topic}</h2>
        { isMcqItem(currentQuestion) ? (
          <McqCard
            item={currentQuestion}
            userAnswer={userAnswers[currentQuestionIndex] as string | null}
            onAnswer={handleAnswerSelect}
          />
        ) : (
          <TrueFalseCard
            item={currentQuestion}
            userAnswer={userAnswers[currentQuestionIndex] as boolean | null}
            onAnswer={handleAnswerSelect}
          />
        )}
        <QuizNavigation
          currentIndex={currentQuestionIndex}
          totalQuestions={generatedContent.length}
          goToNext={() => setCurrentQuestionIndex(i => Math.min(i + 1, generatedContent.length - 1))}
          goToPrevious={() => setCurrentQuestionIndex(i => Math.max(i - 1, 0))}
          finishQuiz={() => setQuizState(QuizState.COMPLETED)}
        />
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) return <LoadingSpinner />;
    if (error) return <div className="text-center text-red-400 bg-red-900 bg-opacity-50 p-4 rounded-lg">{error}</div>;

    switch (quizState) {
      case QuizState.IN_PROGRESS:
        return renderQuizContent();
      case QuizState.COMPLETED:
        return (
          <div className="w-full max-w-4xl mx-auto">
             <QuizSummary
                items={generatedContent as Array<McqItem | TrueFalseItem>}
                userAnswers={userAnswers}
                onRestart={restartQuiz}
                sources={sources}
            />
          </div>
        );
      case QuizState.IDLE:
      default:
        if (typeof generatedContent === 'string') {
          return (
             <div className="w-full max-w-4xl mx-auto">
                <ExplanationCard explanation={generatedContent} />
             </div>
          );
        }
        return (
          <ExamSelection onSelectTopic={(selectedTopic, difficulty) => handleGenerate(selectedTopic, difficulty, StudyMode.MCQ)} />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col p-4 sm:p-6 font-sans">
      <main className="w-full flex-grow flex items-center justify-center">
         {renderContent()}
      </main>
      <Footer />
    </div>
  );
}
