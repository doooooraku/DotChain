import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';

export type HabitIconName = ComponentProps<typeof Ionicons>['name'];

export type IconCategoryId = 'basic' | 'health' | 'learning';
export type IconCategoryTitleKey = 'iconCatBasic' | 'iconCatHealth' | 'iconCatLearning';

export type HabitIconOption = {
  id: HabitIconName;
  label: string;
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
      { id: 'flame-outline', label: 'Streak' },
      { id: 'checkbox-outline', label: 'Task' },
      { id: 'sparkles-outline', label: 'Shine' },
      { id: 'color-wand-outline', label: 'Clean' },
      { id: 'shirt-outline', label: 'Laundry' },
    ],
  },
  {
    id: 'health',
    titleKey: 'iconCatHealth',
    icons: [
      { id: 'water-outline', label: 'Water' },
      { id: 'walk-outline', label: 'Walk' },
      { id: 'moon-outline', label: 'Sleep' },
      { id: 'fitness-outline', label: 'Workout' },
      { id: 'barbell-outline', label: 'Barbell' },
    ],
  },
  {
    id: 'learning',
    titleKey: 'iconCatLearning',
    icons: [
      { id: 'book-outline', label: 'Read' },
      { id: 'brush-outline', label: 'Art' },
      { id: 'tv-outline', label: 'Media' },
      { id: 'school-outline', label: 'Study' },
      { id: 'globe-outline', label: 'Language' },
    ],
  },
];
