export interface Student {
  _id: string;
  name: string;
  therapistId: string;
  createdAt: string;
}

export interface Session {
  _id: string;
  studentId: string;
  therapistId: string;
  date: string;
  correctAnswers: number;
  totalAnswers: number;
  percentage: number;
  notes: string;
  gameData: any;
}

export interface GameState {
  currentPlayer: 'therapist' | 'student';
  score: number;
  currentWord: string;
  options: string[];
}
