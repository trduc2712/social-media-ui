import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'

import type { MenuAlign } from '@/components/menu/menu'
import { Menu } from '@/components/menu/menu'
import styles from '@/components/menu/menu.module.scss'
import { expectNoA11yViolations } from '@/test/a11y'
import { expectNoStyle, expectStyle } from '@/test/styles'

function renderMenu() {
  const onEdit = vi.fn()
  const onArchive = vi.fn()
  const onDelete = vi.fn()
  const view = render(
    <Menu
      label="Actions"
      items={[
        { id: 'edit', label: 'Edit', onSelect: onEdit },
        {
          id: 'archive',
          label: 'Archive',
          onSelect: onArchive,
          isDisabled: true,
        },
        { id: 'delete', label: 'Delete', onSelect: onDelete, tone: 'danger' },
      ]}
    />,
  )

  return {
    ...view,
    onEdit,
    onArchive,
    onDelete,
    trigger: screen.getByRole('button', { name: 'Actions' }),
  }
}

test('is closed until its trigger is used', async () => {
  const { trigger, container } = renderMenu()

  expect(trigger).toHaveAttribute('aria-expanded', 'false')
  expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  await expectNoA11yViolations(container)
})

test('opens on click and focuses the first item', async () => {
  const { trigger, container } = renderMenu()

  await userEvent.click(trigger)

  expect(trigger).toHaveAttribute('aria-expanded', 'true')
  expect(screen.getByRole('menu', { name: 'Actions' })).toBeInTheDocument()
  expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus()
  await expectNoA11yViolations(container)
})

test('moves with the arrow keys, skipping disabled items', async () => {
  const { trigger } = renderMenu()

  await userEvent.click(trigger)
  await userEvent.keyboard('{ArrowDown}')

  expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus()

  await userEvent.keyboard('{ArrowDown}')

  expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus()
})

test('selects an item, closes and returns focus to the trigger', async () => {
  const { trigger, onDelete } = renderMenu()

  await userEvent.click(trigger)
  await userEvent.click(screen.getByRole('menuitem', { name: 'Delete' }))

  expect(onDelete).toHaveBeenCalledTimes(1)
  expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  expect(trigger).toHaveFocus()
})

test('ignores disabled items', async () => {
  const { trigger, onArchive } = renderMenu()

  await userEvent.click(trigger)
  await userEvent.click(screen.getByRole('menuitem', { name: 'Archive' }))

  expect(onArchive).not.toHaveBeenCalled()
  expect(screen.getByRole('menu')).toBeInTheDocument()
})

test('closes on Escape and returns focus to the trigger', async () => {
  const { trigger } = renderMenu()

  await userEvent.click(trigger)
  await userEvent.keyboard('{Escape}')

  expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  expect(trigger).toHaveFocus()
})

test('closes when clicking outside', async () => {
  const { trigger } = renderMenu()

  await userEvent.click(trigger)
  await userEvent.click(document.body)

  expect(screen.queryByRole('menu')).not.toBeInTheDocument()
})

test('can show only an icon while keeping its name', () => {
  render(<Menu label="More" icon="more-horizontal" isLabelHidden items={[]} />)

  expect(screen.getByRole('button', { name: 'More' })).toBeInTheDocument()
})

const ALIGNS: MenuAlign[] = ['start', 'end']

test.each(ALIGNS)('applies the %s alignment', async (align) => {
  render(
    <Menu
      label="Actions"
      align={align}
      items={[{ id: 'edit', label: 'Edit', onSelect: vi.fn() }]}
    />,
  )

  await userEvent.click(screen.getByRole('button', { name: 'Actions' }))

  expectStyle(screen.getByRole('menu'), styles, align)
})

test('marks danger items', async () => {
  const { trigger } = renderMenu()

  await userEvent.click(trigger)

  expectStyle(
    screen.getByRole('menuitem', { name: 'Delete' }),
    styles,
    'danger',
  )
  expectNoStyle(
    screen.getByRole('menuitem', { name: 'Edit' }),
    styles,
    'danger',
  )
})

test('opens on the last item with the up arrow', async () => {
  renderMenu()

  await userEvent.tab()
  await userEvent.keyboard('{ArrowUp}')

  expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus()
})

test('jumps to the first and last items with Home and End', async () => {
  const { trigger } = renderMenu()

  await userEvent.click(trigger)
  await userEvent.keyboard('{End}')

  expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus()

  await userEvent.keyboard('{Home}')

  expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus()
})
