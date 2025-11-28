import { useEffect, useMemo } from 'react';
import { I18nManager } from 'react-native';
import { Href, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Stack, Text, XStack, YStack, Button, Spinner, useTheme } from 'tamagui';

import { HabitButton } from '@/src/features/habit/HabitButton';
import { HeatmapChain } from '@/src/features/habit/HeatmapChain';
import { useHabitRecord } from '@/src/features/habit/useHabitRecord';
import { selectHeatmap, useHabitStore } from '@/src/stores/habitStore';
import { useTranslation } from '@/src/core/i18n/i18n';
import { useSettingsStore } from '@/src/stores/settingsStore';

const seedHabits = [
  { title: 'Drink Water', icon: 'water', color: 'neonGreen' },
  { title: 'Read Book', icon: 'book', color: 'neonGreen' },
  { title: 'Walk', icon: 'walk', color: 'neonGreen' },
];

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { record } = useHabitRecord();
  const habits = useHabitStore((s) => s.habits);
  const today = useHabitStore((s) => s.today);
  const loadAll = useHabitStore((s) => s.loadAll);
  const saveHabit = useHabitStore((s) => s.saveHabit);
  const loading = useHabitStore((s) => s.loading);
  const error = useHabitStore((s) => s.error);
  const isRTL = I18nManager.isRTL;
  const hapticsOn = useSettingsStore((s) => s.haptics);
  const theme = useTheme();
  const neon = theme.neonGreen.val?.toString() ?? '#39FF14';
  const muted = theme.muted.val?.toString() ?? '#888888';
  const bg = theme.background.val?.toString() ?? '#000000';

  const heatmapSet = useHabitStore(selectHeatmap(habits[0]?.id ?? ''));

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  useEffect(() => {
    // 初期データがない場合にサンプルを1度だけ投入
    if (habits.length === 0) {
      seedHabits.forEach((h) => saveHabit(h));
    }
  }, [habits.length, saveHabit]);

  const streak = useMemo(() => Object.values(today).filter(Boolean).length + 11, [today]);

  return (
    <ScrollView
      backgroundColor="$background"
      flex={1}
      contentContainerStyle={{ padding: 16, paddingBottom: 140 }}>
      {/* ヘッダー */}
      <XStack
        justifyContent="space-between"
        alignItems="center"
        marginTop="$3"
        flexDirection={isRTL ? 'row-reverse' : 'row'}>
        <Button
          size="$4"
          circular
          backgroundColor="$surface"
          borderColor="$gray"
          borderWidth={1}
          onPress={() => router.push('/pro' as Href)}
          icon={<Ionicons name="trophy" size={22} color={neon} />}
        />
        <Button
          size="$4"
          circular
          backgroundColor="$surface"
          borderColor="$gray"
          borderWidth={1}
          onPress={() => router.push('/settings' as Href)}
          icon={<Ionicons name="settings" size={22} color="#EEEEEE" />}
        />
      </XStack>

      {/* ストリーク */}
      <YStack
        marginTop="$4"
        backgroundColor="$surface"
        padding="$4"
        borderRadius="$4"
        borderWidth={1}
        borderColor="$gray"
        gap="$2">
          <Text color={muted} letterSpacing={1}>
            {t('daysStreak')}
          </Text>
        <Text color={neon} fontSize={28} fontWeight="800">
          🔥 {streak}
        </Text>
      </YStack>

      {/* ヒートマップ */}
      <YStack marginTop="$4" gap="$2">
          <Text color={muted} letterSpacing={1}>
            {t('yourChain')}
          </Text>
        <HeatmapChain days={14} activeDates={heatmapSet} colorActive={neon} colorBg={bg} colorBorder={theme.gray.val?.toString() ?? '#222'} />
      </YStack>

      {/* 習慣ボタン */}
      <YStack gap="$4" marginTop="$4">
        {loading && (
          <XStack gap="$2" alignItems="center">
            <Spinner color="$neonGreen" />
            <Text color="$muted">読み込み中...</Text>
          </XStack>
        )}
        {error && (
          <Text color="$error" fontWeight="700">
            {error}
          </Text>
        )}
        {!hapticsOn && (
          <Text color="$warning" fontWeight="700">
            {t('hapticOff')}
          </Text>
        )}
        {habits.map((habit, idx) => (
          <HabitButton
            key={habit.id}
            label={habit.title}
            size={idx === 0 ? 'big' : 'medium'}
            active={Boolean(today[habit.id])}
            iconName={habit.icon as any}
            onPress={() => record(habit.id)}
            onLongPress={() => router.push(`/habit/edit?id=${habit.id}` as Href)}
          />
        ))}
      </YStack>

      {/* FAB */}
      <Stack
        position="absolute"
        bottom={32}
        right={isRTL ? undefined : 24}
        left={isRTL ? 24 : undefined}
        width={64}
        height={64}
        borderRadius={32}
        backgroundColor={neon}
        alignItems="center"
        justifyContent="center"
        shadowColor={neon}
        shadowOpacity={0.6}
        shadowRadius={18}
        shadowOffset={{ width: 0, height: 6 }}
        onPress={() => router.push('/habit/edit' as Href)}
        asChild>
        <Button
          accessibilityLabel="Add habit"
          backgroundColor="transparent"
          width="100%"
          height="100%"
          icon={<Ionicons name="add" size={28} color={bg} />}
        />
      </Stack>
    </ScrollView>
  );
}
