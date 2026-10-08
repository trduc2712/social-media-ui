import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { HOME_PATH } from '@/constants/routes'

export function NotFoundPage() {
  const { t } = useTranslation()

  return (
    <main>
      <h1>{t('notFound.title')}</h1>
      <Link to={HOME_PATH}>{t('notFound.backToHome')}</Link>
    </main>
  )
}
