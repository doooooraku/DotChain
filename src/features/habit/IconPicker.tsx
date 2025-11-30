import { memo, useMemo, useState } from 'react';
import { Button, Stack, Text, XStack, YStack, useTheme } from 'tamagui';

import { t } from '@/src/core/i18n/i18n';

export type IconPickerProps = {
  value?: string | null;
  onChange: (value: string) => void;
};

type IconOption = {
  id: string; // DB に保存する値（既存の Ionicons 名を流用）
  emoji: string;
  label: string;
};

type IconCategory = {
  id: string;
  titleKey: string; // i18n キー
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
    ],
  },
];

export const IconPicker = memo(function IconPicker({ value, onChange }: IconPickerProps) {
  const theme = useTheme();
  const neon = theme.neonGreen.val?.toString() ?? '#39FF14';

  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    ICON_CATEGORIES[0]?.id ?? 'basic',
  );

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
              key={cat.id}
              size="$2"
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
            const active = value ? value === opt.id : opt.id === 'checkbox';
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
