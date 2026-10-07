import { SignUp } from '@clerk/react'

import { SIGN_IN_PATH, SIGN_UP_PATH } from '@/constants/routes'

export function SignUpPage() {
  return (
    <main>
      <SignUp routing="path" path={SIGN_UP_PATH} signInUrl={SIGN_IN_PATH} />
    </main>
  )
}
