import { useState } from "react";
import Home from "../Home";
import { QuizType } from "../../interfaces/QuizType";
import { getApiQuiz } from "../../services/quiz";
import Loading from "../Loading";

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

  return (
    <>
      {isLoadingQuiz ? (
        <Loading />
      ) : quiz.length > 0 ? (
        // <Question />
        <p>The questions are now available</p>
      ) : (
        <Home getQuiz={getQuiz} />
      )}
    </>
  );
};

export default Quiz;
