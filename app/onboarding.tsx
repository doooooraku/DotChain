import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';
import { Button, Stack, Text, YStack, useTheme } from 'tamagui';
import { t } from '@/src/core/i18n/i18n';

const { height } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const theme = useTheme();
  const neon = theme.neonGreen.val?.toString() ?? '#39FF14';
  const bg = theme.background.val?.toString() ?? '#000';
  return (
    <Stack
      flex={1}
      backgroundColor="rgba(0,0,0,0.7)"
      alignItems="center"
      justifyContent="center"
      padding={24}>
      <LinearGradient
        colors={[neon, bg]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={{
          width: '100%',
          borderRadius: 20,
          padding: 20,
          minHeight: height * 0.35,
          justifyContent: 'space-between',
        }}>
        <YStack gap="$3">
          <Text color="#000" fontSize={24} fontWeight="800">
            {t('onboardingTitle')}
          </Text>
          <Text color="#000" fontSize={16} lineHeight={22}>
            {t('onboardingBody')}
          </Text>
        </YStack>
        <Button
          backgroundColor="#000"
          color="#39FF14"
          borderRadius={14}
          onPress={() => router.back()}>
          {t('start')}
        </Button>
      </LinearGradient>
    </Stack>
  );
}
