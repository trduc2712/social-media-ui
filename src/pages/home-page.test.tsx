import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, expect, test, vi } from 'vitest'

import type { CurrentUser } from '@/features/current-user/use-current-user'
import { i18n } from '@/i18n/i18n'
import { HomePage } from '@/pages/home-page'

type CurrentUserQuery = {
  data: CurrentUser | undefined
  isPending: boolean
  isError: boolean
  refetch: () => Promise<unknown>
}

const refetch = vi.fn<() => Promise<unknown>>()
const useCurrentUser = vi.fn<() => CurrentUserQuery>()

vi.mock('@/features/current-user/use-current-user', () => ({
  useCurrentUser: () => useCurrentUser(),
}))

afterEach(() => {
  vi.resetAllMocks()
})

test('shows a loading state while the current user is loading', () => {
  useCurrentUser.mockReturnValue({
    data: undefined,
    isPending: true,
    isError: false,
    refetch,
  })

  render(<HomePage />)

  expect(screen.getByRole('status')).toHaveTextContent(i18n.t('common.loading'))
})

test('lets the user retry when the current user fails to load', async () => {
  refetch.mockResolvedValue(undefined)
  useCurrentUser.mockReturnValue({
    data: undefined,
    isPending: false,
    isError: true,
    refetch,
  })

  render(<HomePage />)

  expect(screen.getByRole('alert')).toHaveTextContent(
    i18n.t('currentUser.loadError'),
  )

  await userEvent.click(
    screen.getByRole('button', { name: i18n.t('common.retry') }),
  )

  expect(refetch).toHaveBeenCalledTimes(1)
})

test('shows the home page once the current user is loaded', () => {
  useCurrentUser.mockReturnValue({
    data: { id: 'user_123' },
    isPending: false,
    isError: false,
    refetch,
  })

  render(<HomePage />)

  expect(
    screen.getByRole('heading', { name: i18n.t('home.title') }),
  ).toBeInTheDocument()
})
