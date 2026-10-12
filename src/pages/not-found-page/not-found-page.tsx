import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { HOME_PATH } from '@/constants/routes'

import styles from './not-found-page.module.scss'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <main className={styles.page}>
      <h1>{t('notFound.title')}</h1>
      <Link className={styles.link} to={HOME_PATH}>
        {t('notFound.backToHome')}
      </Link>
    </main>
  )
}
