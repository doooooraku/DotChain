import { Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Stack, Text, YStack, XStack, Button, useTheme } from 'tamagui';
import { useEffect, useState, type ComponentProps } from 'react';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTranslation, type TranslationKey as TKey } from '@/src/core/i18n/i18n';
import { useProStore } from '@/src/stores/proStore';
import { useUiStore } from '@/src/stores/uiStore';
import { IAP_DEBUG } from '@/src/core/debug';
import { proService, type PriceDetail, type PriceDetails } from '@/src/services/proService';
import { PRIVACY_POLICY_URL, TERMS_OF_USE_URL } from '@/constants/legal';
import { openExternalLink } from '@/src/core/linking/openExternalLink';

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

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <XStack justifyContent="space-between" gap="$3">
      <Text color="$muted" fontSize={12}>
        {label}
      </Text>
      <Text color="$text" fontSize={12} fontWeight="700">
        {value}
      </Text>
    </XStack>
  );
}

function PlanCard({
  type,
  selected,
  onPress,
  priceLabel,
}: {
  type: PlanType;
  selected: boolean;
  onPress: () => void;
  priceLabel: string;
}) {
  const theme = useTheme();
  const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
  const { t } = useTranslation();
  const titleKey: TKey = type === 'monthly' ? 'proPlanMonthlyTitle' : 'proPlanYearlyTitle';
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
        {priceLabel}
      </Text>

      <Text color="$muted" fontSize={12}>
        {t(taglineKey)}
      </Text>

    </YStack>
  );
}

function formatCurrency(value: number, currencyCode?: string | null) {
  if (!currencyCode) return value.toFixed(2);
  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency: currencyCode }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currencyCode}`;
  }
}

function getPricePerMonthString(detail?: PriceDetail | null) {
  if (!detail) return null;
  if (detail.pricePerMonthString) return detail.pricePerMonthString;
  const perMonth = detail.pricePerMonth ?? (detail.price ? detail.price / 12 : null);
  if (perMonth == null) return null;
  return formatCurrency(perMonth, detail.currencyCode);
}

export default function PaywallScreen() {
  const theme = useTheme();
  const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
  const bg = theme?.background?.val?.toString() ?? '#000';
  const { t } = useTranslation();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('yearly');
  const purchaseMonthly = useProStore((s) => s.purchaseMonthly);
  const purchaseYearly = useProStore((s) => s.purchaseYearly);
  const restorePurchase = useProStore((s) => s.restore);
  const isLoading = useProStore((s) => s.isLoading);
  const showToast = useUiStore((s) => s.showToast);
  const [priceState, setPriceState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [priceDetails, setPriceDetails] = useState<PriceDetails | null>(null);

  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const result = await proService.getPriceDetails();
        if (!active) return;
        if (!result || (!result.monthly && !result.yearly)) {
          setPriceState('error');
          return;
        }
        setPriceDetails(result);
        setPriceState('ready');
      } catch (error) {
        if (active) {
          setPriceState('error');
        }
        if (IAP_DEBUG) {
          console.warn('[IAP] price load failed', error);
        }
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  const selectedDetails = selectedPlan === 'yearly' ? priceDetails?.yearly : priceDetails?.monthly;
  const selectedTitle =
    selectedDetails?.title ??
    t(selectedPlan === 'yearly' ? 'proPlanYearlyTitle' : 'proPlanMonthlyTitle');
  const selectedLength =
    selectedPlan === 'yearly' ? t('subscriptionLengthYearly') : t('subscriptionLengthMonthly');
  const selectedPrice =
    selectedDetails?.priceString ??
    (priceState === 'loading' ? t('priceLoading') : t('priceUnavailable'));
  const pricePerMonth =
    selectedPlan === 'yearly' ? getPricePerMonthString(selectedDetails) : null;

  const handlePurchase = async () => {
    try {
      const state =
        selectedPlan === 'yearly' ? await purchaseYearly() : await purchaseMonthly();
      if (state.isPro) {
        Alert.alert(t('proHeaderTitle'), t('purchaseSuccess'));
      } else {
        showToast({ kind: 'error', message: t('purchaseFailed') });
      }
    } catch (e: any) {
      if (e?.userCancelled) {
        return;
      }
      console.error('[IAP] purchase failed', e);
      const msg = e?.message ?? String(e);
      showToast({
        kind: 'error',
        message: IAP_DEBUG ? `Purchase failed: ${msg}` : t('purchaseFailed'),
      });
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
            priceLabel={
              priceDetails?.monthly?.priceString ??
              (priceState === 'loading' ? t('priceLoading') : t('priceUnavailable'))
            }
          />
          <PlanCard
            type="yearly"
            selected={selectedPlan === 'yearly'}
            onPress={() => setSelectedPlan('yearly')}
            priceLabel={
              priceDetails?.yearly?.priceString ??
              (priceState === 'loading' ? t('priceLoading') : t('priceUnavailable'))
            }
          />
        </XStack>

        <Text color="$neonGreen" fontSize={12} fontWeight="700">
          {t('proYearlySavingShort')}
        </Text>

        {/* サブスク詳細（App Review 必須情報） */}
        <YStack gap="$2" padding="$3" borderRadius="$4" backgroundColor="$surface" borderWidth={1} borderColor="$gray">
          <Text color="$text" fontSize={14} fontWeight="800">
            {t('subscriptionDetailsTitle')}
          </Text>
          <Text color="$text" fontSize={13} fontWeight="700">
            {selectedTitle}
          </Text>
          <DetailRow label={t('subscriptionDetailsLengthLabel')} value={selectedLength} />
          <DetailRow label={t('subscriptionDetailsPriceLabel')} value={selectedPrice} />
          {pricePerMonth && (
            <DetailRow label={t('subscriptionDetailsPerMonthLabel')} value={pricePerMonth} />
          )}
        </YStack>

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
          disabled={isLoading}
          pressStyle={{ opacity: 0.85 }}>
          <Text color="#000" fontWeight="800">
            {selectedPlan === 'yearly' ? t('proCtaYearly') : t('proCtaMonthly')}
          </Text>
        </Button>
        <Text color="$muted" fontSize={10} lineHeight={14} textAlign="center">
          {t('proFinePrint')}
        </Text>
        <XStack justifyContent="center" gap="$3" flexWrap="wrap">
          <Text
            color="$muted"
            fontSize={11}
            textDecorationLine="underline"
            onPress={() => openExternalLink(PRIVACY_POLICY_URL)}>
            {t('legalPrivacyPolicyLabel')}
          </Text>
          <Text color="$muted" fontSize={11}>
            •
          </Text>
          <Text
            color="$muted"
            fontSize={11}
            textDecorationLine="underline"
            onPress={() => openExternalLink(TERMS_OF_USE_URL)}>
            {t('legalTermsOfUseLabel')}
          </Text>
        </XStack>
        <Button
          chromeless
          disabled={isLoading}
          onPress={handleRestore}
          accessibilityLabel={t('restore')}>
          <Text color="$muted" fontWeight="600">
            {t('restore')}
          </Text>
        </Button>
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
