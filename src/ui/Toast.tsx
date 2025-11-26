import { useEffect } from 'react';
import { ToastAndroid, Platform } from 'react-native';
import { AnimatePresence, Stack, Text, YStack } from 'tamagui';
import { playError, playSuccess } from '@/src/core/sensory/SoundManager';

type ToastState = {
  visible: boolean;
  message: string;
  kind: 'info' | 'error';
};

export function Toast({ visible, message, kind }: ToastState) {
  useEffect(() => {
    if (visible && Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
    if (visible) {
      if (kind === 'error') playError();
      else playSuccess();
    }
  }, [visible, message, kind]);

  if (!visible || Platform.OS === 'android') return null;

  const bg = kind === 'error' ? '$error' : '$surface';
  const color = '$text';

  return (
    <AnimatePresence>
      <Stack position="absolute" bottom={40} left={16} right={16}>
        <YStack
          backgroundColor={bg}
          borderRadius="$4"
          padding="$3"
          borderWidth={1}
          borderColor="$gray"
          shadowColor="$background"
          shadowOpacity={0.6}
          shadowRadius={16}
          shadowOffset={{ width: 0, height: 6 }}>
          <Text color={color}>{message}</Text>
        </YStack>
      </Stack>
    </AnimatePresence>
  );
}
