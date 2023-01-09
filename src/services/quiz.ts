import axios from "axios";
import { ResponseQuiz, Result } from "../interfaces/QuizType";

export const getApiQuiz = async () => {
  const url = "https://opentdb.com/api.php?amount=10";
  const {
    data: { results },
  } = await axios.get<ResponseQuiz>(url);

  return mapfromApiQuiz(results);
};

export const mapfromApiQuiz = (quiz: Result[]) => {
  return quiz.map((q) => ({
    question: q.question,
    correct_answer: q.correct_answer,
    incorrect_answers: q.incorrect_answers,
  }));
};
