import { useRouter, useLocalSearchParams, type Href } from 'expo-router';
import { Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { Button, Input, ScrollView, Text } from 'tamagui';

import { useHabitStore } from '@/src/stores/habitStore';
import { useTranslation } from '@/src/core/i18n/i18n';
import { IconPicker } from '@/src/features/habit/IconPicker';
import { TutorialOverlay } from '@/src/features/tutorial/TutorialOverlay';

const HABIT_TITLE_MAX_LENGTH = 20;
const MAX_FREE_HABITS = 3;

export default function EditScreen() {
  const router = useRouter();
  const { id, tutorial } = useLocalSearchParams<{ id?: string; tutorial?: string }>();
  const { t } = useTranslation();
  const habits = useHabitStore((s) => s.habits);
  const saveHabit = useHabitStore((s) => s.saveHabit);
  const removeHabit = useHabitStore((s) => s.removeHabit);

  const target = habits.find((h) => h.id === id);
  const [name, setName] = useState(target?.title ?? '');
  const [selectedIcon, setSelectedIcon] = useState(target?.icon ?? 'walk');
  const isEdit = Boolean(id);
  const isTutorial = tutorial === '1' && !isEdit;

  type EditTutorialStep = 'none' | 'icon' | 'name' | 'submit';
  const [editStep, setEditStep] = useState<EditTutorialStep>('none');

  useEffect(() => {
    setName(target?.title ?? '');
    setSelectedIcon(target?.icon ?? 'walk');
  }, [target?.title, target?.icon]);

  useEffect(() => {
    if (isTutorial) {
      setEditStep('icon');
    }
  }, [isTutorial]);

  const titleLength = name.length;
  const isTitleTooLong = titleLength > HABIT_TITLE_MAX_LENGTH;

  useEffect(() => {
    if (titleLength === HABIT_TITLE_MAX_LENGTH + 1) {
      Alert.alert(t('errorTitleTooLong'));
    }
  }, [titleLength, t]);

  const handleSave = async () => {
    const trimmed = name.trim();

    if (!trimmed) {
      Alert.alert(t('errorTitleRequired'));
      return;
    }

    if (trimmed.length > HABIT_TITLE_MAX_LENGTH) {
      Alert.alert(t('errorTitleTooLong'));
      return;
    }

    const isNewHabit = !isEdit;
    if (isNewHabit && habits.length >= MAX_FREE_HABITS) {
      Alert.alert(t('habitLimitTitle'), t('habitLimitBody'), [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('openPro'),
          onPress: () => router.push('/pro' as Href),
        },
      ]);
      return;
    }

    await saveHabit({
      id: target?.id,
      title: trimmed,
      icon: selectedIcon,
    });

    if (isTutorial) {
      router.replace('/?fromTutorial=1');
    } else {
      router.back();
    }
  };

  const handleDelete = () => {
    if (!target?.id) return;

    Alert.alert(
      t('editDeleteHabit'),
      t('deleteConfirmBody'),
      [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        {
          text: t('delete'),
          style: 'destructive',
          onPress: async () => {
            await removeHabit(target.id!);
            router.back();
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <ScrollView
      backgroundColor="$background"
      flex={1}
      contentContainerStyle={{ padding: 16, gap: 16 }}>
      <Text color="$text" fontSize={22} fontWeight="700">
        {isEdit ? t('editHabitTitle') : t('editNewHabit')}
      </Text>

      <Text color="$text" fontWeight="700" marginBottom="$2">
        {t('editIconLabel')}
      </Text>
      <IconPicker value={selectedIcon} onChange={setSelectedIcon} />

      <Text color="$text" fontWeight="700">
        {t('editNameLabel').replace(/\s*\(.*\)\s*$/, '')}
      </Text>
      <Input
        size="$4"
        height={48}
        fontSize={16}
        paddingHorizontal="$3"
        value={name}
        onChangeText={(v) => setName(v)}
        placeholder={t('editNamePlaceholder')}
        placeholderTextColor="#888888"
        backgroundColor="$surface"
        borderColor="$gray"
        color="$text"
      />
      <Text
        color={isTitleTooLong ? '$neonPink' : '$muted'}
        fontSize={12}
        marginTop={4}>
        {titleLength} / {HABIT_TITLE_MAX_LENGTH}
      </Text>

      <Button
        size="$4"
        height={48}
        fontWeight="800"
        backgroundColor="$neonGreen"
        color="#000"
        borderRadius="$4"
        onPress={handleSave}>
        {isEdit ? t('editSaveChanges') : t('editCreateHabit')}
      </Button>

      {isEdit && (
        <Button
          size="$4"
          height={48}
          backgroundColor="$background"
          color="$neonPink"
          borderRadius="$4"
          onPress={handleDelete}>
          {t('editDeleteHabit')}
        </Button>
      )}

      {/* チュートリアル Overlay */}
      {isTutorial && editStep === 'icon' && (
        <TutorialOverlay
          message={t('tutorialEditIconBody')}
          buttonLabel={t('tutorialNext')}
          onNext={() => setEditStep('name')}
          backgroundTapEnabled
          verticalAlign="bottom"
        />
      )}

      {isTutorial && editStep === 'name' && (
        <TutorialOverlay
          message={t('tutorialEditNameBody')}
          buttonLabel={t('tutorialNext')}
          onNext={() => setEditStep('submit')}
          backgroundTapEnabled
          verticalAlign="center"
        />
      )}

      {isTutorial && editStep === 'submit' && (
        <TutorialOverlay
          message={t('tutorialEditSubmitBody')}
          buttonLabel={t('tutorialGotIt')}
          onNext={() => setEditStep('none')}
          backgroundTapEnabled
          verticalAlign="top"
        />
      )}
    </ScrollView>
  );
}
