import {
  QuestionType,
  UserAnswerType,
  FiltersQuiz,
} from "../../interfaces/QuizType";
import { decode } from "html-entities";
import { useEffect, useRef, useState } from "react";
import helpers from "../../helpers";
import {
  Container,
  Main,
  DifficultyQuestion,
  NumberQuestion,
  Answer,
  QuestionStyled,
  AnswersContainer,
  ProgressContainer,
  Progress,
  NextButton,
  Section,
} from "./styles";

type QuestionProps = {
  question: QuestionType;
  currentQuestion: number;
  updateScore: () => void;
  nextQuestion: () => void;
  filtersQuiz: FiltersQuiz;
};

const Question = ({
  question,
  currentQuestion,
  updateScore,
  nextQuestion,
  filtersQuiz,
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
  const [progress, setProgress] = useState<number>(100);
  const currentProgressRef = useRef<number>(progress);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);

  useEffect(() => {
    currentProgressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const id = setInterval(() => {
      if (currentProgressRef.current !== 0) {
        setProgress((prevProgress) => prevProgress - 20);
      }
    }, 1000);

    setIntervalId(id);

    return () => clearInterval(id);
  }, [question]);

  useEffect(() => {
    if (progress === 0) {
      setisClicked(true);
      const userNoResponse = {
        question: q,
        answerselected: "",
        correctAnswer: correct_answer,
      };

      setUserAnswer(userNoResponse);
      intervalId && clearInterval(intervalId);
    }
  }, [progress]);

  useEffect(() => {
    // Añadir la correcta y desordenar las respuestas
    const messyAnswers = helpers.unsortAnswers([
      ...incorrect_answers,
      correct_answer,
    ]);

    setAnswers(messyAnswers);
    setProgress(100);
  }, [question]);

  const handleClickAnswer = (answer: string): void => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

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
      <Section>
        <Container>
          <NumberQuestion>{currentQuestion}</NumberQuestion>
          <h2>Question</h2>
          <DifficultyQuestion difficulty={difficulty}>
            {difficulty}
          </DifficultyQuestion>
        </Container>
        <QuestionStyled>{decode(q)}</QuestionStyled>

        <AnswersContainer>
          {answers.map((ans, i) => (
            <Answer
              data-testid={`response ${i}`}
              key={Math.random().toString(36).substring(2)}
              isClicked={isClicked}
              userClicked={userAnswer.answerselected === ans}
              isCorrect={userAnswer.correctAnswer === ans}
              onClick={() => handleClickAnswer(ans)}
              disabled={!!userAnswer.answerselected || progress === 0}
            >
              {decode(ans)}
            </Answer>
          ))}
        </AnswersContainer>

        {progress !== 0 && !userAnswer.answerselected ? (
          <ProgressContainer data-testid="progress-bar">
            <Progress progress={progress} />
          </ProgressContainer>
        ) : (
          <NextButton data-testid="next-button" onClick={handleClickNext}>
            {currentQuestion === +filtersQuiz.n_questions ? "End" : "Next"}
          </NextButton>
        )}
      </Section>
    </Main>
  );
};

export default Question;
