import { describe, test, vi, expect } from 'vitest'
import { render } from '@testing-library/react'
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
})
