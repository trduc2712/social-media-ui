import { useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router'

import { Button, Combobox, Text } from '@/components'
import { ThemeToggle } from '@/features/theme/theme-toggle'
import { cx } from '@/lib/cx'

import styles from './design-system-sidebar.module.scss'
import {
  getEntryPath,
  SHOWCASE_ENTRIES,
  SHOWCASE_GROUPS,
} from './showcase-entries'

const SEARCH_OPTIONS = SHOWCASE_ENTRIES.map(({ id, name }) => ({
  value: id,
  label: name,
}))

export function DesignSystemSidebar() {
  const { t } = useTranslation('designSystem')
  const navigate = useNavigate()
  const id = useId()
  const navId = `${id}-nav`
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <Text as="strong" size="lg" weight="semibold">
          {t('title')}
        </Text>
        <ThemeToggle />
      </div>
      <Combobox
        label={t('search.label')}
        placeholder={t('search.placeholder')}
        options={SEARCH_OPTIONS}
        isLabelHidden
        onSelect={(entryId) => {
          setIsMenuOpen(false)
          void navigate(getEntryPath(entryId))
        }}
      />
      <Button
        className={styles.browse}
        variant="secondary"
        size="sm"
        aria-expanded={isMenuOpen}
        aria-controls={navId}
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
      >
        {t('nav.browse')}
      </Button>
      <nav
        id={navId}
        className={cx(styles.nav, !isMenuOpen && styles.collapsed)}
        aria-label={t('nav.label')}
      >
        {SHOWCASE_GROUPS.map((group) => (
          <div key={group} className={styles.group}>
            <Text
              id={`${id}-${group}`}
              className={styles.groupName}
              size="xs"
              weight="semibold"
              tone="muted"
            >
              {t(`groups.${group}`)}
            </Text>
            <ul aria-labelledby={`${id}-${group}`}>
              {SHOWCASE_ENTRIES.filter((entry) => entry.group === group).map(
                (entry) => (
                  <li key={entry.id}>
                    <NavLink
                      className={styles.link}
                      to={getEntryPath(entry.id)}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {entry.name}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  )
}
