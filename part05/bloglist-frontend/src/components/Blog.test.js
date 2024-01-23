import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
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