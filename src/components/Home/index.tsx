import { DIFFICULTY, TYPE_QUIZ } from "../../constants";
import {
  Button,
  ButtonsContainer,
  Logo,
  Main,
  ScoreContainer,
  Select,
  FiltersContainer
} from "./styles";

type HomeProps = {
  difficulty: string;
  selectDifficulty: (value: string) => void;
  typeQuiz: string;
  selectTypeQuiz: (value: string) => void;
  getQuiz: () => Promise<void>;
  gameOver: boolean;
  score: number;
  playAgain: () => void;
  backHome: () => void;
};

const Home = ({
  difficulty,
  selectDifficulty,
  typeQuiz,
  selectTypeQuiz,
  getQuiz,
  gameOver,
  score,
  playAgain,
  backHome,
}: HomeProps) => {
  const handleChangeSelectDifficulty = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    selectDifficulty(e.target.value);
  };

  const handleChangeSelectTypeQuiz = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    selectTypeQuiz(e.target.value);
  };

  return (
    <Main>
      {gameOver ? (
        <>
          <ScoreContainer>
            <p>
              Your score is <br />
              <span>{score}/10</span>
            </p>
          </ScoreContainer>
          <ButtonsContainer>
            <Button onClick={playAgain}>Play Again</Button>
            <Button onClick={backHome}>Back Home</Button>
          </ButtonsContainer>
        </>
      ) : (
        <>
          <Logo />
          <FiltersContainer>
            <Select value={difficulty} onChange={handleChangeSelectDifficulty}>
              {DIFFICULTY.map((dif) => (
                <option key={dif.value} value={dif.value}>
                  {dif.label}
                </option>
              ))}
            </Select>
            <Select value={typeQuiz} onChange={handleChangeSelectTypeQuiz}>
              {TYPE_QUIZ.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
          </FiltersContainer>
          <Button onClick={getQuiz}>Start</Button>
        </>
      )}
    </Main>
  );
};

export default Home;
