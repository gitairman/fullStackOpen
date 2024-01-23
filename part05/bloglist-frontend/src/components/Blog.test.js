import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'this is a test blog',
    author: 'this is a test author',
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent('this is a test blog')
  expect(div).toHaveTextContent('this is a test author')
})

test('URL and likes are shown when button controlling the shown details has been clicked', async () => {

  const blog = {
    title: 'this is a test blog',
    author: 'this is a test author',
    url: 'this is a test url',
    likes: 10,
    user: {
      username: 'this is a test username'
    }
  }

  const mockHandler = jest.fn()

  const { container } = render(<Blog blog={blog} addedBy={{ username: 'this is a test username' }} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)


  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent('this is a test url')
  expect(div).toHaveTextContent(10)

})

test('when like button is clicked twice, event handler is called twice', async () => {

  const blog = {
    title: 'this is a test blog',
    author: 'this is a test author',
    url: 'this is a test url',
    likes: 10,
    user: {
      username: 'this is a test username'
    }
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} addedBy={{ username: 'this is a test username' }} handleLike={mockHandler}/>)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)

})