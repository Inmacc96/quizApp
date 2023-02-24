import { useEffect, useState } from "react";
import Home from "../Home";
import { FiltersQuiz, QuestionType } from "../../interfaces/QuizType";
import { getApiQuiz } from "../../services/quiz";
import Loading from "../Loading";
import Question from "../Question";

const Quiz = () => {
  const [filtersQuiz, setFiltersQuiz] = useState<FiltersQuiz>({
    difficulty: "",
    type: "",
  });
  const [quiz, setQuiz] = useState<QuestionType[]>([]);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);
  const [question, setQuestion] = useState<QuestionType>({} as QuestionType);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    if (currentQuestion > 1) {
      setQuestion(quiz[currentQuestion - 1]);
    }
  }, [currentQuestion]);

  const selectFilters = (value: FiltersQuiz) => {
    setFiltersQuiz(value);
  };

  const getQuiz = async () => {
    try {
      setIsLoadingQuiz(true);

      const url = `https://opentdb.com/api.php?amount=10${
        filtersQuiz.difficulty !== ""
          ? `&difficulty=${filtersQuiz.difficulty}`
          : ""
      }${filtersQuiz.type !== "" ? `&type=${filtersQuiz.type}` : ""}`;
      const quizFromApi = await getApiQuiz(url);
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

  const nextQuestion = () => {
    if (currentQuestion < 10) {
      setCurrentQuestion(currentQuestion + 1);
    }
    if (currentQuestion === 10) {
      setGameOver(true);
      setQuiz([]);
      setQuestion({} as QuestionType);
      setCurrentQuestion(0);
    }
  };

  const playAgain = () => {
    setScore(0);
    setGameOver(false);
    getQuiz();
  };

  const backHome = () => {
    setScore(0);
    setGameOver(false);
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
          nextQuestion={nextQuestion}
        />
      ) : (
        <Home
          filtersQuiz={filtersQuiz}
          selectFilters={selectFilters}
          getQuiz={getQuiz}
          gameOver={gameOver}
          score={score}
          playAgain={playAgain}
          backHome={backHome}
        />
      )}
    </>
  );
};

export default Quiz;
