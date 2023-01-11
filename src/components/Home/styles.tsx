import styled from "styled-components";
import QuizLogo from "../../assets/quiz.jpg";

export const Main = styled.main`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

export const Logo = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-image: url(${QuizLogo});
  background-size: cover;
`;

export const Button = styled.button`
  padding: 1rem 2rem;
  text-transform: uppercase;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #212955;
  color: #fff;
  transition-property: background-color;
  transition-duration: 2s;

  :hover {
    background-color: #13193e;
  }
`;

export const ScoreContainer = styled.div`
  padding: 3rem 4rem;
  border-radius: 20px;
  background-color: #dcd8d1;
  font-size: 21px;
  color: #212955;
  font-weight: 600;
  text-align: center;
  span {
    font-size: 35px;
    display: block;
    margin-top: 1.6rem;
  }
`;
