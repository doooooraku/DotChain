import { memo, useEffect, useMemo, useState } from 'react';
import { Button, Stack, Text, XStack, YStack, useTheme } from 'tamagui';

import { t } from '@/src/core/i18n/i18n';

export type IconPickerProps = {
  value?: string | null;
  onChange: (value: string) => void;
};

// 使ってよいアイコンIDの一覧（既存IDは変更しない）
type IconId =
  | 'flame'
  | 'checkbox'
  | 'sparkles'
  | 'water'
  | 'walk'
  | 'moon'
  | 'fitness'
  | 'book'
  | 'brush'
  | 'tv'
  | 'clean'
  | 'laundry'
  | 'pc'
  | 'study'
  | 'language';

// カテゴリIDとタイトルキーを型で縛る
type IconCategoryId = 'basic' | 'health' | 'learning';
type IconCategoryTitleKey = 'iconCatBasic' | 'iconCatHealth' | 'iconCatLearning';

type IconOption = {
  id: IconId; // DB に保存する値（習慣.icon）
  emoji: string;
  label: string; // アクセシビリティ用（英語固定）
};

type IconCategory = {
  id: IconCategoryId;
  titleKey: IconCategoryTitleKey; // i18n キー
  icons: IconOption[];
};

// 既存IDは変えない（既存データのアイコンを壊さないため）
const ICON_CATEGORIES: IconCategory[] = [
  {
    id: 'basic',
    titleKey: 'iconCatBasic',
    icons: [
      { id: 'flame', emoji: '🔥', label: 'Streak' },
      { id: 'checkbox', emoji: '☑️', label: 'Task' },
      { id: 'sparkles', emoji: '✨', label: 'Shine' },
      { id: 'clean', emoji: '🧹', label: 'Cleaning' },
      { id: 'laundry', emoji: '🧺', label: 'Laundry' },
    ],
  },
  {
    id: 'health',
    titleKey: 'iconCatHealth',
    icons: [
      { id: 'water', emoji: '💧', label: 'Water' },
      { id: 'walk', emoji: '🚶‍♂️', label: 'Walk' },
      { id: 'moon', emoji: '🌙', label: 'Sleep' },
      { id: 'fitness', emoji: '🏋️‍♂️', label: 'Workout' },
    ],
  },
  {
    id: 'learning',
    titleKey: 'iconCatLearning',
    icons: [
      { id: 'book', emoji: '📚', label: 'Read' },
      { id: 'brush', emoji: '🖌️', label: 'Art' },
      { id: 'tv', emoji: '📺', label: 'Media' },
      { id: 'pc', emoji: '💻', label: 'PC work' },
      { id: 'study', emoji: '✏️', label: 'Study' },
      { id: 'language', emoji: '🌐', label: 'Language' },
    ],
  },
];

// iconId から所属カテゴリを検索
function findCategoryIdByIconId(iconId: string | null | undefined): IconCategoryId | null {
  if (!iconId) return null;
  const category = ICON_CATEGORIES.find((cat) => cat.icons.some((opt) => opt.id === iconId));
  return category?.id ?? null;
}

export const IconPicker = memo(function IconPicker({ value, onChange }: IconPickerProps) {
  const theme = useTheme();
  const neon = theme.neonGreen.val?.toString() ?? '#39FF14';

  // 初期カテゴリは現在の value に合わせる（なければ basic）
  const [activeCategoryId, setActiveCategoryId] = useState<IconCategoryId>(() => {
    const fromValue = findCategoryIdByIconId(value);
    return fromValue ?? (ICON_CATEGORIES[0]?.id ?? 'basic');
  });

  // value が変わったらカテゴリも追従
  useEffect(() => {
    const catId = findCategoryIdByIconId(value);
    if (catId && catId !== activeCategoryId) {
      setActiveCategoryId(catId);
    }
  }, [value, activeCategoryId]);

  const activeCategory = useMemo(
    () => ICON_CATEGORIES.find((cat) => cat.id === activeCategoryId) ?? ICON_CATEGORIES[0],
    [activeCategoryId],
  );

  return (
    <YStack gap="$4">
      {/* カテゴリタブ */}
      <XStack gap="$2" flexWrap="wrap">
        {ICON_CATEGORIES.map((cat) => {
          const isActive = cat.id === activeCategoryId;
          return (
            <Button
              size="$3"
              paddingHorizontal="$3"
              key={cat.id}
              borderRadius="$6"
              backgroundColor={isActive ? '$neonGreen' : '$surface'}
              color={isActive ? '#000' : '$muted'}
              borderWidth={1}
              borderColor={isActive ? '$neonGreen' : '$gray'}
              onPress={() => setActiveCategoryId(cat.id)}>
              {t(cat.titleKey as any)}
            </Button>
          );
        })}
      </XStack>

      {/* アクティブカテゴリのアイコン一覧 */}
      <YStack gap="$2">
        <Text color="$muted" fontSize={12} fontWeight="700" textTransform="uppercase">
          {t(activeCategory.titleKey as any)}
        </Text>

        <XStack flexWrap="wrap" gap="$3">
          {activeCategory.icons.map((opt) => {
            const active = value === opt.id;
            return (
              <Stack
                key={opt.id}
                width={56}
                height={56}
                borderRadius={16}
                borderWidth={2}
                borderColor={active ? neon : theme.gray.val?.toString() ?? '#444'}
                backgroundColor={active ? '$neonGreen' : '$surface'}
                alignItems="center"
                justifyContent="center"
                shadowColor={neon}
                shadowOpacity={active ? 0.6 : 0}
                shadowRadius={16}
                shadowOffset={{ width: 0, height: 6 }}>
                <Button
                  accessibilityLabel={opt.label}
                  size="$3"
                  backgroundColor="transparent"
                  width="100%"
                  height="100%"
                  onPress={() => onChange(opt.id)}>
                  <Text fontSize={28} textAlign="center">
                    {opt.emoji}
                  </Text>
                </Button>
              </Stack>
            );
          })}
        </XStack>
      </YStack>
    </YStack>
  );
});
