import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button, VisuallyHidden } from '@/components'

import styles from './code-block.module.scss'

const COPIED_DURATION_MS = 2000

type CodeBlockProps = {
  code: string
  language: string
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const { t } = useTranslation('designSystem')
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (!isCopied) {
      return
    }

    const timeout = setTimeout(() => setIsCopied(false), COPIED_DURATION_MS)

    return () => clearTimeout(timeout)
  }, [isCopied])

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setIsCopied(true)
    } catch {
      setIsCopied(false)
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.bar}>
        <code className={styles.language}>{language}</code>
        <Button
          icon={isCopied ? 'check' : 'copy'}
          variant="ghost"
          size="sm"
          aria-label={t('code.copy')}
          onClick={() => void copy()}
        />
        <VisuallyHidden role="status">
          {isCopied ? t('code.copied') : null}
        </VisuallyHidden>
      </div>
      <pre
        className={styles.code}
        tabIndex={0}
        role="group"
        aria-label={t('code.label')}
      >
        <code>{code}</code>
      </pre>
    </div>
  )
}
