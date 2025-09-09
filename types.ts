export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export enum StudyMode {
  MCQ = 'MCQ',
  TRUE_FALSE = 'TRUE_FALSE',
  EXPLAINER = 'EXPLAINER',
  WEB_GROUNDED = 'WEB_GROUNDED',
}

export enum QuizState {
  IDLE = 'IDLE',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export interface McqItem {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface TrueFalseItem {
  question: string;
  answer: boolean;
  explanation: string;
}

// FIX: Make web property optional to match Gemini API response type.
export interface GroundingChunk {
  web?: {
    uri?: string;
    title?: string;
  };
}
