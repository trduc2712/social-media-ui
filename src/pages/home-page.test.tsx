import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import { HomePage } from '@/pages/home-page'

test('renders the home page title', () => {
  render(<HomePage />)

  expect(
    screen.getByRole('heading', { name: 'Social Media' }),
  ).toBeInTheDocument()
})
