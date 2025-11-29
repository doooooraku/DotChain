import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Animated } from 'react-native';
import { Button, Stack, Text, YStack, useTheme } from 'tamagui';
import { useRef, useState } from 'react';
import { t } from '@/src/core/i18n/i18n';
import { triggerImpact } from '@/src/core/sensory/HapticManager';
import { playClick } from '@/src/core/sensory/SoundManager';
import { useSettingsStore } from '@/src/stores/settingsStore';

export default function OnboardingScreen() {
  const router = useRouter();
  const theme = useTheme();
  const neon = theme.neonGreen.val?.toString() ?? '#39FF14';
  const bg = theme.background.val?.toString() ?? '#000';
  const setSeen = useSettingsStore((s) => s.setHasSeenOnboarding);

  const [step, setStep] = useState<'intro' | 'flash'>('intro');
  const flash = useRef(new Animated.Value(0)).current;

  const handleTap = async () => {
    if (step !== 'intro') return;
    setStep('flash');
    await triggerImpact();
    void playClick();
    Animated.sequence([
      Animated.timing(flash, { toValue: 1, duration: 180, useNativeDriver: true }),
      Animated.timing(flash, { toValue: 0, duration: 420, useNativeDriver: true }),
    ]).start(() => {
      setSeen(true);
      router.replace('/');
    });
  };

  return (
    <Stack
      flex={1}
      backgroundColor="rgba(0,0,0,0.9)"
      alignItems="center"
      justifyContent="center"
      padding={24}>
      <YStack gap="$4" alignItems="center">
        <Text color={neon} fontSize={22} fontWeight="800">
          {t('onboardingTitle')}
        </Text>
        <Text color="$muted" fontSize={14} lineHeight={22} textAlign="center">
          {t('onboardingBody')}
        </Text>

        <Button
          borderRadius={999}
          height={96}
          width={96}
          backgroundColor={neon}
          color="#000"
          fontSize={20}
          fontWeight="800"
          onPress={handleTap}>
          Tap
        </Button>
      </YStack>

      {/* フラッシュ演出 */}
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: flash,
        }}>
        <LinearGradient
          colors={[neon, bg]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}>
          <Text color="#000" fontSize={20} fontWeight="700" textAlign="center">
            {t('onboardingTitle')}
          </Text>
        </LinearGradient>
      </Animated.View>
    </Stack>
  );
}
