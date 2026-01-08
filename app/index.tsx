import { Ionicons } from '@expo/vector-icons';
import { Href, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, ScrollView, Spinner, Stack, Text, useTheme, XStack, YStack } from 'tamagui';

import { useTranslation } from '@/src/core/i18n/i18n';
import { HabitButton } from '@/src/features/habit/HabitButton';
import { HeatmapChain } from '@/src/features/habit/HeatmapChain';
import { useHabitRecord } from '@/src/features/habit/useHabitRecord';
import { TutorialOverlay } from '@/src/features/tutorial/TutorialOverlay';
import {
  selectAllDoneDays,
  selectHeatmapIntensity,
  selectStreak,
  useHabitStore,
} from '@/src/stores/habitStore';
import { useSettingsStore } from '@/src/stores/settingsStore';

type TutorialStep = 'none' | 'welcome' | 'pressFab' | 'pressHabit' | 'explainChain';
export default function HomeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ fromTutorial?: string }>();
  const { t } = useTranslation();
  const { record } = useHabitRecord();
  const insets = useSafeAreaInsets();

  const habits = useHabitStore((s) => s.habits);
  const today = useHabitStore((s) => s.today);
  const loadAll = useHabitStore((s) => s.loadAll);
  const loading = useHabitStore((s) => s.loading);
  const error = useHabitStore((s) => s.error);
  const hapticsOn = useSettingsStore((s) => s.haptics);
  const heatmapDays = useSettingsStore((s) => s.heatmapDays ?? 7);
  const electricFlow = useSettingsStore((s) => s.electricFlow);
  const { counts: heatmapCounts, maxLevel } = useHabitStore(selectHeatmapIntensity);
  const streak = useHabitStore(selectStreak);
  const allDoneDays = useHabitStore(selectAllDoneDays);

  const theme = useTheme();
  const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
  const muted = theme?.muted?.val?.toString() ?? '#888888';
  const bg = theme?.background?.val?.toString() ?? '#000000';
  // 広告機能削除: Free/Pro 共通余白にする
  // Safe Area を考慮して FAB がシステムナビゲーションと被らないようにする
  const fabBottom = Math.max(32, insets.bottom + 16);
  const listPaddingBottom = 140 + insets.bottom;
  const togglingRef = useRef<Set<string>>(new Set());

  const hasSeenOnboarding = useSettingsStore((s) => s.hasSeenOnboarding);
  const setHasSeenOnboarding = useSettingsStore((s) => s.setHasSeenOnboarding);
  const [tutorialStep, setTutorialStep] = useState<TutorialStep>('none');
  const isPressFabStep = !hasSeenOnboarding && tutorialStep === 'pressFab';
  const heatmapScrollRef = useRef<any>(null);
  const [heatmapWidth, setHeatmapWidth] = useState<number | undefined>(undefined);
  const hasScrolledHeatmap = useRef(false);

  useEffect(() => {
    // 表示期間を変えたら最新側へ再スクロールさせる
    hasScrolledHeatmap.current = false;
  }, [heatmapDays]);

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

      const handlePressHabit = async () => {
        if (togglingRef.current.has(habit.id)) return;
        togglingRef.current.add(habit.id);
        try {
          const didComplete = await record(habit.id);
          if (didComplete) {
            if (isTutorialTarget) {
              setTutorialStep('explainChain');
            }
          }
        } finally {
          togglingRef.current.delete(habit.id);
        }
      };

      return (
        <HabitButton
          key={habit.id}
          label={habit.title}
          size={idx === 0 ? 'big' : 'medium'}
          active={Boolean(today[habit.id])}
          iconName={habit.icon}
          onPress={handlePressHabit}
          onLongPress={() => router.push(`/habit/edit?id=${habit.id}` as Href)}
        />
      );
    });

  return (
    <Stack flex={1} backgroundColor="$background">
      <YStack paddingHorizontal={16} paddingBottom={0} paddingTop={insets.top + 12}>
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

      {/* ストリーク / All Done を別カードに分割 */}
      <XStack marginTop="$4" gap="$3">
        <YStack
          flex={1}
          backgroundColor="$surface"
          padding="$4"
          borderRadius="$4"
          borderWidth={1}
          borderColor="$gray"
          gap="$2"
          alignItems="center"
          justifyContent="center"
          minHeight={88}>
          <Text color={muted} letterSpacing={1} fontWeight="700" textAlign="center">
            {t('daysStreak')}
          </Text>
          <XStack alignItems="center" gap="$2">
            <Ionicons name="trending-up-outline" size={44} color={neon} />
            <Text color={neon} fontSize={28} fontWeight="800" textAlign="center">
              {streak}
            </Text>
          </XStack>
        </YStack>

        <YStack
          flex={1}
          backgroundColor="$surface"
          padding="$4"
          borderRadius="$4"
          borderWidth={1}
          borderColor="$gray"
          gap="$2"
          alignItems="center"
          justifyContent="center"
          minHeight={88}>
          <Text color={muted} letterSpacing={1} fontWeight="700" textAlign="center">
            {t('allDoneDays')}
          </Text>
          <XStack alignItems="center" gap="$2">
            <Ionicons name="trophy-outline" size={34} color={neon} />
            <Text color={neon} fontSize={28} fontWeight="800" textAlign="center">
              {allDoneDays}
            </Text>
          </XStack>
        </YStack>
      </XStack>

        {/* ヒートマップ（7日は幅いっぱい、8日以上は横スクロール） */}
        <YStack
          marginTop="$4"
          gap="$2"
          width="100%"
          onLayout={(e: LayoutChangeEvent) => {
            const nextWidth = Math.round(e.nativeEvent.layout.width);
            if (nextWidth && nextWidth !== heatmapWidth) {
              setHeatmapWidth(nextWidth);
            }
          }}>
          <Text color={muted} letterSpacing={1}>
            {t('yourChain')}
          </Text>
          <Text color={muted} fontSize={12}>
            {t('heatmapSummaryPrefix')}
            {heatmapDays}
            {t('heatmapSummarySuffix')}
          </Text>
          {heatmapDays === 7 ? (
            <YStack paddingVertical="$2" width="100%">
              <HeatmapChain
                days={heatmapDays}
                intensityByDate={heatmapCounts}
                maxLevel={maxLevel}
                colorActive={neon}
                colorBg={bg}
                colorBorder={theme?.gray?.val?.toString() ?? '#222'}
                flowEnabled={electricFlow}
                variant="week"
                containerWidth={heatmapWidth}
              />
            </YStack>
          ) : (
            <ScrollView
              ref={heatmapScrollRef}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 4 }}
              onContentSizeChange={() => {
                if (hasScrolledHeatmap.current) return;
                (heatmapScrollRef.current as any)?.scrollToEnd?.({ animated: false });
                hasScrolledHeatmap.current = true;
              }}>
              <HeatmapChain
                days={heatmapDays}
                intensityByDate={heatmapCounts}
                maxLevel={maxLevel}
                colorActive={neon}
                colorBg={bg}
                colorBorder={theme?.gray?.val?.toString() ?? '#222'}
                flowEnabled={electricFlow}
              />
            </ScrollView>
          )}
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
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: listPaddingBottom,
        }}>
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
