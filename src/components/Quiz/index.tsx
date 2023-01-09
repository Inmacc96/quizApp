import { useState } from "react";
import { Main, Logo, Button } from "./styles";
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

  return (
    <Main>
      <Logo />
      <Button onClick={getQuiz}>Start</Button>
    </Main>
  );
};

export default Quiz;
