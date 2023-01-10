import { QuestionType, AnswerType } from "../../interfaces/QuizType";
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
} from "./styles";

type QuestionProps = {
  question: QuestionType;
  currentQuestion: number;
};

const Question = ({ question, currentQuestion }: QuestionProps) => {
  const {
    difficulty,
    question: q,
    correct_answer,
    incorrect_answers,
  } = question;

  const [answers, setAnswers] = useState<AnswerType[]>([]);

  useEffect(() => {
    const incorrectAnswers = incorrect_answers.map((a) => {
      return { answer: a, isCorrect: false };
    });

    // Añadir la correcta y desordenar las respuestas
    const messyAnswers = [
      ...incorrectAnswers,
      { answer: correct_answer, isCorrect: true },
    ].sort(() => Math.random() - 0.5);

    setAnswers(messyAnswers);
  }, []);

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
          <Answer>{ans.answer}</Answer>
        ))}
      </AnswersContainer>
    </Main>
  );
};

export default Question;
