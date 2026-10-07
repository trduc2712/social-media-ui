import { createBrowserRouter } from 'react-router'

import { SIGN_IN_PATH, SIGN_UP_PATH } from '@/constants/routes'
import { RootLayout } from '@/layouts/root-layout'
import { HomePage } from '@/pages/home-page'
import { NotFoundPage } from '@/pages/not-found-page'
import { RouteErrorPage } from '@/pages/route-error-page'
import { SignInPage } from '@/pages/sign-in-page'
import { SignUpPage } from '@/pages/sign-up-page'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: `${SIGN_IN_PATH}/*`, element: <SignInPage /> },
      { path: `${SIGN_UP_PATH}/*`, element: <SignUpPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
