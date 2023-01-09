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

export interface QuizType {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
