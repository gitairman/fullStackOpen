import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author', () => {
  const blog = {
    title: 'this is a test blog',
    author: 'this is a test author',
  }

  render(<Blog blog={blog} />)

  const title = screen.getByText('this is a test blog', { exact: false })
  const author = screen.getByText('this is a test author', { exact: false })
  expect(title).toBeDefined()
  expect(author).toBeDefined()
})