import { Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Stack, Text, YStack, XStack, Button, useTheme } from 'tamagui';

import { useTranslation, type TranslationKey as TKey } from '@/src/core/i18n/i18n';

type PlanType = 'monthly' | 'yearly';

function PlanPriceCard({ type, onPress }: { type: PlanType; onPress: () => void }) {
  const theme = useTheme();
  const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
  const { t } = useTranslation();
  const titleKey: TKey = type === 'monthly' ? 'proPlanMonthlyTitle' : 'proPlanYearlyTitle';
  const priceKey: TKey = type === 'monthly' ? 'priceMonthly' : 'priceYearly';
  const taglineKey: TKey = type === 'monthly' ? 'proMonthlyTagline' : 'proYearlyTagline';
  const ctaKey: TKey = type === 'monthly' ? 'proCtaMonthly' : 'proCtaYearly';
  const isYearly = type === 'yearly';

  return (
    <YStack
      flex={1}
      padding="$4"
      borderRadius="$4"
      borderWidth={1}
      borderColor={isYearly ? '$neonGreen' : '$gray'}
      backgroundColor="$surface"
      gap="$2">
      <XStack justifyContent="space-between" alignItems="center">
        <Text color="$text" fontSize={16} fontWeight="700">
          {t(titleKey)}
        </Text>
        {isYearly && (
          <Text color={neon ?? '#39FF14'} fontSize={12} fontWeight="800">
            {t('proPlanYearlyBadge')}
          </Text>
        )}
      </XStack>

      <Text color={neon ?? '#39FF14'} fontSize={20} fontWeight="800">
        {t(priceKey)}
      </Text>

      <Text color="$muted" fontSize={12}>
        {t(taglineKey)}
      </Text>

      <Button
        marginTop="$3"
        borderRadius={999}
        backgroundColor={isYearly ? '$neonGreen' : '$surface'}
        borderWidth={1}
        borderColor="$neonGreen"
        onPress={onPress}
        iconAfter={<Ionicons name="arrow-forward" size={18} color={isYearly ? '#000' : neon} />}>
        <Text color={isYearly ? '#000' : neon} fontWeight="700">
          {t(ctaKey)}
        </Text>
      </Button>
    </YStack>
  );
}

function CompareRow({ featureKey, freeKey, proKey }: { featureKey: TKey; freeKey: TKey; proKey: TKey }) {
  const { t } = useTranslation();
  return (
    <XStack paddingVertical="$2" borderBottomWidth={1} borderColor="$gray">
      <YStack flex={1.2}>
        <Text color="$muted" fontSize={12}>
          {t(featureKey)}
        </Text>
      </YStack>
      <YStack flex={0.9}>
        <Text color="$text" fontSize={12}>
          {t(freeKey)}
        </Text>
      </YStack>
      <YStack flex={0.9}>
        <Text color="$neonGreen" fontSize={12}>
          {t(proKey)}
        </Text>
      </YStack>
    </XStack>
  );
}

export default function PaywallScreen() {
  const theme = useTheme();
  const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
  const bg = theme?.background?.val?.toString() ?? '#000';
  const { t } = useTranslation();

  const handlePlan = () => {
    Alert.alert(t('comingSoonTitle') ?? 'Coming soon', t('paywallNote'));
  };

  return (
    <Stack flex={1} backgroundColor="$background">
      <ScrollView
        flex={1}
        contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 32 }}>
        {/* ヒーロー */}
        <YStack borderRadius="$6" overflow="hidden">
          <LinearGradient
            colors={[neon, '#ff6ad5', bg]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 20 }}>
            <Text color="#000" fontSize={22} fontWeight="800" marginBottom="$2">
              {t('proTitle')}
            </Text>
            <Text color="#000" fontSize={14} fontWeight="600" marginBottom="$3">
              {t('proSubtitle')}
            </Text>
            <Text color="#000" fontSize={12} opacity={0.9}>
              {t('proCompareSubtitle')}
            </Text>
          </LinearGradient>
        </YStack>

        {/* プランカード */}
        <XStack gap="$3">
          <PlanPriceCard type="monthly" onPress={handlePlan} />
          <PlanPriceCard type="yearly" onPress={handlePlan} />
        </XStack>

        {/* 年額お得説明 */}
        <Text color="$neonGreen" fontSize={12} fontWeight="700">
          {t('proYearlySavingShort')}
        </Text>

        {/* Free vs Pro 比較 */}
        <YStack gap="$2" marginTop="$3">
          <Text color="$text" fontSize={16} fontWeight="700">
            {t('proCompareTitle')}
          </Text>
          <Text color="$muted" fontSize={12}>
            {t('proCompareSubtitle')}
          </Text>

          <XStack marginTop="$2" paddingVertical="$2" borderBottomWidth={1} borderColor="$gray">
            <YStack flex={1.2}>
              <Text color="$muted" fontSize={11} fontWeight="700">
                {t('proCompareHeaderFeature')}
              </Text>
            </YStack>
            <YStack flex={0.9}>
              <Text color="$muted" fontSize={11} fontWeight="700">
                {t('proCompareHeaderFree')}
              </Text>
            </YStack>
            <YStack flex={0.9}>
              <Text color="$muted" fontSize={11} fontWeight="700">
                {t('proCompareHeaderPro')}
              </Text>
            </YStack>
          </XStack>

          <CompareRow featureKey="proFeatureHabits" freeKey="proFeatureHabitsFree" proKey="proFeatureHabitsPro" />
          <CompareRow featureKey="proFeatureThemes" freeKey="proFeatureThemesFree" proKey="proFeatureThemesPro" />
        </YStack>

        {/* Stay free + 注意書き */}
        <YStack gap="$3" marginTop="$4">
          <Button
            borderRadius={999}
            backgroundColor="$surface"
            borderWidth={1}
            borderColor="$gray"
            onPress={() => Alert.alert(t('proPlanFreeTitle'), t('paywallNote'))}>
            <Text color="$muted" fontWeight="600">
              {t('proCtaStayFree')}
            </Text>
          </Button>

          <Text color="$muted" fontSize={10} lineHeight={14}>
            {t('proFinePrint')}
          </Text>
        </YStack>
      </ScrollView>
      </Stack>
  );
}
