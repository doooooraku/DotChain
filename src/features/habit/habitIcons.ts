import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import type { TranslationKey } from '@/src/core/i18n/i18n';

export type HabitIconName = ComponentProps<typeof Ionicons>['name'];

export type IconCategoryId = 'basic' | 'health' | 'learning';
export type IconCategoryTitleKey = 'iconCatBasic' | 'iconCatHealth' | 'iconCatLearning';

export type HabitIconOption = {
  id: HabitIconName;
  labelKey: TranslationKey;
};

export type HabitIconCategory = {
  id: IconCategoryId;
  titleKey: IconCategoryTitleKey;
  icons: HabitIconOption[];
};

export const DEFAULT_HABIT_ICON: HabitIconName = 'walk-outline';

export const LEGACY_ICON_MAP: Record<string, HabitIconName> = {
  flame: 'flame-outline',
  checkbox: 'checkbox-outline',
  sparkles: 'sparkles-outline',
  clean: 'color-wand-outline',
  laundry: 'shirt-outline',
  water: 'water-outline',
  walk: 'walk-outline',
  moon: 'moon-outline',
  fitness: 'fitness-outline',
  book: 'book-outline',
  brush: 'brush-outline',
  tv: 'tv-outline',
  pc: 'laptop-outline',
  study: 'school-outline',
  language: 'globe-outline',
};

const glyphMap = (Ionicons as any).glyphMap as Record<string, number> | undefined;

export function normalizeHabitIconName(value?: string | null): HabitIconName {
  if (value && glyphMap && Object.prototype.hasOwnProperty.call(glyphMap, value)) {
    return value as HabitIconName;
  }
  if (value && LEGACY_ICON_MAP[value]) {
    return LEGACY_ICON_MAP[value];
  }
  return DEFAULT_HABIT_ICON;
}

export const HABIT_ICON_CATEGORIES: HabitIconCategory[] = [
  {
    id: 'basic',
    titleKey: 'iconCatBasic',
    icons: [
      { id: 'flame-outline', labelKey: 'iconLabelStreak' },
      { id: 'checkbox-outline', labelKey: 'iconLabelTask' },
      { id: 'sparkles-outline', labelKey: 'iconLabelShine' },
      { id: 'color-wand-outline', labelKey: 'iconLabelClean' },
      { id: 'shirt-outline', labelKey: 'iconLabelLaundry' },
    ],
  },
  {
    id: 'health',
    titleKey: 'iconCatHealth',
    icons: [
      { id: 'water-outline', labelKey: 'iconLabelWater' },
      { id: 'walk-outline', labelKey: 'iconLabelWalk' },
      { id: 'moon-outline', labelKey: 'iconLabelSleep' },
      { id: 'fitness-outline', labelKey: 'iconLabelWorkout' },
      { id: 'barbell-outline', labelKey: 'iconLabelBarbell' },
    ],
  },
  {
    id: 'learning',
    titleKey: 'iconCatLearning',
    icons: [
      { id: 'book-outline', labelKey: 'iconLabelRead' },
      { id: 'brush-outline', labelKey: 'iconLabelArt' },
      { id: 'tv-outline', labelKey: 'iconLabelMedia' },
      { id: 'school-outline', labelKey: 'iconLabelStudy' },
      { id: 'globe-outline', labelKey: 'iconLabelLanguage' },
    ],
  },
];
