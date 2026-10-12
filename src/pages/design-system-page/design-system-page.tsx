import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, useParams } from 'react-router'

import { EmptyState, Heading, Link } from '@/components'
import { fallbackLanguage, i18n } from '@/i18n/i18n'
import designSystem from '@/i18n/locales/en/design-system.json'

import { CodeBlock } from './code-block'
import styles from './design-system-page.module.scss'
import { DesignSystemSidebar } from './design-system-sidebar'
import { getEntryPath, SHOWCASE_ENTRIES } from './showcase-entries'
import { ShowcaseSection } from './showcase-section'

const NAMESPACE = 'designSystem'

i18n.addResourceBundle(fallbackLanguage, NAMESPACE, designSystem)

const FIRST_ENTRY_PATH = getEntryPath(SHOWCASE_ENTRIES[0].id)

export function DesignSystemPage() {
  const { t } = useTranslation(NAMESPACE)
  const { entryId } = useParams()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const previousEntryId = useRef(entryId)

  useEffect(() => {
    if (previousEntryId.current !== entryId) {
      previousEntryId.current = entryId
      titleRef.current?.focus()
    }
  }, [entryId])

  if (entryId === undefined) {
    return <Navigate to={FIRST_ENTRY_PATH} replace />
  }

  const entry = SHOWCASE_ENTRIES.find(({ id }) => id === entryId)

  return (
    <div className={styles.layout}>
      <DesignSystemSidebar />
      <main className={styles.main}>
        {entry ? (
          <>
            <Heading
              ref={titleRef}
              className={styles.title}
              level={1}
              tabIndex={-1}
            >
              {entry.name}
            </Heading>
            <ShowcaseSection title={t('sections.usage')}>
              <div>
                <entry.usage.Component />
              </div>
              <CodeBlock
                code={entry.usage.code.trim()}
                language={entry.usage.language}
              />
            </ShowcaseSection>
            <entry.Component />
          </>
        ) : (
          <EmptyState
            icon="search"
            headingLevel={1}
            title={t('notFound.title')}
            description={t('notFound.description')}
            action={<Link to={FIRST_ENTRY_PATH}>{t('notFound.action')}</Link>}
          />
        )}
      </main>
    </div>
  )
}
