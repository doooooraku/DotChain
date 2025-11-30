import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, Input, ScrollView, Text } from 'tamagui';

import { useHabitStore } from '@/src/stores/habitStore';
import { useTranslation } from '@/src/core/i18n/i18n';
import { IconPicker } from '@/src/features/habit/IconPicker';
import { TutorialOverlay } from '@/src/features/tutorial/TutorialOverlay';

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

  const handleSave = async () => {
    await saveHabit({
      id: target?.id,
      title: name || t('editNewHabit'),
      icon: selectedIcon,
      color: 'neonGreen',
    });

    if (isTutorial) {
      router.replace('/?fromTutorial=1');
    } else {
      router.back();
    }
  };

  const handleDelete = async () => {
    if (target?.id) {
      await removeHabit(target.id);
    }
    router.back();
  };

  return (
    <ScrollView
      backgroundColor="$background"
      flex={1}
      contentContainerStyle={{ padding: 16, gap: 16 }}>
      <Text color="$text" fontSize={22} fontWeight="700">
        {isEdit ? t('editEditHabit') : t('editNewHabit')}
      </Text>

      <Text color="$text" fontWeight="700" marginBottom="$2">
        {t('editIconLabel')}
      </Text>
      <IconPicker value={selectedIcon} onChange={setSelectedIcon} />

      <Text color="$text" fontWeight="700">
        {t('editNameLabel')}
      </Text>
      <Input
        value={name}
        onChangeText={(v) => setName(v.slice(0, 20))}
        placeholder={t('editNamePlaceholder')}
        placeholderTextColor="#888888"
        backgroundColor="$surface"
        borderColor="$gray"
        color="$text"
      />

      <Button backgroundColor="$neonGreen" color="#000" borderRadius="$4" onPress={handleSave}>
        {isEdit ? t('editSaveChanges') : t('editCreateHabit')}
      </Button>

      {isEdit && (
        <Button backgroundColor="$background" color="$neonPink" onPress={handleDelete}>
          {t('editDeleteHabit')}
        </Button>
      )}

      {/* チュートリアル Overlay */}
      {isTutorial && editStep === 'icon' && (
        <TutorialOverlay
          message={t('tutorialEditIconBody')}
          buttonLabel={t('tutorialNext')}
          onNext={() => setEditStep('name')}
        />
      )}

      {isTutorial && editStep === 'name' && (
        <TutorialOverlay
          message={t('tutorialEditNameBody')}
          buttonLabel={t('tutorialNext')}
          onNext={() => setEditStep('submit')}
        />
      )}

      {isTutorial && editStep === 'submit' && (
        <TutorialOverlay
          message={t('tutorialEditSubmitBody')}
          buttonLabel={t('tutorialGotIt')}
          onNext={() => setEditStep('none')}
        />
      )}
    </ScrollView>
  );
}
