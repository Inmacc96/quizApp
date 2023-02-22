import { describe, test, vi, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Question from ".";
import { Difficulty } from "../../interfaces/QuizType";
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

    const component = render(
      <Question
        question={question}
        currentQuestion={currentQuestion}
        updateScore={updateScore}
        nextQuestion={nextQuestion}
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

    const component = render(
      <Question
        question={question}
        currentQuestion={currentQuestion}
        updateScore={updateScore}
        nextQuestion={nextQuestion}
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

    const component = render(
      <Question
        question={question}
        currentQuestion={currentQuestion}
        updateScore={updateScore}
        nextQuestion={nextQuestion}
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

    const component = render(
      <Question
        question={question}
        currentQuestion={currentQuestion}
        updateScore={updateScore}
        nextQuestion={nextQuestion}
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

    const component = render(
      <Question
        question={question}
        currentQuestion={currentQuestion}
        updateScore={updateScore}
        nextQuestion={nextQuestion}
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

    const component = render(
      <Question
        question={question}
        currentQuestion={currentQuestion}
        updateScore={updateScore}
        nextQuestion={nextQuestion}
      />
    );

    const AnswerButton = component.getByText(question.incorrect_answers[0]);
    await user.click(AnswerButton);

    const btnNext = component.getByTestId("next-button");
    await user.click(btnNext);

    expect(nextQuestion).toBeCalledTimes(1);
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

    const unsortAnswersSpy = vi.spyOn(helpers, "unsortAnswers");

    render(
      <Question
        question={question}
        currentQuestion={currentQuestion}
        updateScore={updateScore}
        nextQuestion={nextQuestion}
      />
    );

    expect(unsortAnswersSpy).toHaveBeenCalled();

    const expectedAnswers = [
      ...question.incorrect_answers,
      question.correct_answer,
    ];
    const messyAnswers = unsortAnswersSpy.mock.results[0].value;
    console.log(messyAnswers)

    expect(messyAnswers).toHaveLength(expectedAnswers.length);
    expect(messyAnswers).toEqual(expect.arrayContaining(expectedAnswers));

    unsortAnswersSpy.mockRestore();
  });
});
