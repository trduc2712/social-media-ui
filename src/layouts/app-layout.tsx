import { UserButton } from '@clerk/react'
import { Outlet } from 'react-router'

export function AppLayout() {
  return (
    <>
      <header>
        <UserButton />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
