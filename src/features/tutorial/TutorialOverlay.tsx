import { ReactNode } from 'react';
import { Stack, Text, Button, YStack } from 'tamagui';

export type TutorialOverlayProps = {
  message: string; // i18n 済みの文言を親から渡す
  buttonLabel?: string; // i18n 済みの文言を親から渡す。省略時はボタン非表示
  onNext?: () => void;
  children?: ReactNode;

  // 背景タップで onNext を呼ぶかどうか（デフォルト: 無効）
  backgroundTapEnabled?: boolean;

  // カードの縦位置を変える
  verticalAlign?: 'top' | 'center' | 'bottom';
};

export function TutorialOverlay({
  message,
  buttonLabel,
  onNext,
  children,
  backgroundTapEnabled = false,
  verticalAlign = 'center',
}: TutorialOverlayProps) {
  const justifyContent =
    verticalAlign === 'top' ? 'flex-start' : verticalAlign === 'bottom' ? 'flex-end' : 'center';

  const handleBackgroundPress = () => {
    if (backgroundTapEnabled && onNext) {
      onNext();
    }
  };

  return (
    <Stack
      testID="tutorial-overlay"
      position="absolute"
      inset={0}
      justifyContent={justifyContent}
      alignItems="center"
      padding={24}
      zIndex={100}>
      {/* 背景レイヤー（黒半透明） */}
      <Stack
        position="absolute"
        inset={0}
        backgroundColor="rgba(0,0,0,0.75)"
        onPress={handleBackgroundPress}
      />

      {/* カードレイヤー */}
      <YStack
        maxWidth={320}
        backgroundColor="$surface"
        borderRadius="$4"
        padding="$4"
        gap="$3"
        borderWidth={1}
        borderColor="$neonGreen">
        <Text color="$text" fontSize={16} lineHeight={22} textAlign="center">
          {message}
        </Text>

        {children}

        {onNext && buttonLabel && (
          <Button
            testID="tutorial-overlay-next-button"
            marginTop="$2"
            backgroundColor="$neonGreen"
            color="#000"
            borderRadius="$4"
            onPress={onNext}>
            {buttonLabel}
          </Button>
        )}
      </YStack>
    </Stack>
  );
}
