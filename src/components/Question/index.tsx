import { QuestionType } from "../../interfaces/QuizType";

type QuestionProps = {
  question: QuestionType;
  currentQuestion: number;
};

const Question = ({ question, currentQuestion }: QuestionProps) => {
  console.log(question);
  return <div>Question</div>;
};

export default Question;
