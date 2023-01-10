import { QuestionType } from "../../interfaces/QuizType";
import { decode } from "html-entities";
import {
  Container,
  Main,
  DifficultyQuestion,
  NumberQuestion,
  Answer,
  QuestionStyled,
} from "./styles";

type QuestionProps = {
  question: QuestionType;
  currentQuestion: number;
};

const Question = ({ question, currentQuestion }: QuestionProps) => {
  const { difficulty, question: q, correct_answer } = question;
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
      <Answer>{correct_answer}</Answer>
    </Main>
  );
};

export default Question;
