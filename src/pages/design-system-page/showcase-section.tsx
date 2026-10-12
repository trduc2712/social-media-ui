import type { ReactNode } from 'react'

import { Heading, Stack } from '@/components'

import styles from './showcase-section.module.scss'

type ShowcaseSectionProps = {
  title: string
  children: ReactNode
}

type SpecimenProps = {
  label: string
  isStretched?: boolean
  children: ReactNode
}

type SpecimenRowProps = {
  children: ReactNode
}

export function ShowcaseSection({ title, children }: ShowcaseSectionProps) {
  return (
    <Stack as="section" gap={3}>
      <Heading level={2} size="lg">
        {title}
      </Heading>
      <div className={styles.canvas}>{children}</div>
    </Stack>
  )
}

export function Specimen({
  label,
  isStretched = false,
  children,
}: SpecimenProps) {
  return (
    <Stack
      gap={2}
      align={isStretched ? 'stretch' : 'start'}
      className={styles.specimen}
    >
      {children}
      <code className={styles.caption}>{label}</code>
    </Stack>
  )
}

export function SpecimenRow({ children }: SpecimenRowProps) {
  return (
    <Stack direction="row" gap={5} align="end" isWrapping>
      {children}
    </Stack>
  )
}
