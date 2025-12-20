import React from 'react';
import { Alert, Platform } from 'react-native';
import { Href, useRouter } from 'expo-router';
import { ScrollView, Stack, Switch, Text, XStack, YStack, Button, useTheme, Select } from 'tamagui';
import { Check, ChevronDown } from '@tamagui/lucide-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSettingsStore, type HeatmapDaysOption } from '@/src/stores/settingsStore';
import { t, useTranslation, type Lang, type TranslationKey } from '@/src/core/i18n/i18n';

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
  const { lang, setLang: setLangStore } = useTranslation();
  const theme = useTheme();
  const isPro = useSettingsStore((s) => s.isPro ?? false);

  const heatmapOptions: HeatmapDaysOption[] = [7, 30, 60, 180, 365];
  const languageOptions: Lang[] = ['en','ja','fr','es','de','it','pt','ru','zh','ko','hi','id','th','vi','ms','tr','nl','sv'];
  const LANGUAGE_META: Record<Lang, { flag: string; labelKey: TranslationKey }> = {
    en: { flag: '🇺🇸', labelKey: 'languageNameEn' },
    ja: { flag: '🇯🇵', labelKey: 'languageNameJa' },
    fr: { flag: '🇫🇷', labelKey: 'languageNameFr' },
    es: { flag: '🇪🇸', labelKey: 'languageNameEs' },
    de: { flag: '🇩🇪', labelKey: 'languageNameDe' },
    it: { flag: '🇮🇹', labelKey: 'languageNameIt' },
    pt: { flag: '🇵🇹', labelKey: 'languageNamePt' },
    ru: { flag: '🇷🇺', labelKey: 'languageNameRu' },
    zh: { flag: '🇨🇳', labelKey: 'languageNameZh' },
    ko: { flag: '🇰🇷', labelKey: 'languageNameKo' },
    hi: { flag: '🇮🇳', labelKey: 'languageNameHi' },
    id: { flag: '🇮🇩', labelKey: 'languageNameId' },
    th: { flag: '🇹🇭', labelKey: 'languageNameTh' },
    vi: { flag: '🇻🇳', labelKey: 'languageNameVi' },
    ms: { flag: '🇲🇾', labelKey: 'languageNameMs' },
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

  return (
    <ScrollView
      backgroundColor="$background"
      flex={1}
      contentContainerStyle={{ padding: 16, gap: 16 }}>
      <Text color="$text" fontSize={22} fontWeight="700">
        {t('settings')}
      </Text>

      <Section title={t('language')}>
        <Select value={lang} onValueChange={(code) => setLangStore(code as Lang)}>
          <Select.Trigger
            iconAfter={ChevronDown}
            borderWidth={1}
            borderColor="$gray"
            backgroundColor="$surface"
            borderRadius="$4"
            padding="$3">
            <XStack alignItems="center" justifyContent="space-between" width="100%">
              <XStack alignItems="center" gap="$2">
                <Text fontSize={18}>{LANGUAGE_META[lang].flag}</Text>
                <Text color="$text" fontSize={15} fontWeight="700">
                  <Select.Value color="$text" />
                </Text>
              </XStack>
            </XStack>
          </Select.Trigger>

          <Select.Content zIndex={200000}>
            <Select.Viewport minWidth={280}>
              {languageOptions.map((code, index) => {
                const meta = LANGUAGE_META[code];
                return (
                  <Select.Item
                    key={code}
                    value={code}
                    index={index}
                    borderRadius="$3"
                    paddingVertical="$2">
                    <Select.ItemText color="$text">
                      {meta.flag} {t(meta.labelKey)} ({code.toUpperCase()})
                    </Select.ItemText>
                    <Select.ItemIndicator marginLeft="auto">
                      <Check size={16} />
                    </Select.ItemIndicator>
                  </Select.Item>
                );
              })}
            </Select.Viewport>
          </Select.Content>
        </Select>
      </Section>

      <Section title={t('sound')}>
        <Row>
          <Text color="$text" fontSize={15}>
            {t('soundSwitchLabel')}
          </Text>
          <Switch checked={sound} onCheckedChange={(v) => setSound(Boolean(v))} />
        </Row>
        <XStack gap="$3" alignItems="center">
          <Text color="$text">{t('tapSoundLabel')}</Text>
        </XStack>
        <XStack gap="$3" alignItems="center">
          <Text color="$text">{t('click')}</Text>
          <Switch
            checked={tapSound === 'pop'}
            onCheckedChange={(v) => setTapSound(v ? 'pop' : 'click')}
          />
          <Text color="$text">{t('pop')}</Text>
        </XStack>
      </Section>

      <Section title={t('haptics')}>
        <Row>
          <Text color="$text" fontSize={15}>
            {t('hapticsDescription')}
          </Text>
          <Switch checked={haptics} onCheckedChange={(v) => setHaptics(Boolean(v))} />
        </Row>
      </Section>

      <Section title={t('theme')}>
        <Text color="$muted" fontSize={13} marginBottom="$2">
          {t('themeDesc')}
        </Text>
        <XStack gap="$3" marginTop="$1">
          <ThemeDot
            label={t('themeDarkLabel')}
            color={theme.background.val?.toString() ?? '#04060A'}
            active={themeName === 'dark'}
            onPress={() => setTheme('dark')}
          />
          <ThemeDot
            label={t('themeNeonPinkLabel')}
            color="#FF65D8"
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
          />
          <ThemeDot
            label={t('themeCyberBlueLabel')}
            color="#00C8FF"
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
          />
        </XStack>
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
          <Switch checked={reminderEnabled} onCheckedChange={(v) => setReminderEnabled(Boolean(v))} />
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
                  onChange={handleTimeChange}
                />
              ) : (
                <Button
                  size="$3"
                  borderRadius="$4"
                  borderWidth={1}
                  borderColor="$gray"
                  backgroundColor="$surface"
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
          <Switch checked={electricFlow} onCheckedChange={(v) => setElectricFlow(Boolean(v))} />
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
            onPress={() => Alert.alert(t('restore'), t('restoreSoon'))}>
            {t('restore')}
          </Button>
        </XStack>
        <Text color="$muted" fontSize={12} marginTop="$2">
          {t('paywallNote')}
        </Text>
      </Section>
    </ScrollView>
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

type ThemeDotProps = {
  label: string;
  color: string;
  active?: boolean;
  onPress?: () => void;
};

function ThemeDot({ label, color, active, onPress }: ThemeDotProps) {
  return (
    <YStack alignItems="center" gap="$2">
      <Stack
        width={40}
        height={40}
        borderRadius={20}
        backgroundColor={color}
        borderWidth={2}
        borderColor={active ? '$neonGreen' : '$gray'}
        opacity={onPress ? 1 : 0.5}
        pressStyle={{ scale: 0.96 }}
        onPress={onPress}
      />
      <Text color="$muted" fontSize={11}>
        {label}
      </Text>
    </YStack>
  );
}
