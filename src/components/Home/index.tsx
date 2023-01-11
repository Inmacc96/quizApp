import { Button, ButtonsContainer, Logo, Main, ScoreContainer } from "./styles";

type HomeProps = {
  getQuiz: () => Promise<void>;
  gameOver: boolean;
  score: number;
  playAgain: () => void;
  backHome: () => void;
};

const Home = ({ getQuiz, gameOver, score, playAgain, backHome }: HomeProps) => {
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
          <Button onClick={getQuiz}>Start</Button>
        </>
      )}
    </Main>
  );
};

export default Home;
