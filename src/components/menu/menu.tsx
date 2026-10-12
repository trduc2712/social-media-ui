import type { KeyboardEvent } from 'react'
import { useEffect, useId, useRef, useState } from 'react'

import type { ButtonSize, ButtonVariant } from '@/components/button/button'
import { Button } from '@/components/button/button'
import { Icon } from '@/components/icon/icon'
import type { IconName } from '@/components/icon/icon-paths'
import { cx } from '@/lib/cx'

import styles from './menu.module.scss'

export type MenuItem = {
  id: string
  label: string
  onSelect: () => void
  icon?: IconName
  tone?: 'default' | 'danger'
  isDisabled?: boolean
}

export type MenuAlign = 'start' | 'end'

export type MenuProps = {
  label: string
  items: MenuItem[]
  icon?: IconName
  isLabelHidden?: boolean
  variant?: ButtonVariant
  size?: ButtonSize
  align?: MenuAlign
  className?: string
}

export function Menu({
  label,
  items,
  icon,
  isLabelHidden = false,
  variant = 'secondary',
  size = 'md',
  align = 'start',
  className,
}: MenuProps) {
  const id = useId()
  const menuId = `${id}-menu`
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [focusIndex, setFocusIndex] = useState<number>()

  const enabledIndexes = items.flatMap((item, index) =>
    item.isDisabled ? [] : [index],
  )

  useEffect(() => {
    if (isOpen && focusIndex !== undefined) {
      itemRefs.current[focusIndex]?.focus()
    }
  }, [isOpen, focusIndex])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)

    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isOpen])

  function open(index: number | undefined) {
    setFocusIndex(index)
    setIsOpen(true)
  }

  function close(shouldRestoreFocus: boolean) {
    setIsOpen(false)

    if (shouldRestoreFocus) {
      triggerRef.current?.focus()
    }
  }

  function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      open(enabledIndexes.at(0))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      open(enabledIndexes.at(-1))
    }
  }

  function handleMenuKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    const position = enabledIndexes.indexOf(focusIndex ?? -1)
    const lastPosition = enabledIndexes.length - 1
    const nextPosition = {
      ArrowDown: position === lastPosition ? 0 : position + 1,
      ArrowUp: position <= 0 ? lastPosition : position - 1,
      Home: 0,
      End: lastPosition,
    }[event.key]

    if (nextPosition !== undefined) {
      event.preventDefault()
      setFocusIndex(enabledIndexes[nextPosition])
    } else if (event.key === 'Escape') {
      event.preventDefault()
      close(true)
    } else if (event.key === 'Tab') {
      close(false)
    }
  }

  function select(item: MenuItem) {
    if (item.isDisabled) {
      return
    }

    close(true)
    item.onSelect()
  }

  const triggerProps = {
    ref: triggerRef,
    variant,
    size,
    'aria-haspopup': 'menu',
    'aria-expanded': isOpen,
    'aria-controls': isOpen ? menuId : undefined,
    onClick: () => (isOpen ? close(false) : open(enabledIndexes.at(0))),
    onKeyDown: handleTriggerKeyDown,
  } as const

  return (
    <div ref={rootRef} className={cx(styles.root, className)}>
      {isLabelHidden && icon ? (
        <Button {...triggerProps} icon={icon} aria-label={label} />
      ) : (
        <Button {...triggerProps} iconStart={icon} iconEnd="chevron-down">
          {label}
        </Button>
      )}
      {isOpen && (
        <ul
          id={menuId}
          className={cx(styles.list, styles[align])}
          role="menu"
          aria-label={label}
          onKeyDown={handleMenuKeyDown}
        >
          {items.map((item, index) => (
            <li key={item.id} role="none">
              <button
                ref={(element) => {
                  itemRefs.current[index] = element
                }}
                className={cx(
                  styles.item,
                  item.tone === 'danger' && styles.danger,
                )}
                type="button"
                role="menuitem"
                tabIndex={-1}
                aria-disabled={item.isDisabled || undefined}
                onClick={() => select(item)}
              >
                {item.icon && <Icon name={item.icon} size="sm" />}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
