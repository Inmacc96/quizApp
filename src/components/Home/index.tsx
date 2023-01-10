import { Button, Logo, Main } from "./styles";

type HomeProps = {
  getQuiz: () => Promise<void>;
};

const Home = ({ getQuiz }: HomeProps) => {
  return (
    <Main>
      <Logo />
      <Button onClick={getQuiz}>Start</Button>
    </Main>
  );
};

export default Home;
