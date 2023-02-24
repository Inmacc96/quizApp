import { describe, test, vi, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Question from ".";
import { Difficulty, FiltersQuiz } from "../../interfaces/QuizType";
import { decode } from "html-entities";
import helpers from "../../helpers";

describe("<Question />", () => {
  test("renders correctly", () => {
    const currentQuestion = 1;
    const question = {
      question:
        "Which anime heavily features music from the genre &quot;Eurobeat&quot;?",
      correct_answer: "Initial D",
      incorrect_answers: ["Wangan Midnight", "Kino no Tabi", "Cowboy Bebop"],
      difficulty: Difficulty.Easy,
    };
    const updateScore = vi.fn();
    const nextQuestion = vi.fn();
    const filtersQuiz: FiltersQuiz = {
      n_questions: "10",
      difficulty: "",
      type: "",
      categories: "",
    };

    const component = render(
      <Question
        question={question}
        currentQuestion={currentQuestion}
        updateScore={updateScore}
        nextQuestion={nextQuestion}
        filtersQuiz={filtersQuiz}
      />
    );

    component.getByText("Question");
    component.getByText(currentQuestion);
    component.getByText(decode(question.question));
    component.getByText(question.correct_answer);
    component.getByText(question.incorrect_answers[0]);
    component.getByText(question.difficulty);
  });

  test("clicking on an answer, the button is disabled", async () => {
    const user = userEvent.setup();

    const currentQuestion = 1;
    const question = {
      question:
        "Which anime heavily features music from the genre &quot;Eurobeat&quot;?",
      correct_answer: "Initial D",
      incorrect_answers: ["Wangan Midnight", "Kino no Tabi", "Cowboy Bebop"],
      difficulty: Difficulty.Easy,
    };
    const updateScore = vi.fn();
    const nextQuestion = vi.fn();
    const filtersQuiz: FiltersQuiz = {
      n_questions: "10",
      difficulty: "",
      type: "",
      categories: "",
    };

    const component = render(
      <Question
        question={question}
        currentQuestion={currentQuestion}
        updateScore={updateScore}
        nextQuestion={nextQuestion}
        filtersQuiz={filtersQuiz}
      />
    );

    const answerButton = component.getByText(question.correct_answer);
    expect(answerButton).not.toBeDisabled();

    await user.click(answerButton);

    const disabledAnswerButton = component.getByText(question.correct_answer);
    expect(disabledAnswerButton).toBeDisabled();
  });

  test("clicking on the correct answer, updateScore is called once", async () => {
    const user = userEvent.setup();

    const currentQuestion = 1;
    const question = {
      question:
        "Which anime heavily features music from the genre &quot;Eurobeat&quot;?",
      correct_answer: "Initial D",
      incorrect_answers: ["Wangan Midnight", "Kino no Tabi", "Cowboy Bebop"],
      difficulty: Difficulty.Easy,
    };
    const updateScore = vi.fn();
    const nextQuestion = vi.fn();
    const filtersQuiz: FiltersQuiz = {
      n_questions: "10",
      difficulty: "",
      type: "",
      categories: "",
    };

    const component = render(
      <Question
        question={question}
        currentQuestion={currentQuestion}
        updateScore={updateScore}
        nextQuestion={nextQuestion}
        filtersQuiz={filtersQuiz}
      />
    );

    const correctAnswerButton = component.getByText(question.correct_answer);
    await user.click(correctAnswerButton);

    expect(updateScore).toHaveBeenCalledTimes(1);
  });

  test("clicking on a wrong answer, updateScore is not called", async () => {
    const user = userEvent.setup();

    const currentQuestion = 1;
    const question = {
      question:
        "Which anime heavily features music from the genre &quot;Eurobeat&quot;?",
      correct_answer: "Initial D",
      incorrect_answers: ["Wangan Midnight", "Kino no Tabi", "Cowboy Bebop"],
      difficulty: Difficulty.Easy,
    };
    const updateScore = vi.fn();
    const nextQuestion = vi.fn();
    const filtersQuiz: FiltersQuiz = {
      n_questions: "10",
      difficulty: "",
      type: "",
      categories: "",
    };

    const component = render(
      <Question
        question={question}
        currentQuestion={currentQuestion}
        updateScore={updateScore}
        nextQuestion={nextQuestion}
        filtersQuiz={filtersQuiz}
      />
    );

    const wrongAnswerButton = component.getByText(
      question.incorrect_answers[0]
    );
    await user.click(wrongAnswerButton);

    expect(updateScore).toHaveBeenCalledTimes(0);
  });

  test("clicking on an answer, the next button appears", async () => {
    const user = userEvent.setup();

    const currentQuestion = 1;
    const question = {
      question:
        "Which anime heavily features music from the genre &quot;Eurobeat&quot;?",
      correct_answer: "Initial D",
      incorrect_answers: ["Wangan Midnight", "Kino no Tabi", "Cowboy Bebop"],
      difficulty: Difficulty.Easy,
    };
    const updateScore = vi.fn();
    const nextQuestion = vi.fn();
    const filtersQuiz: FiltersQuiz = {
      n_questions: "10",
      difficulty: "",
      type: "",
      categories: "",
    };

    const component = render(
      <Question
        question={question}
        currentQuestion={currentQuestion}
        updateScore={updateScore}
        nextQuestion={nextQuestion}
        filtersQuiz={filtersQuiz}
      />
    );

    const correctAnswerButton = component.getByText(question.correct_answer);
    await user.click(correctAnswerButton);

    const btnNext = component.getByTestId("next-button");
    expect(btnNext).toBeInTheDocument();
  });

  test("clicking on next button, nextQuestion is called one", async () => {
    const user = userEvent.setup();

    const currentQuestion = 1;
    const question = {
      question:
        "Which anime heavily features music from the genre &quot;Eurobeat&quot;?",
      correct_answer: "Initial D",
      incorrect_answers: ["Wangan Midnight", "Kino no Tabi", "Cowboy Bebop"],
      difficulty: Difficulty.Easy,
    };
    const updateScore = vi.fn();
    const nextQuestion = vi.fn();
    const filtersQuiz: FiltersQuiz = {
      n_questions: "10",
      difficulty: "",
      type: "",
      categories: "",
    };

    const component = render(
      <Question
        question={question}
        currentQuestion={currentQuestion}
        updateScore={updateScore}
        nextQuestion={nextQuestion}
        filtersQuiz={filtersQuiz}
      />
    );

    const AnswerButton = component.getByText(question.incorrect_answers[0]);
    await user.click(AnswerButton);

    const btnNext = component.getByTestId("next-button");
    await user.click(btnNext);

    expect(nextQuestion).toBeCalledTimes(1);
  });

  test("clicking on an answer in question 10, the end button appears", async () => {
    const user = userEvent.setup();

    const currentQuestion = 10;
    const question = {
      question:
        "Which anime heavily features music from the genre &quot;Eurobeat&quot;?",
      correct_answer: "Initial D",
      incorrect_answers: ["Wangan Midnight", "Kino no Tabi", "Cowboy Bebop"],
      difficulty: Difficulty.Easy,
    };
    const updateScore = vi.fn();
    const nextQuestion = vi.fn();
    const filtersQuiz: FiltersQuiz = {
      n_questions: "10",
      difficulty: "",
      type: "",
      categories: "",
    };

    const component = render(
      <Question
        question={question}
        currentQuestion={currentQuestion}
        updateScore={updateScore}
        nextQuestion={nextQuestion}
        filtersQuiz={filtersQuiz}
      />
    );

    const correctAnswerButton = component.getByText(question.correct_answer);
    await user.click(correctAnswerButton);

    const btnEnd = component.getByTestId("next-button");
    expect(btnEnd).toBeInTheDocument();
    expect(btnEnd.textContent).toBe("End");
    expect(btnEnd.textContent).not.toBe("Next");
  });

  test("the function unOrderAnswers is called when the component is rendered", async () => {
    const currentQuestion = 1;
    const question = {
      question:
        "Which anime heavily features music from the genre &quot;Eurobeat&quot;?",
      correct_answer: "Initial D",
      incorrect_answers: ["Wangan Midnight", "Kino no Tabi", "Cowboy Bebop"],
      difficulty: Difficulty.Easy,
    };
    const updateScore = vi.fn();
    const nextQuestion = vi.fn();

    const filtersQuiz: FiltersQuiz = {
      n_questions: "10",
      difficulty: "",
      type: "",
      categories: "",
    };

    const unsortAnswersSpy = vi.spyOn(helpers, "unsortAnswers");

    const component = render(
      <Question
        question={question}
        currentQuestion={currentQuestion}
        updateScore={updateScore}
        nextQuestion={nextQuestion}
        filtersQuiz={filtersQuiz}
      />
    );

    expect(unsortAnswersSpy).toHaveBeenCalled();

    const expectedAnswers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ];
    const messyAnswers = unsortAnswersSpy.mock.results[0].value;

    expect(messyAnswers).toHaveLength(expectedAnswers.length);
    expect(messyAnswers).toEqual(expect.arrayContaining(expectedAnswers));

    unsortAnswersSpy.mockRestore();
  });
});
