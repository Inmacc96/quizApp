import { describe, test, vi, expect } from 'vitest'
import { prettyDOM, render, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Question from '.'
import { Difficulty } from '../../interfaces/QuizType'
import { decode } from 'html-entities'

describe('<Question />', () => {
  test('renders correctly', () => {
    const currentQuestion = 1
    const question = {
      question:
        'Which anime heavily features music from the genre &quot;Eurobeat&quot;?',
      correct_answer: 'Initial D',
      incorrect_answers: ['Wangan Midnight', 'Kino no Tabi', 'Cowboy Bebop'],
      difficulty: Difficulty.Easy,
    }
    const updateScore = vi.fn()
    const nextQuestion = vi.fn()

    const component = render(
      <Question
        question={question}
        currentQuestion={currentQuestion}
        updateScore={updateScore}
        nextQuestion={nextQuestion}
      />
    )

    component.getByText('Question')
    component.getByText(currentQuestion)
    component.getByText(decode(question.question))
    component.getByText(question.correct_answer)
    component.getByText(question.incorrect_answers[0])
    component.getByText(question.difficulty)
  })

  test('clicking on the correct answer, updateScore is called once', () => {
    const currentQuestion = 1
    const question = {
      question:
        'Which anime heavily features music from the genre &quot;Eurobeat&quot;?',
      correct_answer: 'Initial D',
      incorrect_answers: ['Wangan Midnight', 'Kino no Tabi', 'Cowboy Bebop'],
      difficulty: Difficulty.Easy,
    }
    const updateScore = vi.fn()
    const nextQuestion = vi.fn()

    const component = render(
      <Question
        question={question}
        currentQuestion={currentQuestion}
        updateScore={updateScore}
        nextQuestion={nextQuestion}
      />
    )

    const correctAnswerButton = component.getByText(question.correct_answer)
    fireEvent.click(correctAnswerButton)

    expect(updateScore).toHaveBeenCalledTimes(1)
  })

  test('clicking on an answer, the next button appears', () => {
    const currentQuestion = 1
    const question = {
      question:
        'Which anime heavily features music from the genre &quot;Eurobeat&quot;?',
      correct_answer: 'Initial D',
      incorrect_answers: ['Wangan Midnight', 'Kino no Tabi', 'Cowboy Bebop'],
      difficulty: Difficulty.Easy,
    }
    const updateScore = vi.fn()
    const nextQuestion = vi.fn()

    const component = render(
      <Question
        question={question}
        currentQuestion={currentQuestion}
        updateScore={updateScore}
        nextQuestion={nextQuestion}
      />
    )

    const correctAnswerButton = component.getByText(question.correct_answer)
    fireEvent.click(correctAnswerButton)

    const btnNext = component.getByTestId('next-button')
    expect(btnNext).toBeInTheDocument()
  })

  test('clicking on next button, nextQuestion is called one', () => {
    const currentQuestion = 1
    const question = {
      question:
        'Which anime heavily features music from the genre &quot;Eurobeat&quot;?',
      correct_answer: 'Initial D',
      incorrect_answers: ['Wangan Midnight', 'Kino no Tabi', 'Cowboy Bebop'],
      difficulty: Difficulty.Easy,
    }
    const updateScore = vi.fn()
    const nextQuestion = vi.fn()

    const component = render(
      <Question
        question={question}
        currentQuestion={currentQuestion}
        updateScore={updateScore}
        nextQuestion={nextQuestion}
      />
    )

    const AnswerButton = component.getByText(question.incorrect_answers[0])
    fireEvent.click(AnswerButton)

    const btnNext = component.getByTestId('next-button')
    fireEvent.click(btnNext)

    expect(nextQuestion).toBeCalledTimes(1)
  })
})
