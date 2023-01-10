import { useState } from "react";
import Home from "../Home";
import { QuizType } from "../../interfaces/QuizType";
import { getApiQuiz } from "../../services/quiz";

const Quiz = () => {
  const [quiz, setQuiz] = useState<QuizType[]>([]);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);

  const getQuiz = async () => {
    try {
      setIsLoadingQuiz(true);
      const quizFromApi = await getApiQuiz();
      setQuiz(quizFromApi);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingQuiz(false);
    }
  };

  return <Home getQuiz={getQuiz} />;
};

export default Quiz;
