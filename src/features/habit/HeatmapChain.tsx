import { memo, useEffect, useMemo } from 'react';
import { XStack } from 'tamagui';
import { Animated } from 'react-native';

type Props = {
  days: number;
  activeDates: Set<string>;
  colorActive: string;
  colorBg: string;
  colorBorder: string;
};

/**
 * シンプルな14日ヒートマップ。
 * activeDates に含まれる日付(YYYY-MM-DD)をネオングリーンで表示。
 */
export const HeatmapChain = memo(function HeatmapChain({ days, activeDates, colorActive, colorBg, colorBorder }: Props) {
  const pulses = useMemo(
    () => Array.from({ length: days }, () => new Animated.Value(0)),
    [days],
  );

  useEffect(() => {
    pulses.forEach((p) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(p, { toValue: 1, duration: 1200, useNativeDriver: true }),
          Animated.timing(p, { toValue: 0, duration: 1200, useNativeDriver: true }),
        ]),
      ).start();
    });
  }, [pulses]);

  const cells = Array.from({ length: days }).map((_, idx) => {
    // 今日を右端にする: idx=0 が今日
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - idx));
    const key = date.toISOString().slice(0, 10);
    const active = activeDates.has(key);
    const pulse = pulses[idx];
    const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });
    const shadow = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.1, 0.35] });
    return (
      <Animated.View
        key={key}
        style={{
          width: 18,
          height: 18,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: colorBorder,
          backgroundColor: active ? colorActive : colorBg,
          transform: [{ scale }],
          shadowColor: colorActive,
          shadowOpacity: active ? shadow : 0,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
        }}
      />
    );
  });

  return <XStack gap="$2">{cells}</XStack>;
});
