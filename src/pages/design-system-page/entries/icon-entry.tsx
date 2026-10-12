import { useTranslation } from 'react-i18next'

import type { IconSize } from '@/components'
import { Icon, ICON_NAMES } from '@/components'

import { ShowcaseSection, Specimen, SpecimenRow } from '../showcase-section'
import styles from './entries.module.scss'

const SIZES: IconSize[] = ['sm', 'md', 'lg', 'xl']

export function IconEntry() {
  const { t } = useTranslation('designSystem')

  return (
    <>
      <ShowcaseSection title={t('sections.sizes')}>
        <SpecimenRow>
          {SIZES.map((size) => (
            <Specimen key={size} label={size}>
              <Icon name="star" size={size} />
            </Specimen>
          ))}
        </SpecimenRow>
      </ShowcaseSection>
      <ShowcaseSection title={t('sections.labelled')}>
        <Specimen label="label">
          <Icon name="star" label={t('samples.favorited')} />
        </Specimen>
      </ShowcaseSection>
      <ShowcaseSection title={t('sections.allIcons')}>
        <div className={styles.grid}>
          {ICON_NAMES.map((name) => (
            <Specimen key={name} label={name}>
              <Icon name={name} size="lg" />
            </Specimen>
          ))}
        </div>
      </ShowcaseSection>
    </>
  )
}
