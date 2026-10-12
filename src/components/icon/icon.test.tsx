import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'

import type { IconSize } from '@/components/icon/icon'
import { Icon } from '@/components/icon/icon'
import styles from '@/components/icon/icon.module.scss'
import { ICON_NAMES, ICON_PATHS } from '@/components/icon/icon-paths'
import { expectNoA11yViolations } from '@/test/a11y'
import { expectStyle } from '@/test/styles'

test('is hidden from assistive technology by default', () => {
  const { container } = render(<Icon name="heart" />)

  expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  expect(screen.queryByRole('img')).not.toBeInTheDocument()
})

test('is exposed as an image when labelled', async () => {
  const { container } = render(<Icon name="heart" label="Liked" />)

  expect(screen.getByRole('img', { name: 'Liked' })).toBeInTheDocument()
  await expectNoA11yViolations(container)
})

const SIZES: IconSize[] = ['sm', 'md', 'lg', 'xl']

test.each(SIZES)('applies the %s size', (size) => {
  const { container } = render(<Icon name="heart" size={size} />)

  expectStyle(container.querySelector('svg'), styles, size)
})

test.each(ICON_NAMES)('draws the %s icon from its path', (name) => {
  const { container } = render(<Icon name={name} />)

  expect(container.querySelector('path')).toHaveAttribute('d', ICON_PATHS[name])
})
