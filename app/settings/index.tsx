import React from 'react';
import { Href, Link } from 'expo-router';
import { ScrollView, Stack, Switch, Text, XStack, YStack, Button, useTheme } from 'tamagui';
import { useSettingsStore } from '@/src/stores/settingsStore';
import { t, useTranslation, type Lang } from '@/src/core/i18n/i18n';

export default function SettingsScreen() {
  const sound = useSettingsStore((s) => s.sound);
  const haptics = useSettingsStore((s) => s.haptics);
  const setSound = useSettingsStore((s) => s.setSound);
  const setHaptics = useSettingsStore((s) => s.setHaptics);
  const tapSound = useSettingsStore((s) => s.tapSound);
  const setTapSound = useSettingsStore((s) => s.setTapSound);
  const { lang, setLang: setLangStore } = useTranslation();
  const theme = useTheme();
  const neon = theme.neonGreen.val?.toString() ?? '#39FF14';

  const languageOptions: Lang[] = ['en','ja','fr','es','de','zh','ko','pt','it','ru','hi','id','th','vi','ms','tr','nl','sv'];

  return (
    <ScrollView
      backgroundColor="$background"
      flex={1}
      contentContainerStyle={{ padding: 16, gap: 16 }}>
      <Text color="$text" fontSize={22} fontWeight="700">
        {t('settings')}
      </Text>

      <Section title={t('language')}>
        <Text color="$muted">{t('language')} : {lang.toUpperCase()}</Text>
        <XStack flexWrap="wrap" gap="$2" marginTop="$2">
          {languageOptions.map((code) => (
            <Button
              key={code}
              size="$2"
              paddingHorizontal="$3"
              backgroundColor={lang === code ? neon : '$surface'}
              borderColor="$gray"
              borderWidth={1}
              color={lang === code ? '#000' : '$text'}
              onPress={() => setLangStore(code)}>
              {code.toUpperCase()}
            </Button>
          ))}
        </XStack>
      </Section>

      <Section title={t('sound')}>
        <Row>
          <Text color="$text" fontSize={15}>
            {t('tapSound')}
          </Text>
          <Switch checked={sound} onCheckedChange={(v) => setSound(Boolean(v))} />
        </Row>
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
            Haptic feedback
          </Text>
          <Switch checked={haptics} onCheckedChange={(v) => setHaptics(Boolean(v))} />
        </Row>
      </Section>

      <Section title={t('theme')}>
        <Text color="$muted">{t('freeThemeNote')}</Text>
        <XStack gap="$3">
          <ThemeDot color="$background" />
          <ThemeDot color="$neonPink" />
          <ThemeDot color="#00C8FF" />
        </XStack>
        <Text color="$muted" fontSize={12}>
          {t('proThemeNote')}
        </Text>
      </Section>

      <Section title={t('restore')}>
        <Text color="$neonGreen" fontWeight="700">
          {t('restoreDesc')}
        </Text>
        <Link href={'/pro' as Href} style={{ color: '#39FF14', fontWeight: '700' }}>
          {t('openPro')}
        </Link>
        <Text color="$neonGreen" fontWeight="700">
          {t('licenses')}
        </Text>
      </Section>

      <Text color="$muted" textAlign="center" marginVertical="$2">
        {t('version')} v1.0.0
      </Text>
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

function ThemeDot({ color }: { color: string }) {
  return (
    <Stack
      width={32}
      height={32}
      borderRadius={16}
      borderWidth={2}
      borderColor="$neonGreen"
      backgroundColor={color}
    />
  );
}
