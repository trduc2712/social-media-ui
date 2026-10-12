import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'

import { Button } from '@/components/button/button'
import type { TooltipPlacement } from '@/components/tooltip/tooltip'
import { Tooltip } from '@/components/tooltip/tooltip'
import styles from '@/components/tooltip/tooltip.module.scss'
import { expectNoA11yViolations } from '@/test/a11y'
import { expectStyle } from '@/test/styles'

function renderTooltip() {
  return render(
    <Tooltip content="Copies the link">
      <Button>Copy</Button>
    </Tooltip>,
  )
}

test('describes its trigger and stays hidden until needed', async () => {
  const { container } = renderTooltip()

  expect(
    screen.getByRole('button', { name: 'Copy' }),
  ).toHaveAccessibleDescription('Copies the link')
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  await expectNoA11yViolations(container)
})

test('shows on keyboard focus and hides on Escape', async () => {
  renderTooltip()

  await userEvent.tab()

  expect(screen.getByRole('tooltip')).toHaveTextContent('Copies the link')

  await userEvent.keyboard('{Escape}')

  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
})

test('shows on hover and hides when the pointer leaves', async () => {
  renderTooltip()
  const button = screen.getByRole('button', { name: 'Copy' })

  await userEvent.hover(button)

  expect(screen.getByRole('tooltip')).toBeInTheDocument()

  await userEvent.unhover(button)

  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
})

const PLACEMENTS: TooltipPlacement[] = ['top', 'bottom']

test.each(PLACEMENTS)('applies the %s placement', (placement) => {
  render(
    <Tooltip content="Copies the link" placement={placement}>
      <Button>Copy</Button>
    </Tooltip>,
  )

  expectStyle(screen.getByRole('tooltip', { hidden: true }), styles, placement)
})

test('hides when its trigger loses focus', async () => {
  renderTooltip()

  await userEvent.tab()
  await userEvent.tab()

  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
})
