import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

export function RouteErrorPage() {
  const { t } = useTranslation()

  return (
    <main>
      <h1>{t('routeError.title')}</h1>
      <p>{t('routeError.description')}</p>
      <Link to="/">{t('notFound.backToHome')}</Link>
    </main>
  )
}
