import { useTranslation } from 'react-i18next'

import { useCurrentUser } from '@/features/current-user/use-current-user'

export function HomePage() {
  const { t } = useTranslation()
  const { isPending, isError, refetch } = useCurrentUser()

  if (isPending) {
    return <p role="status">{t('common.loading')}</p>
  }

  if (isError) {
    return (
      <div role="alert">
        <p>{t('currentUser.loadError')}</p>
        <button type="button" onClick={() => void refetch()}>
          {t('common.retry')}
        </button>
      </div>
    )
  }

  return <h1>{t('home.title')}</h1>
}
