import { SignIn } from '@clerk/react'

import { SIGN_IN_PATH, SIGN_UP_PATH } from '@/constants/routes'

export function SignInPage() {
  return (
    <main>
      <SignIn routing="path" path={SIGN_IN_PATH} signUpUrl={SIGN_UP_PATH} />
    </main>
  )
}
