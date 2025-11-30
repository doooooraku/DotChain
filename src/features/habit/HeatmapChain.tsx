import { memo, useEffect, useRef, type ReactNode } from 'react';
import { XStack } from 'tamagui';
import { Animated, Easing } from 'react-native';
import { getLocalDateKey } from '@/src/core/dateKey';

type Props = {
  days: number;
  intensityByDate: Record<string, number>; // 日付→達成数
  maxLevel: number; // 濃さの最大値（習慣数）
  colorActive: string;
  colorBg: string;
  colorBorder: string;
  flowEnabled?: boolean;
};

/**
 * Neon Pulse Grid ヒートマップ。
 * - intensityByDate: 日付ごとの達成数で濃さを変える
 * - 連続達成日はセル間のラインを光らせる
 * - 呼吸するネオン演出を共有アニメで実現
 */
export const HeatmapChain = memo(function HeatmapChain({
  days,
  intensityByDate,
  maxLevel,
  colorActive,
  colorBg,
  colorBorder,
  flowEnabled = true,
}: Props) {
  const pulse = useRef(new Animated.Value(0)).current;
  const current = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false, // shadowOpacity を動かすため
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [pulse]);

  useEffect(() => {
    if (!flowEnabled) {
      current.stopAnimation();
      current.setValue(0);
      return;
    }
    const animation = Animated.loop(
      Animated.timing(current, {
        toValue: 1,
        duration: 2400,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => {
      animation.stop();
      current.setValue(0);
    };
  }, [current, flowEnabled]);

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });
  const shadow = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.1, 0.35] });

  const cells = Array.from({ length: days }).map((_, idx) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - idx));
    const key = getLocalDateKey(date);

    const level = intensityByDate[key] ?? 0;
    const active = level > 0;
    const ratio = maxLevel > 0 ? level / maxLevel : 0;
    const baseOpacity = active ? 0.3 + 0.7 * ratio : 0.15;

    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);
    const nextKey = getLocalDateKey(nextDate);
    const nextLevel = intensityByDate[nextKey] ?? 0;
    const linkActive = active && nextLevel > 0;

    const phaseBase = days > 1 ? idx / (days - 1) : 0;
    const phase = Animated.modulo(Animated.add(current, 1 - phaseBase), 1);
    const linkGlow = phase.interpolate({
      inputRange: [0, 0.25, 1],
      outputRange: [1, 0, 0],
    });

    let linkNode: ReactNode = null;
    if (linkActive) {
      if (flowEnabled) {
        linkNode = (
          <Animated.View
            style={{
              width: 12,
              height: 2,
              borderRadius: 1,
              backgroundColor: colorActive,
              opacity: Animated.multiply(shadow, linkGlow),
              shadowColor: colorActive,
              shadowOpacity: Animated.multiply(shadow, linkGlow),
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 0 },
            }}
          />
        );
      } else {
        linkNode = (
          <Animated.View
            style={{
              width: 12,
              height: 2,
              borderRadius: 1,
              backgroundColor: colorActive,
              opacity: shadow,
              shadowColor: colorActive,
              shadowOpacity: shadow,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 0 },
            }}
          />
        );
      }
    }

    return (
      <XStack key={key} alignItems="center" gap="$1">
        <Animated.View
          style={{
            width: 18,
            height: 18,
            borderRadius: 8,
            borderWidth: active ? 0 : 1,
            borderColor: colorBorder,
            backgroundColor: active ? colorActive : colorBg,
            opacity: baseOpacity,
            transform: [{ scale: active ? scale : 1 }],
            shadowColor: colorActive,
            shadowOpacity: active ? shadow : 0,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: active ? 4 : 0,
          }}
        />
        {linkNode}
      </XStack>
    );
  });

  return <XStack gap="$2">{cells}</XStack>;
});
