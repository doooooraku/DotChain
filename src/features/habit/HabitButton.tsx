import { Text, YStack, useTheme } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Animated, Easing } from 'react-native';
import { useEffect, useRef } from 'react';

type Props = {
  label: string;
  size: 'big' | 'medium';
  active: boolean;
  iconName?: string;
  onPress: () => void;
  onLongPress?: () => void;
};

export function HabitButton({ label, size, active, iconName = 'checkbox', onPress, onLongPress }: Props) {
  const height = size === 'big' ? 160 : 110;
  const theme = useTheme();
  const neon = theme.neonGreen.val?.toString() ?? '#39FF14';
  const bg = theme.background.val?.toString() ?? '#000';
  const border = theme.gray.val?.toString() ?? '#222';
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    ).start();
  }, [glow]);

  const shadowOpacity = glow.interpolate({ inputRange: [0, 1], outputRange: active ? [0.4, 0.7] : [0.1, 0.2] });

  return (
    <YStack gap="$2">
      <Text color="$text" fontSize={14} fontWeight="700">
        {label}
      </Text>
      <Pressable onPress={onPress} onLongPress={onLongPress} accessibilityLabel={label}>
        <Animated.View
          style={{
            height,
            backgroundColor: active ? neon : bg,
            borderColor: active ? neon : border,
            borderWidth: 2,
            borderRadius: 24,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: neon,
            shadowOpacity: shadowOpacity as any,
            shadowRadius: 18,
            shadowOffset: { width: 0, height: 6 },
            transform: [{ scale: 1 }],
          }}>
          <Ionicons
            name={iconName as any}
            size={size === 'big' ? 52 : 36}
            color={active ? '#000000' : '#EEEEEE'}
          />
        </Animated.View>
      </Pressable>
    </YStack>
  );
}
