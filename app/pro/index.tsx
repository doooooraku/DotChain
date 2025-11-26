import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Stack, Text, YStack, useTheme } from 'tamagui';
import { t } from '@/src/core/i18n/i18n';

export default function PaywallScreen() {
  const theme = useTheme();
  const pink = theme.neonPink.val?.toString() ?? '#FF00FF';
  const bg = theme.background.val?.toString() ?? '#000';
  return (
    <ScrollView
      backgroundColor="$background"
      flex={1}
      contentContainerStyle={{ padding: 16, gap: 16 }}>
      <LinearGradient
        colors={[pink, bg]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 20, padding: 20, borderWidth: 1, borderColor: pink }}>
        <Text color="$text" fontSize={24} fontWeight="800">
          DotChain Pro
        </Text>
        <Text color="$muted" marginTop="$2">
          {t('heroPaywall')}
        </Text>
      </LinearGradient>

      <YStack
        backgroundColor="$surface"
        borderRadius="$4"
        borderWidth={1}
        borderColor="$gray"
        padding="$4"
        gap="$3">
        <Feature icon="infinite" title="習慣数 無制限" />
        <Feature icon="color-palette" title="全テーマ解放 (Neon Pink / Cyber Blue など)" />
        <Feature icon="apps" title="アプリアイコン変更" />
        <Feature icon="notifications" title="広告非表示" />
      </YStack>

      <YStack alignItems="center" gap="$2">
        <Text color="$neonGreen" fontSize={22} fontWeight="800">
          {t('priceMonthly')}
        </Text>
        <Text color="$muted" textAlign="center">
          {t('paywallNote')}
        </Text>
      </YStack>
    </ScrollView>
  );
}

function Feature({ icon, title }: { icon: React.ComponentProps<typeof Ionicons>['name']; title: string }) {
  return (
    <Stack flexDirection="row" alignItems="center" gap="$2">
      <Ionicons name={icon} size={22} color="#39FF14" />
      <Text color="$text" fontSize={15} fontWeight="600">
        {title}
      </Text>
    </Stack>
  );
}
