import { Outlet } from 'react-router'

import { Header } from '@/components/header/header'

export function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}
