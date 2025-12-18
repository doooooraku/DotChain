import { useEffect, useState, type ComponentProps } from 'react';
import { Href, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Stack, Text, XStack, YStack, Button, Spinner, useTheme } from 'tamagui';

import { HabitButton } from '@/src/features/habit/HabitButton';
import { HeatmapChain } from '@/src/features/habit/HeatmapChain';
import { TutorialOverlay } from '@/src/features/tutorial/TutorialOverlay';
import { useHabitRecord } from '@/src/features/habit/useHabitRecord';
import {
  selectHeatmapIntensity,
  selectStreak,
  selectAllDoneDays,
  useHabitStore,
} from '@/src/stores/habitStore';
import { useTranslation } from '@/src/core/i18n/i18n';
import { useSettingsStore } from '@/src/stores/settingsStore';

type TutorialStep = 'none' | 'welcome' | 'pressFab' | 'pressHabit' | 'explainChain';
type IconName = ComponentProps<typeof Ionicons>['name'];

export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ fromTutorial?: string }>();
  const { t } = useTranslation();
  const { record } = useHabitRecord();

  const habits = useHabitStore((s) => s.habits);
  const today = useHabitStore((s) => s.today);
  const loadAll = useHabitStore((s) => s.loadAll);
  const loading = useHabitStore((s) => s.loading);
  const error = useHabitStore((s) => s.error);
  const hapticsOn = useSettingsStore((s) => s.haptics);
  const heatmapDays = useSettingsStore((s) => s.heatmapDays ?? 60);
  const electricFlow = useSettingsStore((s) => s.electricFlow);
  const { counts: heatmapCounts, maxLevel } = useHabitStore(selectHeatmapIntensity);
  const streak = useHabitStore(selectStreak);
  const allDoneDays = useHabitStore(selectAllDoneDays);

  const theme = useTheme();
  const neon = theme.neonGreen.val?.toString() ?? '#39FF14';
  const muted = theme.muted.val?.toString() ?? '#888888';
  const bg = theme.background.val?.toString() ?? '#000000';
  // 広告機能削除: Free/Pro 共通余白にする
  const fabBottom = 32;
  const listPaddingBottom = 140;

  const hasSeenOnboarding = useSettingsStore((s) => s.hasSeenOnboarding);
  const setHasSeenOnboarding = useSettingsStore((s) => s.setHasSeenOnboarding);
  const [tutorialStep, setTutorialStep] = useState<TutorialStep>('none');
  const isPressFabStep = !hasSeenOnboarding && tutorialStep === 'pressFab';

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  useEffect(() => {
    if (!hasSeenOnboarding) {
      setTutorialStep('welcome');
    }
  }, [hasSeenOnboarding]);

  useEffect(() => {
    if (hasSeenOnboarding) return;
    if (params.fromTutorial === '1' && habits.length >= 1) {
      setTutorialStep('pressHabit');
    }
  }, [params.fromTutorial, habits.length, hasSeenOnboarding]);

  const handlePressAdd = () => {
    if (!hasSeenOnboarding && tutorialStep === 'pressFab') {
      router.push('/habit/edit?tutorial=1' as Href);
    } else {
      router.push('/habit/edit' as Href);
    }
  };

  const renderHabitButtons = () =>
    habits.map((habit, idx) => {
      const isFirstHabit = idx === 0;
      const isTutorialTarget = !hasSeenOnboarding && tutorialStep === 'pressHabit' && isFirstHabit;

      const handlePressHabit = () => {
        record(habit.id);
        if (isTutorialTarget) {
          setTutorialStep('explainChain');
        }
      };

      return (
        <HabitButton
          key={habit.id}
          label={habit.title}
          size={idx === 0 ? 'big' : 'medium'}
          active={Boolean(today[habit.id])}
          iconName={habit.icon as IconName}
          onPress={handlePressHabit}
          onLongPress={() => router.push(`/habit/edit?id=${habit.id}` as Href)}
        />
      );
    });

  return (
    <Stack flex={1} backgroundColor="$background">
      <YStack padding={16} paddingBottom={0}>
        {/* ヘッダー（右側に Pro / Settings ボタンのみ） */}
        <XStack justifyContent="flex-end" alignItems="center">
          <XStack gap="$3">
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
        </XStack>

      {/* ストリーク + All Done Days */}
      <YStack
        marginTop="$4"
        backgroundColor="$surface"
        padding="$4"
        borderRadius="$4"
        borderWidth={1}
        borderColor="$gray"
        gap="$3">
        <XStack justifyContent="space-between" alignItems="flex-end">
          <YStack gap="$1">
            <Text color={muted} letterSpacing={1}>
              {t('daysStreak')}
            </Text>
            <Text color={neon} fontSize={28} fontWeight="800">
              🔥 {streak}
            </Text>
          </YStack>

          <YStack gap="$1" alignItems="flex-end">
            <Text color={muted} letterSpacing={1}>
              {t('allDoneDays')}
            </Text>
            <Text color={neon} fontSize={28} fontWeight="800">
              ✅ {allDoneDays}
            </Text>
          </YStack>
        </XStack>
      </YStack>

        {/* ヒートマップ（横スクロール） */}
        <YStack marginTop="$4" gap="$2">
          <Text color={muted} letterSpacing={1}>
            {t('yourChain')}
          </Text>
          <Text color={muted} fontSize={12}>
            {t('heatmapSummaryPrefix')}
            {heatmapDays}
            {t('heatmapSummarySuffix')}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 4 }}>
            <HeatmapChain
              days={heatmapDays}
              intensityByDate={heatmapCounts}
              maxLevel={maxLevel}
              colorActive={neon}
              colorBg={bg}
              colorBorder={theme.gray.val?.toString() ?? '#222'}
              flowEnabled={electricFlow}
            />
         </ScrollView>
          <XStack justifyContent="space-between">
            <Text color={muted} fontSize={10}>
              {'◀ '}
              {heatmapDays}
              {t('heatmapAgoSuffix')}
            </Text>
            <Text color={muted} fontSize={10}>
              {t('heatmapToday')}
              {' ▶'}
            </Text>
          </XStack>
        </YStack>
      </YStack>

      {/* 習慣ボタンリスト（縦スクロール） */}
      <ScrollView
        flex={1}
        backgroundColor="$background"
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: listPaddingBottom }}>
        <YStack gap="$4">
          {loading && (
            <XStack gap="$2" alignItems="center">
            <Spinner color="$neonGreen" />
              <Text color="$muted">{t('homeLoading')}</Text>
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

          {renderHabitButtons()}
        </YStack>
      </ScrollView>

      {/* FAB */}
      <Stack
        position="absolute"
        bottom={fabBottom}
        right={24}
        width={64}
        height={64}
        borderRadius={32}
        backgroundColor={neon}
        borderWidth={isPressFabStep ? 2 : 0}
        borderColor={isPressFabStep ? '#FFFFFF' : 'transparent'}
        alignItems="center"
        justifyContent="center"
        shadowColor={neon}
        shadowOpacity={isPressFabStep ? 1 : 0.8}
        shadowRadius={isPressFabStep ? 28 : 24}
        shadowOffset={{ width: 0, height: 6 }}
        zIndex={isPressFabStep ? 200 : 10}
        onPress={handlePressAdd}
        asChild>
        <Button
          accessibilityLabel={t('homeAddHabitLabel')}
          backgroundColor="transparent"
          width="100%"
          height="100%"
          icon={<Ionicons name="add" size={28} color={bg} />}
        />
      </Stack>

      {/* チュートリアルオーバーレイ */}
      {!hasSeenOnboarding && tutorialStep === 'welcome' && (
        <TutorialOverlay
          message={t('tutorialWelcomeBody')}
          buttonLabel={t('tutorialNext')}
          onNext={() => setTutorialStep('pressFab')}
          backgroundTapEnabled
          verticalAlign="center"
        />
      )}

      {!hasSeenOnboarding && tutorialStep === 'pressFab' && (
        <TutorialOverlay
          message={t('tutorialPressFabBody')}
          allowPassthrough
          backdropOpacity={0.55}
          verticalAlign="center"
        />
      )}

      {!hasSeenOnboarding && tutorialStep === 'pressHabit' && habits.length > 0 && (
        <TutorialOverlay
          message={t('tutorialPressHabitBody')}
          allowPassthrough
          backdropOpacity={0.55}
          verticalAlign="top"
        />
      )}

      {!hasSeenOnboarding && tutorialStep === 'explainChain' && (
        <TutorialOverlay
          message={t('tutorialExplainChainBody')}
          buttonLabel={t('tutorialStart')}
          onNext={() => {
            setHasSeenOnboarding(true);
            setTutorialStep('none');
          }}
          backgroundTapEnabled
          verticalAlign="bottom"
        />
      )}

    </Stack>
  );
}
