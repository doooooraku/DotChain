import { Stack, Text, Button } from 'tamagui';
import { useTranslation } from '@/src/core/i18n/i18n';

export type VerticalAlign = 'top' | 'center' | 'bottom';

export type TutorialOverlayProps = {
  message: string;
  buttonLabel?: string;
  onNext?: () => void;

  // 背景タップで次へ（必要なステップだけtrue）
  backgroundTapEnabled?: boolean;

  // カード縦位置
  verticalAlign?: VerticalAlign;

  // true: 下のUIを触れる（暗幕がタップを通す）
  allowPassthrough?: boolean;

  // 暗幕の濃さ（0〜1）
  backdropOpacity?: number;

  // カードの上下位置微調整
  cardOffsetY?: number;
};

function toJustify(verticalAlign: VerticalAlign) {
  switch (verticalAlign) {
    case 'top':
      return 'flex-start';
    case 'bottom':
      return 'flex-end';
    default:
      return 'center';
  }
}

export function TutorialOverlay({
  message,
  buttonLabel,
  onNext,
  backgroundTapEnabled = false,
  verticalAlign = 'center',
  allowPassthrough = false,
  backdropOpacity = 0.72,
  cardOffsetY = 0,
}: TutorialOverlayProps) {
  const { t } = useTranslation();
  const resolvedButtonLabel = buttonLabel ?? t('tutorialNext');
  const justifyContent = toJustify(verticalAlign);

  return (
    <Stack
      testID="tutorial-overlay"
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={100}
      pointerEvents={allowPassthrough ? 'box-none' : 'auto'}
      alignItems="center"
      justifyContent={justifyContent}
      paddingTop={verticalAlign === 'top' ? 72 : 0}
      paddingBottom={verticalAlign === 'bottom' ? 72 : 0}
    >
      {/* 暗幕レイヤー */}
      <Stack
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor={`rgba(0,0,0,${backdropOpacity})`}
        pointerEvents={allowPassthrough ? 'none' : 'auto'}
        onPress={backgroundTapEnabled ? onNext : undefined}
      />

      {/* メッセージカード */}
      <Stack
        pointerEvents="auto"
        backgroundColor="$background"
        borderRadius="$6"
        padding="$4"
        width="85%"
        maxWidth={360}
        borderWidth={2}
        borderColor="$neonGreen"
        shadowColor="$neonGreen"
        shadowOpacity={0.35}
        shadowRadius={16}
        shadowOffset={{ width: 0, height: 8 }}
        style={{ transform: [{ translateY: cardOffsetY }] }}
      >
        <Text color="$text" fontSize="$5" textAlign="center" marginBottom="$3">
          {message}
        </Text>

        {!!onNext && (
          <Button
            onPress={onNext}
            size="$4"
            height="$4"
            alignSelf="center"
            width="80%"
            minWidth={200}
            maxWidth={320}
            backgroundColor="$neonGreen"
        borderRadius="$6"
            pressStyle={{ opacity: 0.85 }}
          >
            <Text color="$background" fontWeight="800" fontSize="$5">
              {resolvedButtonLabel}
            </Text>
          </Button>
        )}
      </Stack>
    </Stack>
  );
}
