import { QuestionType, UserAnswerType } from "../../interfaces/QuizType";
import { decode } from "html-entities";
import { useEffect, useState } from "react";
import {
  Container,
  Main,
  DifficultyQuestion,
  NumberQuestion,
  Answer,
  QuestionStyled,
  AnswersContainer,
  NextButton,
} from "./styles";

type QuestionProps = {
  question: QuestionType;
  currentQuestion: number;
  updateScore: () => void;
  nextQuestion: () => void;
};

const Question = ({
  question,
  currentQuestion,
  updateScore,
  nextQuestion,
}: QuestionProps) => {
  const {
    difficulty,
    question: q,
    correct_answer,
    incorrect_answers,
  } = question;

  const [answers, setAnswers] = useState<string[]>([]);
  const [userAnswer, setUserAnswer] = useState<UserAnswerType>(
    {} as UserAnswerType
  );
  const [isClicked, setisClicked] = useState<boolean>(false);

  useEffect(() => {
    // Añadir la correcta y desordenar las respuestas
    const messyAnswers = [...incorrect_answers, correct_answer].sort(
      () => Math.random() - 0.5
    );

    setAnswers(messyAnswers);
  }, [question]);

  const handleClickAnswer = (answer: string): void => {
    setisClicked(true);
    const userAnswerUpdated = {
      question: q,
      answerselected: answer,
      correctAnswer: correct_answer,
    };

    setUserAnswer(userAnswerUpdated);

    // Sumar el score si ha acertado
    if (userAnswerUpdated.answerselected === userAnswerUpdated.correctAnswer) {
      updateScore();
    }
  };

  const handleClickNext = () => {
    setisClicked(false);
    setUserAnswer({} as UserAnswerType);
    nextQuestion();
  };

  return (
    <Main>
      <Container>
        <NumberQuestion>{currentQuestion}</NumberQuestion>
        <h2>Question</h2>
        <DifficultyQuestion difficulty={difficulty}>
          {difficulty}
        </DifficultyQuestion>
      </Container>
      <QuestionStyled>{decode(q)}</QuestionStyled>

      <AnswersContainer>
        {answers.map((ans) => (
          <Answer
            key={Math.random().toString(36).substring(2)}
            isClicked={isClicked}
            userClicked={userAnswer.answerselected === ans}
            isCorrect={userAnswer.correctAnswer === ans}
            onClick={() => handleClickAnswer(ans)}
            disabled={!!userAnswer.answerselected}
          >
            {decode(ans)}
          </Answer>
        ))}
      </AnswersContainer>
      {userAnswer.answerselected && (
        <NextButton onClick={handleClickNext}> Next</NextButton>
      )}
    </Main>
  );
};

export default Question;
