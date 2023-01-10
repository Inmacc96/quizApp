import styled from "styled-components";
import { Difficulty } from "../../interfaces/QuizType";

export const Main = styled.main`
  border: 2.5px solid #13193e;
  border-radius: 20px;
  width: 30%;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.2rem;
`;

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const NumberQuestion = styled.div`
  background-color: #13193e;
  color: #fff;
  font-size: 20px;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
`;

export const DifficultyQuestion = styled.div<{ difficulty: Difficulty }>`
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  color: #fff;
  background-color: ${(props) =>
    props.difficulty === "easy"
      ? "#108407"
      : props.difficulty === "medium"
      ? "#ECA919"
      : "#A41910"};
`;

export const QuestionStyled = styled.p`
  font-size: 1.2rem;
  font-weight: 800;
`;

export const Answer = styled.button`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 20px;
  font-weight: 700;
  color: #000;
  background-color: #dcd8d1;
  cursor: pointer;
  :hover {
    background-color: #bbbab8;
  }
`;
