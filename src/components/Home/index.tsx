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
  Main,
  ScoreContainer,
  Select,
  FiltersContainer,
} from "./styles";

type HomeProps = {
  filtersQuiz: FiltersQuiz;
  selectFilters: (value: FiltersQuiz) => void;
  getQuiz: () => Promise<void>;
  gameOver: boolean;
  score: number;
  playAgain: () => void;
  backHome: () => void;
};

const Home = ({
  filtersQuiz,
  selectFilters,
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
    <Main>
      {gameOver ? (
        <>
          <ScoreContainer>
            <p>
              Your score is <br />
              <span>{score}/{n_questions}</span>
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
            <Select
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
            <Select
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
            <Select
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
            <Select
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
          </FiltersContainer>
          <Button onClick={getQuiz}>Start</Button>
        </>
      )}
    </Main>
  );
};

export default Home;
