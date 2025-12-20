import { memo, useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { XStack } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { getLocalDateKey } from '@/src/core/dateKey';

type Props = {
  days: number;
  intensityByDate: Record<string, number>; // 日付→達成数
  maxLevel: number; // 濃さの最大値（習慣数）
  colorActive: string;
  colorBg: string;
  colorBorder: string;
  flowEnabled?: boolean;
  /** 7日表示だけは横スクロールせず、画面幅を均等に使う */
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

  const todayKey = useMemo(() => getLocalDateKey(new Date()), []);

  const dates = useMemo(() => {
    const list: string[] = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      list.push(getLocalDateKey(d));
    }
    return list;
  }, [days]);

  const currentIndex = useMemo(() => dates.indexOf(todayKey), [dates, todayKey]);

  const isWeek = variant === 'week' && days === 7;
  const DOT = isWeek ? 24 : 18;
  const DOT_RADIUS = Math.round(DOT * (isWeek ? 0.42 : 0.45));
  const LINK_WIDTH = isWeek ? 16 : 12; // weekでは flexGrow と組み合わせて幅を使い切る
  const LINK_HEIGHT = isWeek ? 3 : 2;
  const OUTER_GAP = isWeek ? '$1' : '$2';
  const INNER_GAP = '$1';

  const cells = dates.map((dateKey, idx) => {
    const intensity = intensityByDate[dateKey] ?? 0;
    const active = intensity > 0;
    const ratio = maxLevel > 0 ? intensity / maxLevel : 0;
    const baseOpacity = active ? 0.35 + 0.6 * ratio : isWeek ? 0.22 : 0.15;
    const isToday = dateKey === todayKey;

    const nextKey = dates[idx + 1];
    const nextLevel = nextKey ? intensityByDate[nextKey] ?? 0 : 0;
    const linkActive = active && nextLevel > 0;

    const phase = dates.length > 1 ? ((idx - currentIndex + dates.length) % dates.length) / dates.length : 0;

    return (
      <XStack key={dateKey} alignItems="center" gap={INNER_GAP} flexGrow={isWeek ? 1 : 0}>
        <Node
          size={DOT}
          radius={DOT_RADIUS}
          active={active}
          isToday={isToday}
          opacity={baseOpacity}
          colorActive={colorActive}
          colorBg={colorBg}
          colorBorder={colorBorder}
          scale={scale}
        />

        {idx < dates.length - 1 && (
          <Link
            width={LINK_WIDTH}
            height={LINK_HEIGHT}
            active={linkActive}
            flowEnabled={flowEnabled}
            phase={phase}
            pulse={current}
            colorActive={colorActive}
            colorBorder={colorBorder}
            keepSpace={isWeek}
          />
        )}
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

function Node({
  size,
  radius,
  active,
  isToday,
  opacity,
  colorActive,
  colorBg,
  colorBorder,
  scale,
}: {
  size: number;
  radius: number;
  active: boolean;
  isToday: boolean;
  opacity: number;
  colorActive: string;
  colorBg: string;
  colorBorder: string;
  scale: Animated.AnimatedInterpolation<number>;
}) {
  return (
    <Animated.View
      style={[
        styles.nodeBase,
        {
          width: size,
          height: size,
          borderRadius: radius,
          borderColor: active ? colorBorder : 'rgba(255,255,255,0.12)',
          opacity,
          transform: [{ scale: active ? (scale as any) : 1 }],
        },
      ]}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: colorBg }]} />
      {active && (
        <LinearGradient
          colors={[rgba(colorActive, 0.3), rgba(colorActive, 0.95)]}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.9, y: 0.9 }}
          style={StyleSheet.absoluteFill}
        />
      )}
      <View style={[styles.nodeHighlight, { borderRadius: radius }]} />
      {isToday && active && <View style={[styles.nodeDot, { borderRadius: radius / 2 }]} />}
    </Animated.View>
  );
}

function Link({
  width,
  height,
  active,
  flowEnabled,
  phase,
  pulse,
  colorActive,
  colorBorder,
  keepSpace,
}: {
  width: number;
  height: number;
  active: boolean;
  flowEnabled: boolean;
  phase: number;
  pulse: Animated.Value;
  colorActive: string;
  colorBorder: string;
  keepSpace?: boolean;
}) {
  const translateX = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 0.35, width * 0.35],
  });

  const show = active || keepSpace;

  return (
    <Animated.View
      style={[
        styles.linkBase,
        {
          width,
          height,
          opacity: active ? 1 : keepSpace ? 0.18 : 0,
          transform: flowEnabled && active ? [{ translateX }] : undefined,
        },
      ]}>
      {show && (
        <LinearGradient
          colors={[
            rgba(colorActive, 0.08),
            rgba(colorActive, 0.9),
            rgba(colorActive, 0.08),
          ]}
          start={{ x: phase, y: 0.5 }}
          end={{ x: phase + 1, y: 0.5 }}
          style={StyleSheet.absoluteFill}
        />
      )}
      {!active && !keepSpace && (
        <View
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: colorBorder, opacity: 0.1, borderRadius: 999 },
          ]}
        />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  nodeBase: {
    borderWidth: 1,
    overflow: 'hidden',
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
  nodeHighlight: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  nodeDot: {
    position: 'absolute',
    width: '38%',
    height: '38%',
    backgroundColor: 'rgba(255,255,255,0.55)',
    top: '31%',
    left: '31%',
  },
  linkBase: {
    borderRadius: 999,
    overflow: 'hidden',
  },
});

function rgba(hex: string, a: number) {
  const c = hex.replace('#', '').trim();
  if (c.length !== 6) return `rgba(0,0,0,${a})`;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
