export interface ResponseQuiz {
  response_code: number;
  results: Result[];
}

export interface Result {
  category: string;
  type: Type;
  difficulty: Difficulty;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export enum Difficulty {
  Easy = "easy",
  Hard = "hard",
  Medium = "medium",
}

export enum Type {
  Boolean = "boolean",
  Multiple = "multiple",
}

export interface QuestionType {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  difficulty: Difficulty;
}

export interface UserAnswerType {
  question: string;
  answerselected: string;
  correctAnswer: string;
}

export interface FiltersQuiz {
  n_questions: string;
  difficulty: Difficulty | "";
  type: Type | "";
  categories: string;
}
