import type { ReactElement } from 'react'
import { cloneElement, useEffect, useId, useState } from 'react'

import { cx } from '@/lib/cx'

import styles from './tooltip.module.scss'

export type TooltipPlacement = 'top' | 'bottom'

export type TooltipProps = {
  content: string
  placement?: TooltipPlacement
  children: ReactElement<{ 'aria-describedby'?: string }>
  className?: string
}

export function Tooltip({
  content,
  placement = 'top',
  children,
  className,
}: TooltipProps) {
  const id = useId()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  return (
    <span
      className={cx(styles.root, className)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      {cloneElement(children, { 'aria-describedby': id })}
      <span
        id={id}
        className={cx(styles.tooltip, styles[placement])}
        role="tooltip"
        hidden={!isOpen}
      >
        <span className={styles.bubble}>{content}</span>
      </span>
    </span>
  )
}
