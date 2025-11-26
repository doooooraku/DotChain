import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { I18nManager } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input, ScrollView, Stack, Text, XStack } from 'tamagui';

import { useHabitStore } from '@/src/stores/habitStore';

const ICONS = ['flame', 'water', 'book', 'walk', 'moon', 'fitness', 'sparkles', 'brush', 'tv'];

export default function EditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const habits = useHabitStore((s) => s.habits);
  const saveHabit = useHabitStore((s) => s.saveHabit);
  const removeHabit = useHabitStore((s) => s.removeHabit);

  const target = habits.find((h) => h.id === id);
  const [name, setName] = useState(target?.title ?? '');
  const [selectedIcon, setSelectedIcon] = useState(target?.icon ?? 'flame');
  const isRTL = I18nManager.isRTL;
  const isEdit = Boolean(id);

  useEffect(() => {
    setName(target?.title ?? '');
    setSelectedIcon(target?.icon ?? 'flame');
  }, [target?.title, target?.icon]);

  const handleSave = async () => {
    await saveHabit({
      id: target?.id,
      title: name || 'New Habit',
      icon: selectedIcon,
      color: 'neonGreen',
    });
    router.back();
  };

  const handleDelete = async () => {
    if (target?.id) {
      await removeHabit(target.id);
    }
    router.back();
  };

  return (
    <ScrollView
      backgroundColor="$background"
      flex={1}
      contentContainerStyle={{ padding: 16, gap: 16 }}>
      <Text color="$text" fontSize={22} fontWeight="700">
        {isEdit ? 'Edit Habit' : 'New Habit'}
      </Text>

      <Text color="$text" fontWeight="700">
        Icon
      </Text>
      <XStack flexWrap="wrap" gap="$3" flexDirection={isRTL ? 'row-reverse' : 'row'}>
        {ICONS.map((icon) => {
          const active = selectedIcon === icon;
          return (
            <Stack
              key={icon}
              width={56}
              height={56}
              borderRadius={16}
              borderWidth={2}
              borderColor={active ? '$neonGreen' : '$gray'}
              alignItems="center"
              justifyContent="center"
              backgroundColor={active ? '$neonGreen' : '$surface'}
              onPress={() => setSelectedIcon(icon)}
              asChild>
              <Button
                accessibilityLabel={icon}
                backgroundColor="transparent"
                width="100%"
                height="100%"
                icon={<Ionicons name={icon as any} size={24} color={active ? '#000' : '#EEE'} />}
              />
            </Stack>
          );
        })}
      </XStack>

      <Text color="$text" fontWeight="700">
        Name (最大20文字)
      </Text>
      <Input
        value={name}
        onChangeText={(v) => setName(v.slice(0, 20))}
        placeholder="Name your habit..."
        placeholderTextColor="#888888"
        backgroundColor="$surface"
        borderColor="$gray"
        color="$text"
      />

      <Button backgroundColor="$neonGreen" color="#000" borderRadius="$4" onPress={handleSave}>
        {isEdit ? 'Save Changes' : 'Create Habit'}
      </Button>

      {isEdit && (
        <Button backgroundColor="$background" color="$neonPink" onPress={handleDelete}>
          Delete Habit
        </Button>
      )}
    </ScrollView>
  );
}
