import { useCallback, useSyncExternalStore } from 'react'

export const THEMES = ['system', 'light', 'dark'] as const

export type Theme = (typeof THEMES)[number]

export const THEME_STORAGE_KEY = 'theme'

const DEFAULT_THEME: Theme = 'system'

const listeners = new Set<() => void>()

function isTheme(value: string | null): value is Theme {
  return THEMES.some((theme) => theme === value)
}

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return isTheme(stored) ? stored : DEFAULT_THEME
  } catch {
    return DEFAULT_THEME
  }
}

function applyTheme(theme: Theme) {
  if (theme === 'system') {
    delete document.documentElement.dataset.theme
  } else {
    document.documentElement.dataset.theme = theme
  }
}

function handleStorage(event: StorageEvent) {
  if (event.key !== null && event.key !== THEME_STORAGE_KEY) {
    return
  }

  applyTheme(readTheme())
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  if (listeners.size === 0) {
    window.addEventListener('storage', handleStorage)
  }
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      window.removeEventListener('storage', handleStorage)
    }
  }
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme)

  const setTheme = useCallback((next: Theme) => {
    try {
      if (next === DEFAULT_THEME) {
        localStorage.removeItem(THEME_STORAGE_KEY)
      } else {
        localStorage.setItem(THEME_STORAGE_KEY, next)
      }
    } catch {
      return
    }

    applyTheme(next)
    listeners.forEach((listener) => listener())
  }, [])

  return { theme, setTheme }
}
