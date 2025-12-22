import { Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Stack, Text, YStack, XStack, Button, useTheme } from 'tamagui';
import { useState, type ComponentProps } from 'react';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTranslation, type TranslationKey as TKey } from '@/src/core/i18n/i18n';

type PlanType = 'monthly' | 'yearly';

function BenefitItem({
  icon,
  title,
  color,
}: {
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  color: string;
}) {
  return (
    <XStack alignItems="center" gap="$3" width="100%">
      <Stack
        width={36}
        height={36}
        borderRadius={10}
        alignItems="center"
        justifyContent="center"
        backgroundColor="$surface"
        borderWidth={1}
        borderColor="$gray">
        <Ionicons name={icon} size={18} color={color} />
      </Stack>
      <Text color="$text" fontSize={14} fontWeight="700" flexShrink={1}>
        {title}
      </Text>
    </XStack>
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

function PlanCard({
  type,
  selected,
  onPress,
}: {
  type: PlanType;
  selected: boolean;
  onPress: () => void;
}) {
  const theme = useTheme();
  const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
  const { t } = useTranslation();
  const titleKey: TKey = type === 'monthly' ? 'proPlanMonthlyTitle' : 'proPlanYearlyTitle';
  const priceKey: TKey = type === 'monthly' ? 'priceMonthly' : 'priceYearly';
  const taglineKey: TKey = type === 'monthly' ? 'proMonthlyTagline' : 'proYearlyTagline';
  const isYearly = type === 'yearly';

  return (
    <YStack
      flex={1}
      padding="$4"
      borderRadius="$6"
      borderWidth={2}
      borderColor={selected ? '$neonGreen' : '$gray'}
      backgroundColor="$surface"
      gap="$2"
      shadowColor={selected ? neon : 'transparent'}
      shadowOpacity={selected ? 0.5 : 0}
      shadowRadius={selected ? 16 : 0}
      shadowOffset={{ width: 0, height: 6 }}
      onPress={onPress}>
      <XStack justifyContent="space-between" alignItems="center" gap="$2">
        <XStack alignItems="center" gap="$2" flex={1} minWidth={0} flexWrap="wrap">
          <Text color="$text" fontSize={16} fontWeight="800" flexShrink={1}>
            {t(titleKey)}
          </Text>
          {isYearly && (
            <Text color={neon} fontSize={12} fontWeight="800" flexShrink={0}>
              {t('proPlanYearlyBadge')}
            </Text>
          )}
        </XStack>
        <XStack alignItems="center" flexShrink={0}>
          {isYearly && (
            <Ionicons
              name={selected ? 'checkmark-circle' : 'ellipse-outline'}
              size={18}
              color={selected ? neon : theme?.gray?.val?.toString() ?? '#666'}
            />
          )}
          {!isYearly && (
            <Ionicons
              name={selected ? 'checkmark-circle' : 'ellipse-outline'}
              size={18}
              color={selected ? neon : theme?.gray?.val?.toString() ?? '#666'}
            />
          )}
        </XStack>
      </XStack>

      <Text color={neon} fontSize={22} fontWeight="900">
        {t(priceKey)}
      </Text>

      <Text color="$muted" fontSize={12}>
        {t(taglineKey)}
      </Text>

    </YStack>
  );
}

export default function PaywallScreen() {
  const theme = useTheme();
  const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
  const bg = theme?.background?.val?.toString() ?? '#000';
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('yearly');

  const handlePurchase = () => {
    Alert.alert(t('proHeaderTitle'), t('proFinePrint'));
  };

  const handleStayFree = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  return (
    <Stack flex={1} backgroundColor="$background">
      <ScrollView
        flex={1}
        contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: 120 }}>
        {/* ヒーロー */}
        <YStack borderRadius="$6" overflow="hidden">
          <LinearGradient
            colors={[neon, '#ff6ad5', bg]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 20 }}>
            <XStack alignItems="center" gap="$3" marginBottom="$2">
              <Stack
                width={42}
                height={42}
                borderRadius={12}
                alignItems="center"
                justifyContent="center"
                backgroundColor="#00000020">
                <Ionicons name="trophy-outline" size={24} color="#000" />
              </Stack>
            <Text color="#000" fontSize={22} fontWeight="900" flexShrink={1}>
              {t('proTitle')}
            </Text>
            </XStack>
            <Text color="#000" fontSize={14} fontWeight="600" marginBottom="$3">
              {t('proSubtitle')}
            </Text>
            <Text color="#000" fontSize={12} opacity={0.9}>
              {t('proCompareSubtitle')}
            </Text>
          </LinearGradient>
        </YStack>

        {/* ベネフィット */}
        <YStack gap="$3" padding="$4" borderRadius="$6" backgroundColor="$surface">
          <Text color="$text" fontSize={16} fontWeight="800">
            {t('proCompareTitle')}
          </Text>
          <BenefitItem icon="infinite-outline" title={t('proFeatureUnlimited')} color={neon} />
          <BenefitItem icon="color-palette-outline" title={t('proFeatureThemes')} color={neon} />
        </YStack>

        {/* プランカード */}
        <XStack gap="$3">
          <PlanCard
            type="monthly"
            selected={selectedPlan === 'monthly'}
            onPress={() => setSelectedPlan('monthly')}
          />
          <PlanCard
            type="yearly"
            selected={selectedPlan === 'yearly'}
            onPress={() => setSelectedPlan('yearly')}
          />
        </XStack>

        <Text color="$neonGreen" fontSize={12} fontWeight="700">
          {t('proYearlySavingShort')}
        </Text>

        {/* Free vs Pro 比較 */}
        <YStack gap="$2" marginTop="$2">
          <XStack marginTop="$2" paddingVertical="$2" borderBottomWidth={1} borderColor="$gray">
            <YStack flex={1.2} minWidth={0}>
              <Text color="$muted" fontSize={11} fontWeight="700" flexShrink={1}>
                {t('proCompareHeaderFeature')}
              </Text>
            </YStack>
            <YStack flex={0.9} minWidth={0}>
              <Text color="$muted" fontSize={11} fontWeight="700" flexShrink={1}>
                {t('proCompareHeaderFree')}
              </Text>
            </YStack>
            <YStack flex={0.9} minWidth={0}>
              <Text color="$muted" fontSize={11} fontWeight="700" flexShrink={1}>
                {t('proCompareHeaderPro')}
              </Text>
            </YStack>
          </XStack>

          <CompareRow featureKey="proFeatureHabits" freeKey="proFeatureHabitsFree" proKey="proFeatureHabitsPro" />
          <CompareRow featureKey="proFeatureThemes" freeKey="proFeatureThemesFree" proKey="proFeatureThemesPro" />
        </YStack>
      </ScrollView>

      {/* 固定CTA */}
      <YStack
        padding="$4"
        paddingBottom={Math.max(insets.bottom, 12)}
        borderTopWidth={1}
        borderColor="$gray"
        backgroundColor="$background"
        gap="$2">
        <Button
          borderRadius={999}
          backgroundColor="$neonGreen"
          onPress={handlePurchase}
          pressStyle={{ opacity: 0.85 }}>
          <Text color="#000" fontWeight="800">
            {selectedPlan === 'yearly' ? t('proCtaYearly') : t('proCtaMonthly')}
          </Text>
        </Button>
        <Text color="$muted" fontSize={10} lineHeight={14} textAlign="center">
          {t('proFinePrint')}
        </Text>
        <Button
          chromeless
          onPress={handleStayFree}
          accessibilityLabel={t('proCtaStayFree')}>
          <Text color="$muted" fontWeight="600">
            {t('proCtaStayFree')}
          </Text>
        </Button>
      </YStack>
    </Stack>
  );
}
