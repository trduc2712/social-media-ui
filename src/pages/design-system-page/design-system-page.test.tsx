import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'
import { afterEach, expect, test } from 'vitest'

import { ToastProvider } from '@/components'
import { DESIGN_SYSTEM_PATH } from '@/constants/routes'
import { i18n } from '@/i18n/i18n'
import { DesignSystemPage } from '@/pages/design-system-page/design-system-page'
import {
  getEntryPath,
  SHOWCASE_ENTRIES,
  SHOWCASE_GROUPS,
} from '@/pages/design-system-page/showcase-entries'
import { expectNoA11yViolations } from '@/test/a11y'

const ENTRY_IDS = SHOWCASE_ENTRIES.map(({ id }) => id)

function renderPage(path: string) {
  const router = createMemoryRouter(
    [
      {
        path: `${DESIGN_SYSTEM_PATH}/:entryId?`,
        element: <DesignSystemPage />,
      },
    ],
    { initialEntries: [path] },
  )

  return {
    router,
    ...render(
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>,
    ),
  }
}

async function openMenu() {
  await userEvent.click(
    screen.getByRole('button', {
      name: i18n.t('nav.browse', { ns: 'designSystem' }),
    }),
  )

  return screen.getByRole('navigation', {
    name: i18n.t('nav.label', { ns: 'designSystem' }),
  })
}

afterEach(() => {
  localStorage.clear()
  delete document.documentElement.dataset.theme
})

test('opens the first entry when none is given', async () => {
  const { router } = renderPage(DESIGN_SYSTEM_PATH)

  expect(
    await screen.findByRole('heading', {
      level: 1,
      name: SHOWCASE_ENTRIES[0].name,
    }),
  ).toBeInTheDocument()
  expect(router.state.location.pathname).toBe(
    getEntryPath(SHOWCASE_ENTRIES[0].id),
  )
})

test.each(SHOWCASE_GROUPS)(
  'lists every %s entry in the menu',
  async (group) => {
    renderPage(getEntryPath('button'))

    const list = within(await openMenu()).getByRole('list', {
      name: i18n.t(`groups.${group}`, { ns: 'designSystem' }),
    })

    expect(
      within(list)
        .getAllByRole('link')
        .map((link) => link.textContent),
    ).toEqual(
      SHOWCASE_ENTRIES.filter((entry) => entry.group === group).map(
        (entry) => entry.name,
      ),
    )
  },
)

test('shows the entry chosen from the menu and marks it as current', async () => {
  renderPage(getEntryPath('button'))

  await userEvent.click(
    within(await openMenu()).getByRole('link', { name: 'Badge' }),
  )

  expect(screen.getByRole('heading', { level: 1, name: 'Badge' })).toHaveFocus()
  expect(screen.queryByRole('navigation')).not.toBeInTheDocument()

  const menu = await openMenu()

  expect(within(menu).getByRole('link', { name: 'Badge' })).toHaveAttribute(
    'aria-current',
    'page',
  )
  expect(
    within(menu).getByRole('link', { name: 'Button' }),
  ).not.toHaveAttribute('aria-current')
})

test('jumps to an entry from the search', async () => {
  const { router } = renderPage(getEntryPath('button'))

  await userEvent.type(
    screen.getByRole('combobox', {
      name: i18n.t('search.label', { ns: 'designSystem' }),
    }),
    'skel{Enter}',
  )

  expect(
    screen.getByRole('heading', { level: 1, name: 'Skeleton' }),
  ).toBeInTheDocument()
  expect(router.state.location.pathname).toBe(getEntryPath('skeleton'))
})

test('shows how to use a component with its source code', () => {
  renderPage(getEntryPath('button'))

  const usage = screen.getByRole('group', {
    name: i18n.t('code.label', { ns: 'designSystem' }),
  })

  expect(usage).toHaveTextContent(
    "import { Button, Stack } from '@/components'",
  )
  expect(usage).toHaveTextContent('<Button')
})

test('shows how to use tokens with a stylesheet', () => {
  renderPage(getEntryPath('colors'))

  expect(
    screen.getByRole('group', {
      name: i18n.t('code.label', { ns: 'designSystem' }),
    }),
  ).toHaveTextContent('background: var(--color-primary-subtle);')
})

test('copies the usage code', async () => {
  const user = userEvent.setup()
  renderPage(getEntryPath('spinner'))

  await user.click(
    screen.getByRole('button', {
      name: i18n.t('code.copy', { ns: 'designSystem' }),
    }),
  )

  expect(await navigator.clipboard.readText()).toContain(
    "import { Spinner } from '@/components'",
  )
  expect(
    await screen.findByText(i18n.t('code.copied', { ns: 'designSystem' })),
  ).toBeInTheDocument()
})

test('explains when the entry does not exist', () => {
  renderPage(getEntryPath('nope'))

  expect(
    screen.getByRole('heading', {
      level: 1,
      name: i18n.t('notFound.title', { ns: 'designSystem' }),
    }),
  ).toBeInTheDocument()
  expect(
    screen.getByRole('link', {
      name: i18n.t('notFound.action', { ns: 'designSystem' }),
    }),
  ).toHaveAttribute('href', getEntryPath(SHOWCASE_ENTRIES[0].id))
})

test('switches the theme from the sidebar', async () => {
  renderPage(getEntryPath('button'))

  await userEvent.click(
    screen.getAllByRole('button', { name: i18n.t('theme.dark') })[0],
  )

  expect(document.documentElement).toHaveAttribute('data-theme', 'dark')
})

test.each(ENTRY_IDS)(
  'renders the %s entry without accessibility violations',
  async (id) => {
    const { container } = renderPage(getEntryPath(id))

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: SHOWCASE_ENTRIES.find((entry) => entry.id === id)?.name,
      }),
    ).toBeInTheDocument()
    await expectNoA11yViolations(container)
  },
)
