import { useState } from "react";
import { Main, Logo, Button } from "./styles";
import { ResponseQuiz, QuizType } from "../../interfaces/QuizType";
import axios from "axios";

const Quiz = () => {
  const [quiz, setQuiz] = useState<QuizType[]>([]);
  const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);

  const getQuiz = async () => {
    try {
      setIsLoadingQuiz(true);
      const url = "https://opentdb.com/api.php?amount=10";
      const {
        data: { results },
      } = await axios.get<ResponseQuiz>(url);

      const quizFromApi = results.map((q) => ({
        question: q.question,
        correct_answer: q.correct_answer,
        incorrect_answers: q.incorrect_answers,
      }));

      setQuiz(quizFromApi);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoadingQuiz(false);
    }
  };

  return (
    <Main>
      <Logo />
      <Button onClick={getQuiz}>Start</Button>
    </Main>
  );
};

export default Quiz;
