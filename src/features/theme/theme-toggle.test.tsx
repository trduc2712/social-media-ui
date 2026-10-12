import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, test } from 'vitest'

import { ThemeToggle } from '@/features/theme/theme-toggle'
import { i18n } from '@/i18n/i18n'
import { expectNoA11yViolations } from '@/test/a11y'

afterEach(() => {
  localStorage.clear()
  delete document.documentElement.dataset.theme
})

test('marks the system theme as selected by default', async () => {
  const { container } = render(<ThemeToggle />)
  const group = screen.getByRole('group', { name: i18n.t('theme.label') })

  expect(
    within(group).getByRole('button', { name: i18n.t('theme.system') }),
  ).toHaveAttribute('aria-pressed', 'true')
  await expectNoA11yViolations(container)
})

test('switches to the chosen theme', async () => {
  render(<ThemeToggle />)
  const dark = screen.getByRole('button', { name: i18n.t('theme.dark') })

  await userEvent.click(dark)

  expect(dark).toHaveAttribute('aria-pressed', 'true')
  expect(
    screen.getByRole('button', { name: i18n.t('theme.system') }),
  ).toHaveAttribute('aria-pressed', 'false')
  expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
})
