import { Text, YStack, useTheme } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Animated, Easing } from 'react-native';
import { useEffect, useRef, type ComponentProps } from 'react';
import { t } from '@/src/core/i18n/i18n';

type IconName = ComponentProps<typeof Ionicons>['name'];

type Props = {
  /**
   * 表示用の習慣名。
   * - 画面側で i18n 済みのラベル、またはユーザー入力の文字列を渡す。
   * - 本コンポーネント内では固定文言のみ i18n 管理し、label は翻訳しない。
   */
  label: string;
  size: 'big' | 'medium';
  active: boolean;
  iconName?: IconName;
  onPress: () => void;
  onLongPress?: () => void;
};

export function HabitButton({ label, size, active, iconName = 'checkbox', onPress, onLongPress }: Props) {
  const height = size === 'big' ? 160 : 110;
  const theme = useTheme();
  const neon = theme?.neonGreen?.val?.toString() ?? '#39FF14';
  const bg = theme?.background?.val?.toString() ?? '#000';
  const border = theme?.gray?.val?.toString() ?? '#222';
  const glow = useRef(new Animated.Value(0)).current;
  const pressScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // active のときだけグローアニメーションを回す。未達成なら停止して最小値に固定。
    if (!active) {
      glow.stopAnimation();
      glow.setValue(0);
      return;
    }

    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glow, {
          toValue: 0,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );

    animation.start();
    return () => {
      animation.stop();
    };
  }, [glow, active]);

  const handlePressIn = () => {
      Animated.spring(pressScale, {
        toValue: 0.96,
        useNativeDriver: true,
        friction: 8,
        tension: 150,
      }).start();
  };

  const handlePressOut = () => {
    Animated.sequence([
      Animated.spring(pressScale, {
        toValue: 1.05,
        useNativeDriver: true,
        friction: 6,
        tension: 180,
      }),
      Animated.spring(pressScale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 8,
        tension: 150,
      }),
    ]).start();
  };

  return (
    <YStack gap="$2">
      <Text color="$text" fontSize={14} fontWeight="700">
        {label}
      </Text>
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityLabel={`${label}${t('habitButtonSuffix')}`}
        accessibilityRole="button"
        accessibilityState={{ checked: active }}>
        <Animated.View
          style={{
            height,
            backgroundColor: active ? neon : bg,
            borderColor: active ? neon : border,
            borderWidth: 2,
            borderRadius: 24,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ scale: pressScale }],
          }}>
          <Ionicons
            name={iconName}
            size={size === 'big' ? 52 : 36}
            color={active ? '#000000' : '#EEEEEE'}
          />
          {/* グローを shadow ではなく半透明オーバーレイで表現（nativeDriver対応） */}
          <Animated.View
            pointerEvents="none"
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 24,
              backgroundColor: neon,
              opacity: glow.interpolate({ inputRange: [0, 1], outputRange: active ? [0.06, 0.14] : [0, 0] }),
            }}
          />
        </Animated.View>
      </Pressable>
    </YStack>
  );
}
