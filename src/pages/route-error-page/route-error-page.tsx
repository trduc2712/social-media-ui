import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { HOME_PATH } from '@/constants/routes'

import styles from './route-error-page.module.scss'

export function RouteErrorPage() {
  const { t } = useTranslation()

  return (
    <main className={styles.page}>
      <h1>{t('routeError.title')}</h1>
      <p>{t('routeError.description')}</p>
      <Link className={styles.link} to={HOME_PATH}>
        {t('notFound.backToHome')}
      </Link>
    </main>
  )
}
