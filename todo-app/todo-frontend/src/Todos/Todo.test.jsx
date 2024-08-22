/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Todo from './Todo'

test('renders content', async() => {
  const todo = {
    text: 'finish part12 of Full Stack Open',
    done: false
  }
  const deleteTodo = vi.fn()
  const completeTodo = vi.fn()
  

  render(<Todo 
            todo={todo} 
            deleteTodo={deleteTodo} 
            completeTodo={completeTodo} 
          />)

  const element = screen.getByText('finish part12 of Full Stack Open')
  const element2 = screen.getByText('This todo is not done')
  expect(element).toBeDefined()
  expect(element2).toBeDefined()

  const items = await screen.findAllByRole('button')
  expect(items).toHaveLength(2)

  const user = userEvent.setup()
  const donebutton = screen.getByText('Set as done')
  await user.click(donebutton)

  const delButton = screen.getByText('Delete')
  await user.click(delButton)
  console.log('deleteTodo.mock.calls is', deleteTodo.mock.calls)
  console.log('completeTodo.mock.calls is', completeTodo.mock.calls)
  expect(completeTodo.mock.calls).toHaveLength(1)
  expect(deleteTodo.mock.calls).toHaveLength(1)
})