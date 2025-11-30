import { memo } from 'react';
import { Button, Stack, Text, XStack, useTheme } from 'tamagui';

export type IconPickerProps = {
  value?: string;
  onChange: (value: string) => void;
};

type IconOption = {
  id: string; // DBに保存する値（Ionicons名のまま）
  emoji: string;
  label: string;
};

const ICON_OPTIONS: IconOption[] = [
  { id: 'flame', emoji: '🔥', label: 'Fire' },
  { id: 'water', emoji: '💧', label: 'Water' },
  { id: 'book', emoji: '📚', label: 'Read' },
  { id: 'walk', emoji: '🚶‍♂️', label: 'Walk' },
  { id: 'moon', emoji: '🌙', label: 'Sleep' },
  { id: 'fitness', emoji: '🏋️‍♂️', label: 'Workout' },
  { id: 'sparkles', emoji: '✨', label: 'Shine' },
  { id: 'brush', emoji: '🖌️', label: 'Creative' },
  { id: 'tv', emoji: '📺', label: 'Watch' },
  { id: 'checkbox', emoji: '☑️', label: 'Other' },
];

export const IconPicker = memo(function IconPicker({ value, onChange }: IconPickerProps) {
  const theme = useTheme();
  const neon = theme.neonGreen.val?.toString() ?? '#39FF14';

  return (
    <XStack flexWrap="wrap" gap="$3" flexDirection="row">
      {ICON_OPTIONS.map((opt) => {
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
            shadowOffset={{ width: 0, height: 6 }}
            onPress={() => onChange(opt.id)}
            asChild>
            <Button
              accessibilityLabel={opt.label}
              backgroundColor="transparent"
              width="100%"
              height="100%">
              <Text fontSize={28} textAlign="center">
                {opt.emoji}
              </Text>
            </Button>
          </Stack>
        );
      })}
    </XStack>
  );
});
