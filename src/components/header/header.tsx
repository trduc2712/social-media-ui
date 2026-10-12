import { UserButton } from '@clerk/react'

import styles from './header.module.scss'

export function Header() {
  return (
    <header className={styles.header}>
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: {
              width: 'var(--avatar-size)',
              height: 'var(--avatar-size)',
            },
          },
        }}
      />
    </header>
  )
}
