import { Button, Logo, Main } from "./styles";

type HomeProps = {
  getQuiz: () => Promise<void>;
  gameOver: boolean;
};

const Home = ({ getQuiz, gameOver }: HomeProps) => {
  return (
    <Main>
      {gameOver ? (
        <Button>Play Again</Button>
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
