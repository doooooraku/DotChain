import { memo, useEffect, useMemo, useState } from 'react';
import { Button, Stack, Text, XStack, YStack, ScrollView, useTheme } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';

import { useTranslation } from '@/src/core/i18n/i18n';
import {
  HABIT_ICON_CATEGORIES,
  type HabitIconName,
  type IconCategoryId,
  normalizeHabitIconName,
} from '@/src/features/habit/habitIcons';

export type IconPickerProps = {
  value?: string | null;
  onChange: (value: HabitIconName) => void;
};

// iconId から所属カテゴリを検索
function findCategoryIdByIconId(iconId: string | null | undefined): IconCategoryId | null {
  if (!iconId) return null;
  const category = HABIT_ICON_CATEGORIES.find((cat) => cat.icons.some((opt) => opt.id === iconId));
  return category?.id ?? null;
}

export const IconPicker = memo(function IconPicker({ value, onChange }: IconPickerProps) {
  const theme = useTheme();
  const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
  const { t } = useTranslation();

  const normalizedValue = normalizeHabitIconName(value);

  // 初期カテゴリは現在の value に合わせる（なければ basic）
  const [activeCategoryId, setActiveCategoryId] = useState<IconCategoryId>(() => {
    const fromValue = findCategoryIdByIconId(normalizedValue);
    return fromValue ?? (HABIT_ICON_CATEGORIES[0]?.id ?? 'basic');
  });

  // value が変わったらカテゴリも追従
  useEffect(() => {
    const catId = findCategoryIdByIconId(normalizeHabitIconName(value));
    // value が変わったときだけ初期カテゴリを合わせる（タブ操作で強制リセットしない）
    setActiveCategoryId((prev) => (catId && catId !== prev ? catId : prev));
  }, [value]);

  const activeCategory = useMemo(
    () => HABIT_ICON_CATEGORIES.find((cat) => cat.id === activeCategoryId) ?? HABIT_ICON_CATEGORIES[0],
    [activeCategoryId],
  );

  return (
    <YStack gap="$4">
      {/* カテゴリタブ */}
      <XStack gap="$2" flexWrap="wrap" justifyContent="center">
        {HABIT_ICON_CATEGORIES.map((cat) => {
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

        <ScrollView
          maxHeight={320}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 4 }}>
          <XStack flexWrap="wrap" gap="$3" justifyContent="center" width="100%">
            {activeCategory.icons.map((opt) => {
              const active = normalizedValue === opt.id;
              return (
                <Stack
                  key={opt.id}
                  width={56}
                  height={56}
                  borderRadius={16}
                  borderWidth={2}
                  borderColor={active ? neon : theme?.gray?.val?.toString() ?? '#444'}
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
                    <Ionicons
                      name={opt.id}
                      size={26}
                      color={active ? '#000000' : '#EEEEEE'}
                    />
                  </Button>
                </Stack>
              );
            })}
          </XStack>
        </ScrollView>
      </YStack>
    </YStack>
  );
});
