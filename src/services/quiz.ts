import axios from "axios";
import { ResponseQuiz, Result } from '../interfaces/QuizType';

export const getApiQuiz = async (url: string) => {
  const {
    data: { results, response_code },
  } = await axios.get<ResponseQuiz>(url);

  return {response_code, results: mapfromApiQuiz(results)};
};

export const mapfromApiQuiz = (quiz: Result[]) => {
  return quiz.map((q) => ({
    question: q.question,
    correct_answer: q.correct_answer,
    incorrect_answers: q.incorrect_answers,
    difficulty: q.difficulty
  }));
};
