import { memo, useEffect, useRef, type ReactNode } from 'react';
import { XStack, Stack } from 'tamagui';
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
  /**
   * 7日表示だけは横スクロールせず、画面幅を均等に使う
   */
  variant?: 'default' | 'week';
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
  variant = 'default',
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
        useNativeDriver: false,
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

  const isWeek = variant === 'week' && days === 7;
  const DOT = isWeek ? 24 : 18;
  const LINK_WIDTH = isWeek ? 16 : 12; // week では flexGrow と併用して幅を使い切る
  const OUTER_GAP = isWeek ? '$1' : '$2';
  const INNER_GAP = '$1';

  const cells = Array.from({ length: days }).map((_, idx) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - idx));
    const key = getLocalDateKey(date);

    const level = intensityByDate[key] ?? 0;
    const active = level > 0;
    const ratio = maxLevel > 0 ? level / maxLevel : 0;
    const baseOpacity = active ? 0.3 + 0.7 * ratio : isWeek ? 0.22 : 0.15;

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

    const linkStyleBase = isWeek
      ? { flexGrow: 1, minWidth: LINK_WIDTH, height: 2 }
      : { width: LINK_WIDTH, height: 2 };

    let linkNode: ReactNode = null;
    if (idx < days - 1) {
      if (linkActive) {
        linkNode = (
          <Animated.View
            style={{
              ...linkStyleBase,
              borderRadius: 1,
              backgroundColor: colorActive,
              opacity: flowEnabled ? Animated.multiply(shadow, linkGlow) : shadow,
              shadowColor: colorActive,
              shadowOpacity: flowEnabled ? Animated.multiply(shadow, linkGlow) : shadow,
              shadowRadius: flowEnabled ? 6 : 4,
              shadowOffset: { width: 0, height: 0 },
            }}
          />
        );
      } else if (isWeek) {
        // 週表示のときはリンクが無い箇所もダミー幅で均等配置する
        linkNode = (
          <Animated.View
            style={{
              ...linkStyleBase,
              borderRadius: 1,
              backgroundColor: colorBorder,
              opacity: 0.18,
            }}
          />
        );
      }
    }

    return (
      <XStack key={key} alignItems="center" gap={INNER_GAP}>
        <Animated.View
          style={{
            width: DOT,
            height: DOT,
            borderRadius: DOT / 2 - 1,
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

  return (
    <XStack
      gap={OUTER_GAP}
      width={isWeek ? '100%' : undefined}
      alignItems="center"
      justifyContent={isWeek ? 'space-between' : undefined}>
      {cells}
    </XStack>
  );
});
