import { DIFFICULTY } from "../../constants";
import {
  Button,
  ButtonsContainer,
  Logo,
  Main,
  ScoreContainer,
  Select,
} from "./styles";

type HomeProps = {
  difficulty: string;
  selectDifficulty: (value: string) => void;
  getQuiz: () => Promise<void>;
  gameOver: boolean;
  score: number;
  playAgain: () => void;
  backHome: () => void;
};

const Home = ({
  difficulty,
  selectDifficulty,
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
          <Select value={difficulty} onChange={handleChangeSelectDifficulty}>
            {DIFFICULTY.map((dif) => (
              <option key={dif.value} value={dif.value}>
                {dif.label}
              </option>
            ))}
          </Select>
          <Button onClick={getQuiz}>Start</Button>
        </>
      )}
    </Main>
  );
};

export default Home;
