import { Outlet } from 'react-router'

import { Container } from '@/components/container/container'
import { Header } from '@/components/header/header'

export function AppLayout() {
  return (
    <>
      <Header />
      <Container as="main">
        <Outlet />
      </Container>
    </>
  )
}
