import { useState } from "react";
import Home from "../Home";
import { QuestionType } from "../../interfaces/QuizType";
import { getApiQuiz } from "../../services/quiz";
import Loading from "../Loading";
import Question from "../Question";

const Quiz = () => {
  const [quiz, setQuiz] = useState<QuestionType[]>([]);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);
  const [question, setQuestion] = useState<QuestionType>({} as QuestionType);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState<number>(0);

  const getQuiz = async () => {
    try {
      setIsLoadingQuiz(true);
      const quizFromApi = await getApiQuiz();
      setQuiz(quizFromApi);
      setQuestion(quizFromApi[0]);
      setCurrentQuestion(1);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingQuiz(false);
    }
  };

  const updateScore = () => {
    setScore(score + 1);
  };

  return (
    <>
      {isLoadingQuiz ? (
        <Loading />
      ) : quiz.length > 0 ? (
        <Question
          question={question}
          currentQuestion={currentQuestion}
          updateScore={updateScore}
        />
      ) : (
        <Home getQuiz={getQuiz} />
      )}
    </>
  );
};

export default Quiz;
