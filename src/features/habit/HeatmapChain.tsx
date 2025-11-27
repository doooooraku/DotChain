import { memo, useEffect, useRef } from 'react';
import { XStack } from 'tamagui';
import { Animated, Easing } from 'react-native';
import { getLocalDateKey } from '@/src/core/dateKey';

type Props = {
  days: number;
  activeDates: Set<string>;
  colorActive: string;
  colorBg: string;
  colorBorder: string;
};

/**
 * N日分のヒートマップ。activeDates に含まれる日付(YYYY-MM-DD)を点灯させる。
 * 日付キーは端末ローカル時間の YYYY-MM-DD で揃える（UTCずれ対策）。
 */
export const HeatmapChain = memo(function HeatmapChain({ days, activeDates, colorActive, colorBg, colorBorder }: Props) {
  // 1つのアニメーション値を全セルで共有（メモリ・CPU節約）
  const pulse = useRef(new Animated.Value(0)).current;

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
    return () => {
      animation.stop();
    };
  }, [pulse]);

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });
  const shadow = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.1, 0.35] });

  const cells = Array.from({ length: days }).map((_, idx) => {
    // 今日を右端にする: days=14なら idx=13 が今日
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - idx));
    const key = getLocalDateKey(date);
    const active = activeDates.has(key);

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
          transform: [{ scale: active ? scale : 1 }],
          // iOS向けの光/影
          shadowColor: colorActive,
          shadowOpacity: active ? shadow : 0,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          // Android向けの影
          elevation: active ? 4 : 0,
        }}
      />
    );
  });

  return <XStack gap="$2">{cells}</XStack>;
});
