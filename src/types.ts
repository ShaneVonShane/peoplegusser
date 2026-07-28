export type GameMode = 'classic' | 'timeattack' | 'streak';

export interface Stranger {
  id: string;
  name: string;
  photoUrl: string;
  gender?: 'male' | 'female' | 'any';
  occupation?: string;
  origin?: string;
  funFact?: string;
  category?: string;
  isCustom?: boolean;
}

export interface Question {
  stranger: Stranger;
  options: string[]; // 4 name choices
  correctAnswer: string;
}

export interface RoundAnswer {
  question: Question;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpentMs: number;
}

export interface GameState {
  status: 'title' | 'playing' | 'round_feedback' | 'gameover';
  mode: GameMode;
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  streak: number;
  maxStreak: number;
  timeRemaining: number; // for time attack
  timeLimit?: number;
  answers: RoundAnswer[];
  hintUsed: boolean;
  startTime: number;
}

export interface PlayerStats {
  gamesPlayed: number;
  totalCorrect: number;
  totalQuestions: number;
  highScoreClassic: number;
  highScoreTimeAttack: number;
  highScoreStreak: number;
  maxStreakEver: number;
}
