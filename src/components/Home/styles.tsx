import styled from "styled-components";
import QuizLogo from "../../assets/quiz.jpg";

export const MainHome = styled.main`
  flex: 1;
  width: 60%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
`;

export const MainGameOver = styled.main`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

export const SectionGameOver = styled.section`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
`;

export const SectionHome = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Logo = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background-image: url(${QuizLogo});
  background-size: cover;
  margin: 0 auto;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.label`
  font-weight: 600;
  color: #13193e;
  font-size: 1.1rem;
`;

export const Select = styled.select`
  padding: 0.5rem;
  border: none;
  border-radius: 8px;
  color: #212955;
  font-weight: 600;
  :focus {
    box-shadow: inset 0 0 0 3px #212955;
  }
`;

export const Alert = styled.div`
  background-color: #9b0000;
  color: white;
  padding: 1rem;
  border-radius: 8px;
`;

export const Button = styled.button`
  align-self: center;
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

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;
