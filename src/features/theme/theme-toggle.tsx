import { useTranslation } from 'react-i18next'

import { Button } from '@/components/button/button'
import type { IconName } from '@/components/icon/icon-paths'
import type { Theme } from '@/features/theme/use-theme'
import { THEMES, useTheme } from '@/features/theme/use-theme'

import styles from './theme-toggle.module.scss'

const THEME_ICONS: Record<Theme, IconName> = {
  system: 'monitor',
  light: 'sun',
  dark: 'moon',
}

export function ThemeToggle() {
  const { t } = useTranslation()
  const { theme, setTheme } = useTheme()

  return (
    <div className={styles.root} role="group" aria-label={t('theme.label')}>
      {THEMES.map((option) => (
        <Button
          key={option}
          icon={THEME_ICONS[option]}
          variant="ghost"
          size="sm"
          aria-label={t(`theme.${option}`)}
          aria-pressed={theme === option}
          onClick={() => setTheme(option)}
        />
      ))}
    </div>
  )
}
