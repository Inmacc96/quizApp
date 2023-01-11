import { Button, Logo, Main, ScoreContainer } from "./styles";

type HomeProps = {
  getQuiz: () => Promise<void>;
  gameOver: boolean;
  score: number;
};

const Home = ({ getQuiz, gameOver, score }: HomeProps) => {
  return (
    <Main>
      {gameOver ? (
        <>
          <ScoreContainer>
            <p>
              Your score is <br/>
              <span>{score}/10</span>
            </p>
          </ScoreContainer>
          <Button>Play Again</Button>
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
