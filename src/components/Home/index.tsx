import ConfettiExplosion from "react-confetti-explosion";
import {
  DIFFICULTY,
  TYPE_QUIZ,
  CATEGORIES,
  N_QUESTIONS,
} from "../../constants";
import { FiltersQuiz } from "../../interfaces/QuizType";
import {
  Button,
  ButtonsContainer,
  Logo,
  ScoreContainer,
  Select,
  Alert,
  MainGameOver,
  MainHome,
  SectionHome,
  FilterContainer,
  Label,
  SectionGameOver,
} from "./styles";

type HomeProps = {
  filtersQuiz: FiltersQuiz;
  selectFilters: (value: FiltersQuiz) => void;
  alert: string;
  getQuiz: () => Promise<void>;
  gameOver: boolean;
  score: number;
  playAgain: () => void;
  backHome: () => void;
};

const Home = ({
  filtersQuiz,
  selectFilters,
  alert,
  getQuiz,
  gameOver,
  score,
  playAgain,
  backHome,
}: HomeProps) => {
  const { n_questions, difficulty, type, categories } = filtersQuiz;

  const handleChangeSelectFilters = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    selectFilters({ ...filtersQuiz, [e.target.name]: e.target.value });
  };

  return (
    <>
      {gameOver ? (
        <MainGameOver>
          <SectionGameOver>
            <ScoreContainer>
              <ConfettiExplosion duration={3000} particleCount={250} />
              <p>
                Your score is <br />
                <span>
                  {score}/{n_questions}
                </span>
              </p>
            </ScoreContainer>
            <ButtonsContainer>
              <Button onClick={playAgain}>Play Again</Button>
              <Button onClick={backHome}>Back Home</Button>
            </ButtonsContainer>
          </SectionGameOver>
        </MainGameOver>
      ) : (
        <MainHome>
          <Logo />
          <SectionHome>
            <FilterContainer>
              <Label htmlFor="n_questions"> Number Questions</Label>
              <Select
                id="n_questions"
                name="n_questions"
                value={n_questions}
                onChange={handleChangeSelectFilters}
              >
                {N_QUESTIONS.map((number) => (
                  <option key={number.value} value={number.value}>
                    {number.label}
                  </option>
                ))}
              </Select>
            </FilterContainer>
            <FilterContainer>
              <Label htmlFor="difficulty"> Nivel Difficulty</Label>
              <Select
                id="difficulty"
                name="difficulty"
                value={difficulty}
                onChange={handleChangeSelectFilters}
              >
                {DIFFICULTY.map((dif) => (
                  <option key={dif.value} value={dif.value}>
                    {dif.label}
                  </option>
                ))}
              </Select>
            </FilterContainer>
            <FilterContainer>
              <Label htmlFor="type"> Type Question</Label>
              <Select
                id="type"
                name="type"
                value={type}
                onChange={handleChangeSelectFilters}
              >
                {TYPE_QUIZ.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>
            </FilterContainer>
            <FilterContainer>
              <Label htmlFor="categories">Category</Label>
              <Select
                id="categories"
                name="categories"
                value={categories}
                onChange={handleChangeSelectFilters}
              >
                {CATEGORIES.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </Select>
            </FilterContainer>

            {alert && <Alert>{alert}</Alert>}
            <Button onClick={getQuiz}>Start</Button>
          </SectionHome>
        </MainHome>
      )}
    </>
  );
};

export default Home;
