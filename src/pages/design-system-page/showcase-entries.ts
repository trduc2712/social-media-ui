import type { ReactNode } from 'react'

import { DESIGN_SYSTEM_PATH } from '@/constants/routes'

import { AccordionEntry } from './entries/accordion-entry'
import { AlertEntry } from './entries/alert-entry'
import { AvatarEntry } from './entries/avatar-entry'
import { BadgeEntry } from './entries/badge-entry'
import { BreadcrumbEntry } from './entries/breadcrumb-entry'
import { ButtonEntry } from './entries/button-entry'
import { CardEntry } from './entries/card-entry'
import { CheckboxEntry } from './entries/checkbox-entry'
import { ComboboxEntry } from './entries/combobox-entry'
import { ContainerEntry } from './entries/container-entry'
import { DialogEntry } from './entries/dialog-entry'
import { DividerEntry } from './entries/divider-entry'
import { EmptyStateEntry } from './entries/empty-state-entry'
import {
  ColorsEntry,
  RadiusEntry,
  ShadowsEntry,
  SpacingEntry,
  TypographyEntry,
} from './entries/foundations'
import { HeadingEntry } from './entries/heading-entry'
import { IconEntry } from './entries/icon-entry'
import { InputEntry } from './entries/input-entry'
import { KbdEntry } from './entries/kbd-entry'
import { LinkEntry } from './entries/link-entry'
import { MenuEntry } from './entries/menu-entry'
import { PaginationEntry } from './entries/pagination-entry'
import { ProgressEntry } from './entries/progress-entry'
import { RadioGroupEntry } from './entries/radio-group-entry'
import { SelectEntry } from './entries/select-entry'
import { SkeletonEntry } from './entries/skeleton-entry'
import { SpinnerEntry } from './entries/spinner-entry'
import { StackEntry } from './entries/stack-entry'
import { SwitchEntry } from './entries/switch-entry'
import { TabsEntry } from './entries/tabs-entry'
import { TagEntry } from './entries/tag-entry'
import { TextEntry } from './entries/text-entry'
import { TextareaEntry } from './entries/textarea-entry'
import { ThemeToggleEntry } from './entries/theme-toggle-entry'
import { ToastEntry } from './entries/toast-entry'
import { TooltipEntry } from './entries/tooltip-entry'
import { AccordionUsage } from './usage/accordion-usage'
import accordionUsageCode from './usage/accordion-usage.tsx?raw'
import { AlertUsage } from './usage/alert-usage'
import alertUsageCode from './usage/alert-usage.tsx?raw'
import { AvatarUsage } from './usage/avatar-usage'
import avatarUsageCode from './usage/avatar-usage.tsx?raw'
import { BadgeUsage } from './usage/badge-usage'
import badgeUsageCode from './usage/badge-usage.tsx?raw'
import { BreadcrumbUsage } from './usage/breadcrumb-usage'
import breadcrumbUsageCode from './usage/breadcrumb-usage.tsx?raw'
import { ButtonUsage } from './usage/button-usage'
import buttonUsageCode from './usage/button-usage.tsx?raw'
import { CardUsage } from './usage/card-usage'
import cardUsageCode from './usage/card-usage.tsx?raw'
import { CheckboxUsage } from './usage/checkbox-usage'
import checkboxUsageCode from './usage/checkbox-usage.tsx?raw'
import { ColorsUsage } from './usage/colors-usage'
import colorsUsageCode from './usage/colors-usage.module.scss?raw'
import { ComboboxUsage } from './usage/combobox-usage'
import comboboxUsageCode from './usage/combobox-usage.tsx?raw'
import { ContainerUsage } from './usage/container-usage'
import containerUsageCode from './usage/container-usage.tsx?raw'
import { DialogUsage } from './usage/dialog-usage'
import dialogUsageCode from './usage/dialog-usage.tsx?raw'
import { DividerUsage } from './usage/divider-usage'
import dividerUsageCode from './usage/divider-usage.tsx?raw'
import { EmptyStateUsage } from './usage/empty-state-usage'
import emptyStateUsageCode from './usage/empty-state-usage.tsx?raw'
import { HeadingUsage } from './usage/heading-usage'
import headingUsageCode from './usage/heading-usage.tsx?raw'
import { IconUsage } from './usage/icon-usage'
import iconUsageCode from './usage/icon-usage.tsx?raw'
import { InputUsage } from './usage/input-usage'
import inputUsageCode from './usage/input-usage.tsx?raw'
import { KbdUsage } from './usage/kbd-usage'
import kbdUsageCode from './usage/kbd-usage.tsx?raw'
import { LinkUsage } from './usage/link-usage'
import linkUsageCode from './usage/link-usage.tsx?raw'
import { MenuUsage } from './usage/menu-usage'
import menuUsageCode from './usage/menu-usage.tsx?raw'
import { PaginationUsage } from './usage/pagination-usage'
import paginationUsageCode from './usage/pagination-usage.tsx?raw'
import { ProgressUsage } from './usage/progress-usage'
import progressUsageCode from './usage/progress-usage.tsx?raw'
import { RadioGroupUsage } from './usage/radio-group-usage'
import radioGroupUsageCode from './usage/radio-group-usage.tsx?raw'
import { RadiusUsage } from './usage/radius-usage'
import radiusUsageCode from './usage/radius-usage.module.scss?raw'
import { SelectUsage } from './usage/select-usage'
import selectUsageCode from './usage/select-usage.tsx?raw'
import { ShadowsUsage } from './usage/shadows-usage'
import shadowsUsageCode from './usage/shadows-usage.module.scss?raw'
import { SkeletonUsage } from './usage/skeleton-usage'
import skeletonUsageCode from './usage/skeleton-usage.tsx?raw'
import { SpacingUsage } from './usage/spacing-usage'
import spacingUsageCode from './usage/spacing-usage.module.scss?raw'
import { SpinnerUsage } from './usage/spinner-usage'
import spinnerUsageCode from './usage/spinner-usage.tsx?raw'
import { StackUsage } from './usage/stack-usage'
import stackUsageCode from './usage/stack-usage.tsx?raw'
import { SwitchUsage } from './usage/switch-usage'
import switchUsageCode from './usage/switch-usage.tsx?raw'
import { TabsUsage } from './usage/tabs-usage'
import tabsUsageCode from './usage/tabs-usage.tsx?raw'
import { TagUsage } from './usage/tag-usage'
import tagUsageCode from './usage/tag-usage.tsx?raw'
import { TextUsage } from './usage/text-usage'
import textUsageCode from './usage/text-usage.tsx?raw'
import { TextareaUsage } from './usage/textarea-usage'
import textareaUsageCode from './usage/textarea-usage.tsx?raw'
import { ThemeToggleUsage } from './usage/theme-toggle-usage'
import themeToggleUsageCode from './usage/theme-toggle-usage.tsx?raw'
import { ToastUsage } from './usage/toast-usage'
import toastUsageCode from './usage/toast-usage.tsx?raw'
import { TooltipUsage } from './usage/tooltip-usage'
import tooltipUsageCode from './usage/tooltip-usage.tsx?raw'
import { TypographyUsage } from './usage/typography-usage'
import typographyUsageCode from './usage/typography-usage.module.scss?raw'

export const SHOWCASE_GROUPS = [
  'foundations',
  'actions',
  'forms',
  'display',
  'feedback',
  'navigation',
  'overlays',
  'layout',
  'utilities',
] as const

export type ShowcaseGroup = (typeof SHOWCASE_GROUPS)[number]

export type ShowcaseUsage = {
  Component: () => ReactNode
  code: string
  language: 'tsx' | 'scss'
}

export type ShowcaseEntry = {
  id: string
  name: string
  group: ShowcaseGroup
  Component: () => ReactNode
  usage: ShowcaseUsage
}

export const SHOWCASE_ENTRIES: ShowcaseEntry[] = [
  {
    id: 'colors',
    name: 'Colors',
    group: 'foundations',
    Component: ColorsEntry,
    usage: { Component: ColorsUsage, code: colorsUsageCode, language: 'scss' },
  },
  {
    id: 'typography',
    name: 'Typography',
    group: 'foundations',
    Component: TypographyEntry,
    usage: {
      Component: TypographyUsage,
      code: typographyUsageCode,
      language: 'scss',
    },
  },
  {
    id: 'spacing',
    name: 'Spacing',
    group: 'foundations',
    Component: SpacingEntry,
    usage: {
      Component: SpacingUsage,
      code: spacingUsageCode,
      language: 'scss',
    },
  },
  {
    id: 'radius',
    name: 'Radius',
    group: 'foundations',
    Component: RadiusEntry,
    usage: { Component: RadiusUsage, code: radiusUsageCode, language: 'scss' },
  },
  {
    id: 'shadows',
    name: 'Shadows',
    group: 'foundations',
    Component: ShadowsEntry,
    usage: {
      Component: ShadowsUsage,
      code: shadowsUsageCode,
      language: 'scss',
    },
  },
  {
    id: 'button',
    name: 'Button',
    group: 'actions',
    Component: ButtonEntry,
    usage: { Component: ButtonUsage, code: buttonUsageCode, language: 'tsx' },
  },
  {
    id: 'link',
    name: 'Link',
    group: 'actions',
    Component: LinkEntry,
    usage: { Component: LinkUsage, code: linkUsageCode, language: 'tsx' },
  },
  {
    id: 'menu',
    name: 'Menu',
    group: 'actions',
    Component: MenuEntry,
    usage: { Component: MenuUsage, code: menuUsageCode, language: 'tsx' },
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    group: 'forms',
    Component: CheckboxEntry,
    usage: {
      Component: CheckboxUsage,
      code: checkboxUsageCode,
      language: 'tsx',
    },
  },
  {
    id: 'combobox',
    name: 'Combobox',
    group: 'forms',
    Component: ComboboxEntry,
    usage: {
      Component: ComboboxUsage,
      code: comboboxUsageCode,
      language: 'tsx',
    },
  },
  {
    id: 'input',
    name: 'Input',
    group: 'forms',
    Component: InputEntry,
    usage: { Component: InputUsage, code: inputUsageCode, language: 'tsx' },
  },
  {
    id: 'radio-group',
    name: 'RadioGroup',
    group: 'forms',
    Component: RadioGroupEntry,
    usage: {
      Component: RadioGroupUsage,
      code: radioGroupUsageCode,
      language: 'tsx',
    },
  },
  {
    id: 'select',
    name: 'Select',
    group: 'forms',
    Component: SelectEntry,
    usage: { Component: SelectUsage, code: selectUsageCode, language: 'tsx' },
  },
  {
    id: 'switch',
    name: 'Switch',
    group: 'forms',
    Component: SwitchEntry,
    usage: { Component: SwitchUsage, code: switchUsageCode, language: 'tsx' },
  },
  {
    id: 'textarea',
    name: 'Textarea',
    group: 'forms',
    Component: TextareaEntry,
    usage: {
      Component: TextareaUsage,
      code: textareaUsageCode,
      language: 'tsx',
    },
  },
  {
    id: 'accordion',
    name: 'Accordion',
    group: 'display',
    Component: AccordionEntry,
    usage: {
      Component: AccordionUsage,
      code: accordionUsageCode,
      language: 'tsx',
    },
  },
  {
    id: 'avatar',
    name: 'Avatar',
    group: 'display',
    Component: AvatarEntry,
    usage: { Component: AvatarUsage, code: avatarUsageCode, language: 'tsx' },
  },
  {
    id: 'badge',
    name: 'Badge',
    group: 'display',
    Component: BadgeEntry,
    usage: { Component: BadgeUsage, code: badgeUsageCode, language: 'tsx' },
  },
  {
    id: 'card',
    name: 'Card',
    group: 'display',
    Component: CardEntry,
    usage: { Component: CardUsage, code: cardUsageCode, language: 'tsx' },
  },
  {
    id: 'heading',
    name: 'Heading',
    group: 'display',
    Component: HeadingEntry,
    usage: { Component: HeadingUsage, code: headingUsageCode, language: 'tsx' },
  },
  {
    id: 'icon',
    name: 'Icon',
    group: 'display',
    Component: IconEntry,
    usage: { Component: IconUsage, code: iconUsageCode, language: 'tsx' },
  },
  {
    id: 'kbd',
    name: 'Kbd',
    group: 'display',
    Component: KbdEntry,
    usage: { Component: KbdUsage, code: kbdUsageCode, language: 'tsx' },
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    group: 'display',
    Component: SkeletonEntry,
    usage: {
      Component: SkeletonUsage,
      code: skeletonUsageCode,
      language: 'tsx',
    },
  },
  {
    id: 'tag',
    name: 'Tag',
    group: 'display',
    Component: TagEntry,
    usage: { Component: TagUsage, code: tagUsageCode, language: 'tsx' },
  },
  {
    id: 'text',
    name: 'Text',
    group: 'display',
    Component: TextEntry,
    usage: { Component: TextUsage, code: textUsageCode, language: 'tsx' },
  },
  {
    id: 'alert',
    name: 'Alert',
    group: 'feedback',
    Component: AlertEntry,
    usage: { Component: AlertUsage, code: alertUsageCode, language: 'tsx' },
  },
  {
    id: 'empty-state',
    name: 'EmptyState',
    group: 'feedback',
    Component: EmptyStateEntry,
    usage: {
      Component: EmptyStateUsage,
      code: emptyStateUsageCode,
      language: 'tsx',
    },
  },
  {
    id: 'progress',
    name: 'Progress',
    group: 'feedback',
    Component: ProgressEntry,
    usage: {
      Component: ProgressUsage,
      code: progressUsageCode,
      language: 'tsx',
    },
  },
  {
    id: 'spinner',
    name: 'Spinner',
    group: 'feedback',
    Component: SpinnerEntry,
    usage: { Component: SpinnerUsage, code: spinnerUsageCode, language: 'tsx' },
  },
  {
    id: 'toast',
    name: 'Toast',
    group: 'feedback',
    Component: ToastEntry,
    usage: { Component: ToastUsage, code: toastUsageCode, language: 'tsx' },
  },
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    group: 'navigation',
    Component: BreadcrumbEntry,
    usage: {
      Component: BreadcrumbUsage,
      code: breadcrumbUsageCode,
      language: 'tsx',
    },
  },
  {
    id: 'pagination',
    name: 'Pagination',
    group: 'navigation',
    Component: PaginationEntry,
    usage: {
      Component: PaginationUsage,
      code: paginationUsageCode,
      language: 'tsx',
    },
  },
  {
    id: 'tabs',
    name: 'Tabs',
    group: 'navigation',
    Component: TabsEntry,
    usage: { Component: TabsUsage, code: tabsUsageCode, language: 'tsx' },
  },
  {
    id: 'dialog',
    name: 'Dialog',
    group: 'overlays',
    Component: DialogEntry,
    usage: { Component: DialogUsage, code: dialogUsageCode, language: 'tsx' },
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    group: 'overlays',
    Component: TooltipEntry,
    usage: { Component: TooltipUsage, code: tooltipUsageCode, language: 'tsx' },
  },
  {
    id: 'container',
    name: 'Container',
    group: 'layout',
    Component: ContainerEntry,
    usage: {
      Component: ContainerUsage,
      code: containerUsageCode,
      language: 'tsx',
    },
  },
  {
    id: 'divider',
    name: 'Divider',
    group: 'layout',
    Component: DividerEntry,
    usage: { Component: DividerUsage, code: dividerUsageCode, language: 'tsx' },
  },
  {
    id: 'stack',
    name: 'Stack',
    group: 'layout',
    Component: StackEntry,
    usage: { Component: StackUsage, code: stackUsageCode, language: 'tsx' },
  },
  {
    id: 'theme-toggle',
    name: 'ThemeToggle',
    group: 'utilities',
    Component: ThemeToggleEntry,
    usage: {
      Component: ThemeToggleUsage,
      code: themeToggleUsageCode,
      language: 'tsx',
    },
  },
]

export function getEntryPath(id: string): string {
  return `${DESIGN_SYSTEM_PATH}/${id}`
}
