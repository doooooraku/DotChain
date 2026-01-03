import React from 'react';
import { Alert, Platform } from 'react-native';
import { Href, useRouter } from 'expo-router';
import { ScrollView, Stack, Switch, Text, XStack, YStack, Button, useTheme, Popover, ToggleGroup, Adapt } from 'tamagui';
import { PortalProvider } from '@tamagui/portal';
import { Check } from '@tamagui/lucide-icons';
import { setLang as setLangGlobal } from '@/src/core/i18n/i18n';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSettingsStore, type HeatmapDaysOption } from '@/src/stores/settingsStore';
import { useProStore } from '@/src/stores/proStore';
import { useUiStore } from '@/src/stores/uiStore';
import { useTranslation, type Lang, type TranslationKey } from '@/src/core/i18n/i18n';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { resetAndSeedSevenDays } from '@/src/features/habit/debugSeed';
import { IAP_DEBUG } from '@/src/core/debug';

export default function SettingsScreen() {
  const sound = useSettingsStore((s) => s.sound);
  const haptics = useSettingsStore((s) => s.haptics);
  const setSound = useSettingsStore((s) => s.setSound);
  const setHaptics = useSettingsStore((s) => s.setHaptics);
  const tapSound = useSettingsStore((s) => s.tapSound);
  const setTapSound = useSettingsStore((s) => s.setTapSound);
  const electricFlow = useSettingsStore((s) => s.electricFlow);
  const setElectricFlow = useSettingsStore((s) => s.setElectricFlow);
  const heatmapDays = useSettingsStore((s) => s.heatmapDays ?? 7);
  const setHeatmapDays = useSettingsStore((s) => s.setHeatmapDays);
  const themeName = useSettingsStore((s) => s.theme);
  const setTheme = useSettingsStore((s) => s.setTheme);
  const reminderEnabled = useSettingsStore((s) => s.reminderEnabled);
  const reminderTime = useSettingsStore((s) => s.reminderTime);
  const setReminderEnabled = useSettingsStore((s) => s.setReminderEnabled);
  const setReminderTime = useSettingsStore((s) => s.setReminderTime);
  const { t, lang, setLang: setLangStore } = useTranslation();
  const theme = useTheme();
  const isPro = useProStore((s) => s.isPro);
  const restorePurchase = useProStore((s) => s.restore);
  const proLoading = useProStore((s) => s.isLoading);
  const showToast = useUiStore((s) => s.showToast);
  const [langOpen, setLangOpen] = React.useState(false);
  const insets = useSafeAreaInsets();
  const listBottomPad = Math.max(12, insets.bottom + 12);

  const heatmapOptions: HeatmapDaysOption[] = [7, 30, 60, 180, 365];
  const languageOptions: Lang[] = [
    'en',
    'ja',
    'fr',
    'es',
    'de',
    'it',
    'pt',
    'ru',
    'zhHans',
    'zhHant',
    'ko',
    'hi',
    'id',
    'th',
    'vi',
    'tr',
    'nl',
    'sv',
  ];
  const LANGUAGE_META: Record<Lang, { flag: string; labelKey: TranslationKey }> = {
    en: { flag: '🇺🇸', labelKey: 'languageNameEn' },
    ja: { flag: '🇯🇵', labelKey: 'languageNameJa' },
    fr: { flag: '🇫🇷', labelKey: 'languageNameFr' },
    es: { flag: '🇪🇸', labelKey: 'languageNameEs' },
    de: { flag: '🇩🇪', labelKey: 'languageNameDe' },
    it: { flag: '🇮🇹', labelKey: 'languageNameIt' },
    pt: { flag: '🇵🇹', labelKey: 'languageNamePt' },
    ru: { flag: '🇷🇺', labelKey: 'languageNameRu' },
    zhHans: { flag: '🇨🇳', labelKey: 'languageNameZhHans' },
    zhHant: { flag: '🇹🇼', labelKey: 'languageNameZhHant' },
    ko: { flag: '🇰🇷', labelKey: 'languageNameKo' },
    hi: { flag: '🇮🇳', labelKey: 'languageNameHi' },
    id: { flag: '🇮🇩', labelKey: 'languageNameId' },
    th: { flag: '🇹🇭', labelKey: 'languageNameTh' },
    vi: { flag: '🇻🇳', labelKey: 'languageNameVi' },
    tr: { flag: '🇹🇷', labelKey: 'languageNameTr' },
    nl: { flag: '🇳🇱', labelKey: 'languageNameNl' },
    sv: { flag: '🇸🇪', labelKey: 'languageNameSv' },
  };
  const router = useRouter();
  const [showTimePicker, setShowTimePicker] = React.useState(false);

  const HEATMAP_LABEL_KEY: Record<HeatmapDaysOption, TranslationKey> = {
    7: 'heatmapRange7',
    30: 'heatmapRange30',
    60: 'heatmapRange60',
    180: 'heatmapRange180',
    365: 'heatmapRange365',
  };

  const timeStringToDate = (timeStr: string) => {
    const [hStr = '8', mStr = '0'] = timeStr.split(':');
    let hour = Number(hStr);
    let minute = Number(mStr);
    if (!Number.isFinite(hour) || hour < 0 || hour > 23) hour = 8;
    if (!Number.isFinite(minute) || minute < 0 || minute > 59) minute = 0;
    const d = new Date();
    d.setHours(hour, minute, 0, 0);
    return d;
  };

  const handleTimeChange = (_event: any, selected?: Date) => {
    if (Platform.OS === 'android') {
      setShowTimePicker(false);
    }
    if (selected) {
      const h = selected.getHours().toString().padStart(2, '0');
      const m = selected.getMinutes().toString().padStart(2, '0');
      void setReminderTime(`${h}:${m}`);
    }
  };

  const handleRestore = async () => {
    try {
      const result = await restorePurchase();
      if (result.hasActive) {
        Alert.alert(t('restore'), t('restoreSuccess'));
      } else {
        showToast({ kind: 'info', message: t('restoreNotFound') });
      }
    } catch (e: any) {
      console.error('[IAP] restore failed', e);
      const msg = e?.message ?? String(e);
      showToast({
        kind: 'error',
        message: IAP_DEBUG ? `Restore failed: ${msg}` : t('restoreFailed'),
      });
    }
  };

  return (
    <PortalProvider>
      <ScrollView
        backgroundColor="$background"
        flex={1}
        contentContainerStyle={{ padding: 16, gap: 16 }}>
        <Text color="$text" fontSize={22} fontWeight="700">
          {t('settings')}
        </Text>

      <Section title={t('language')}>
        <Popover open={langOpen} onOpenChange={setLangOpen} placement="bottom-start">
          <Popover.Trigger asChild>
            <Button
              width="100%"
              justifyContent="space-between"
              borderWidth={1}
              borderColor="$gray"
              backgroundColor="$surface"
              borderRadius="$4"
              padding="$3">
              <XStack alignItems="center" gap="$2">
                <Text fontSize={18}>{LANGUAGE_META[lang].flag}</Text>
                <Text color="$text" fontSize={15} fontWeight="700">
                  {t(LANGUAGE_META[lang].labelKey)} ({lang.toUpperCase()})
                </Text>
              </XStack>
            </Button>
          </Popover.Trigger>

          <Adapt when="maxLg">
            <Popover.Sheet modal>
              <Popover.Sheet.Frame padding="$2">
                <Popover.Sheet.ScrollView
                  contentContainerStyle={{ paddingRight: 8, paddingBottom: listBottomPad }}
                  scrollIndicatorInsets={{ right: 6 }}>
                  <Adapt.Contents />
                </Popover.Sheet.ScrollView>
              </Popover.Sheet.Frame>
              <Popover.Sheet.Overlay />
              <Popover.Sheet.Handle />
            </Popover.Sheet>
          </Adapt>

          <Popover.Content
            elevate
            borderRadius="$4"
            borderWidth={1}
            borderColor="$gray"
            backgroundColor="$surface"
            padding="$2"
            maxHeight={320}
            minWidth={260}
            width="$18">
            <Popover.ScrollView
              showsVerticalScrollIndicator
              persistentScrollbar
              indicatorStyle="white"
              contentContainerStyle={{ paddingRight: 8, paddingBottom: listBottomPad }}
              style={{ paddingRight: 8 }}
              scrollIndicatorInsets={{ right: 6 }}>
              <YStack gap="$1" paddingVertical="$1">
                {languageOptions.map((code) => {
                  const meta = LANGUAGE_META[code];
                  const active = lang === code;
                  return (
                    <Button
                      key={code}
                      size="$3"
                      justifyContent="space-between"
                      backgroundColor={active ? '$surface' : '$background'}
                      borderColor={active ? '$neonGreen' : '$gray'}
                      borderWidth={1}
                      onPress={() => {
                        // i18nストアを即時更新（全画面リアクティブに切替）
                        setLangStore(code as Lang);
                        // グローバルヘルパーも更新（他モジュールの参照用）
                        setLangGlobal(code as Lang);
                        setLangOpen(false);
                      }}>
                      <XStack alignItems="center" gap="$2">
                        <Text>{meta.flag}</Text>
                        <Text color="$text">
                          {t(meta.labelKey)} ({code.toUpperCase()})
                        </Text>
                      </XStack>
                      {active && <Check size={16} color="#39FF14" />}
                    </Button>
                  );
                })}
              </YStack>
            </Popover.ScrollView>
          </Popover.Content>
        </Popover>
      </Section>

      <Section title={t('sound')}>
        <Row>
          <Text color="$text" fontSize={15}>
            {t('soundSwitchLabel')}
          </Text>
          <SettingsSwitch checked={sound} onCheckedChange={setSound} />
        </Row>
        <XStack gap="$3" alignItems="center">
          <Text color="$text">{t('tapSoundLabel')}</Text>
        </XStack>
        <ToggleGroup
          type="single"
          value={tapSound}
          onValueChange={(v) => v && setTapSound(v as 'click' | 'pop')}
          orientation="horizontal"
          disablePassBorderRadius
          width="100%"
          borderRadius="$4"
          borderWidth={1}
          borderColor="$gray"
          backgroundColor="$background"
          overflow="hidden">
          <ToggleGroup.Item
            value="click"
            flex={1}
            paddingVertical="$2"
            borderRightWidth={1}
            borderColor="$gray"
            backgroundColor={tapSound === 'click' ? '$surface' : '$background'}>
            <Text color={tapSound === 'click' ? '$text' : '$muted'} textAlign="center" fontWeight="700">
              {t('click')}
            </Text>
          </ToggleGroup.Item>
          <ToggleGroup.Item
            value="pop"
            flex={1}
            paddingVertical="$2"
            backgroundColor={tapSound === 'pop' ? '$surface' : '$background'}>
            <Text color={tapSound === 'pop' ? '$text' : '$muted'} textAlign="center" fontWeight="700">
              {t('pop')}
            </Text>
          </ToggleGroup.Item>
        </ToggleGroup>
      </Section>

      <Section title={t('haptics')}>
        <Row>
          <Text color="$text" fontSize={15}>
            {t('hapticsDescription')}
          </Text>
          <SettingsSwitch checked={haptics} onCheckedChange={setHaptics} />
        </Row>
      </Section>

      <Section title={t('theme')}>
        <Text color="$muted" fontSize={13} marginBottom="$2">
          {t('themeDesc')}
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <XStack gap="$4" paddingVertical="$2" paddingHorizontal="$1">
            <ThemeCard
              label={t('themeDarkLabel')}
              backgroundColor={theme?.background?.val?.toString() ?? '#04060A'}
              accentColor={theme?.color?.val?.toString() ?? '#E6E6E6'}
              active={themeName === 'dark'}
              onPress={() => setTheme('dark')}
              proLabel={t('proBadgeShort')}
            />
            <ThemeCard
              label={t('themeNeonPinkLabel')}
              backgroundColor="#150013"
              accentColor="#FF65D8"
              active={themeName === 'neonPink'}
              onPress={() => {
                if (!isPro) {
                  Alert.alert(t('proOnlyTitle'), t('proOnlyTheme'), [
                    { text: t('cancel'), style: 'cancel' },
                    { text: t('openPro'), onPress: () => router.push('/pro' as Href) },
                  ]);
                  return;
                }
                setTheme('neonPink');
              }}
              isPro
              isLocked={!isPro}
              proLabel={t('proBadgeShort')}
            />
            <ThemeCard
              label={t('themeCyberBlueLabel')}
              backgroundColor="#00131A"
              accentColor="#00C8FF"
              active={themeName === 'cyberBlue'}
              onPress={() => {
                if (!isPro) {
                  Alert.alert(t('proOnlyTitle'), t('proOnlyTheme'), [
                    { text: t('cancel'), style: 'cancel' },
                    { text: t('openPro'), onPress: () => router.push('/pro' as Href) },
                  ]);
                  return;
                }
                setTheme('cyberBlue');
              }}
              isPro
              isLocked={!isPro}
              proLabel={t('proBadgeShort')}
            />
          </XStack>
        </ScrollView>
        <Text color="$muted" fontSize={12} marginTop="$2">
          {t('freeThemeNote')}
        </Text>
        <Text color="$muted" fontSize={11} marginTop="$1">
          {t('proThemeNote')}
        </Text>
      </Section>

      {/* リマインダー通知 */}
      <Section title={t('reminderSectionTitle')}>
        <Row>
          <Text color="$text" fontSize={15}>
            {t('reminderToggleLabel')}
          </Text>
          <SettingsSwitch checked={reminderEnabled} onCheckedChange={setReminderEnabled} />
        </Row>

        {reminderEnabled && (
          <>
            <Row>
              <Text color="$text" fontSize={15}>
                {t('reminderTimeLabel')}
              </Text>
              {Platform.OS === 'ios' ? (
                <DateTimePicker
                  value={timeStringToDate(reminderTime)}
                  mode="time"
                  display="spinner"
                  textColor="#FFFFFF"
                  themeVariant="dark"
                  onChange={handleTimeChange}
                />
              ) : (
                <Button
                  size="$3"
                  borderRadius="$4"
                  borderWidth={1}
                  borderColor="$gray"
                  backgroundColor="$surface"
                  color="$text"
                  onPress={() => setShowTimePicker(true)}>
                  {reminderTime}
                </Button>
              )}
            </Row>
            {Platform.OS === 'android' && showTimePicker && (
              <DateTimePicker
                value={timeStringToDate(reminderTime)}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}
          </>
        )}
      </Section>

      {/* ヒートマップ表示期間 */}
      <Section title={t('heatmapRangeTitle')}>
        <Text color="$muted" fontSize={13} marginBottom="$2">
          {t('heatmapRangeHelp')}
        </Text>
        <XStack flexWrap="wrap" gap="$2" marginTop="$1">
          {heatmapOptions.map((days) => {
            const active = heatmapDays === days;
            const labelKey = HEATMAP_LABEL_KEY[days];

            return (
              <Button
                key={days}
                size="$3"
                borderRadius="$6"
                backgroundColor={active ? '$neonGreen' : '$surface'}
                color={active ? '$background' : '$text'}
                borderWidth={1}
                borderColor={active ? '$neonGreen' : '$gray'}
                onPress={() => setHeatmapDays(days)}>
                {t(labelKey as any)}
              </Button>
            );
          })}
        </XStack>
      </Section>

      {/* 電流アニメーションのON/OFF */}
      <Section title={t('flowEffectTitle')}>
        <Row>
          <Text color="$text" fontSize={15}>
            {t('flowEffectTitle')}
          </Text>
          <SettingsSwitch checked={electricFlow} onCheckedChange={setElectricFlow} />
        </Row>
        <Text color="$muted" fontSize={13} lineHeight={18}>
          {t('flowEffectHelp')}
        </Text>
      </Section>

      <Section title={t('restore')}>
        <Text color="$muted" fontSize={13} marginBottom="$2">
          {t('restoreDesc')}
        </Text>
        <XStack gap="$3">
          <Button
            size="$3"
            backgroundColor="$neonGreen"
            color="#000"
            borderRadius={999}
            onPress={() => router.push('/pro' as Href)}>
            {t('openPro')}
          </Button>
          <Button
            size="$3"
            backgroundColor="$surface"
            borderWidth={1}
            borderColor="$gray"
            borderRadius={999}
            color="$text"
            disabled={proLoading}
            onPress={handleRestore}>
            {t('restore')}
          </Button>
        </XStack>
      </Section>

      {__DEV__ && (
        <Section title="DEV ONLY: Test Data">
          <Text color="$warning" fontSize={13} lineHeight={18}>
            テスト用です。習慣と記録を全削除して、直近7日分のデータを作成します。
          </Text>
          <Button
            size="$3"
            backgroundColor="$warning"
            color="#000"
            borderRadius={999}
            onPress={() => {
              Alert.alert(
                'テストデータ作成',
                '習慣と記録を全削除して、直近7日分のテストデータを作成します。続行しますか？',
                [
                  { text: 'キャンセル', style: 'cancel' },
                  {
                    text: '実行',
                    style: 'destructive',
                    onPress: async () => {
                      await resetAndSeedSevenDays();
                      showToast({ kind: 'info', message: 'テストデータを作成しました。' });
                    },
                  },
                ],
              );
            }}>
            全リセット & 7日テスト作成
          </Button>
        </Section>
      )}
      </ScrollView>
    </PortalProvider>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <YStack
      backgroundColor="$surface"
      padding="$4"
      borderRadius="$4"
      borderWidth={1}
      borderColor="$gray"
      gap="$3">
      <Text color="$text" fontSize={16} fontWeight="700">
        {title}
      </Text>
      {children}
    </YStack>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <XStack alignItems="center" justifyContent="space-between">
      {children}
    </XStack>
  );
}

function SettingsSwitch({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (v: boolean) => void | Promise<void>;
}) {
  return (
    <Switch
      size="$3"
      checked={checked}
      onCheckedChange={(v) => onCheckedChange(Boolean(v))}
      backgroundColor={checked ? '$neonGreen' : '$gray'}
      borderColor="$gray"
      borderWidth={1}>
      <Switch.Thumb animation="bouncy" backgroundColor="$text" />
    </Switch>
  );
}

type ThemeCardProps = {
  label: string;
  backgroundColor: string;
  accentColor: string;
  active: boolean;
  onPress: () => void;
  isPro?: boolean;
  isLocked?: boolean;
  proLabel: string;
};

function ThemeCard({
  label,
  backgroundColor,
  accentColor,
  active,
  onPress,
  isPro,
  isLocked,
  proLabel,
}: ThemeCardProps) {
  return (
    <YStack alignItems="center" gap="$2">
      <Stack
        width={72}
        height={108}
        borderRadius="$4"
        backgroundColor={backgroundColor}
        borderWidth={active ? 3 : 1}
        borderColor={active ? accentColor : '$gray'}
        overflow="hidden"
        pressStyle={{ scale: 0.96, opacity: 0.95 }}
        onPress={onPress}
        position="relative"
      >
        <Stack width="100%" height={12} backgroundColor={accentColor} opacity={0.2} />
        <YStack padding="$2" gap="$1.5">
          <XStack gap="$1" alignItems="center">
            <Stack width={16} height={16} borderRadius={8} backgroundColor={accentColor} opacity={0.85} />
            <Stack width={32} height={4} borderRadius={2} backgroundColor="$gray" opacity={0.5} />
          </XStack>
          <Stack width="80%" height={4} borderRadius={2} backgroundColor="$gray" opacity={0.35} />
          <Stack width="60%" height={4} borderRadius={2} backgroundColor="$gray" opacity={0.35} />
        </YStack>
        {isLocked && (
          <Stack
            position="absolute"
            inset={0}
            backgroundColor="rgba(0,0,0,0.6)"
            alignItems="center"
            justifyContent="center">
            <Text fontSize={12} fontWeight="700" color="$text">
              {proLabel}
            </Text>
          </Stack>
        )}
      </Stack>
      <XStack gap="$1" alignItems="center">
        <Text color={active ? accentColor : '$muted'} fontSize={12} fontWeight={active ? '700' : '400'}>
          {label}
        </Text>
        {isPro && !isLocked && (
          <Text fontSize={10} color={active ? accentColor : '$muted'}>
            {proLabel}
          </Text>
        )}
      </XStack>
    </YStack>
  );
}
