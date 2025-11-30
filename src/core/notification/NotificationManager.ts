import * as Notifications from 'expo-notifications';

import { t } from '@/src/core/i18n/i18n';

const DAILY_REMINDER_ID = 'daily-reminder';

// 前景でもアラート・サウンドを出す（サウンドはOS設定に依存）
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

type TimeParts = { hour: number; minute: number };

// "HH:MM" 文字列を安全にパース（壊れていてもデフォルト08:00に補正）
function parseTimeString(timeStr: string): TimeParts {
  const [hStr, mStr] = timeStr.split(':');
  let hour = Number(hStr);
  let minute = Number(mStr);

  if (!Number.isFinite(hour) || hour < 0 || hour > 23) hour = 8;
  if (!Number.isFinite(minute) || minute < 0 || minute > 59) minute = 0;

  return { hour, minute };
}

export async function requestPermissions(): Promise<boolean> {
  const { status } = await Notifications.getPermissionsAsync();
  if (status === 'granted') return true;

  const { status: newStatus } = await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowSound: true,
      allowBadge: false,
    },
    android: {},
  });

  return newStatus === 'granted';
}

export async function scheduleDailyReminder(timeStr: string): Promise<void> {
  const { hour, minute } = parseTimeString(timeStr);

  // 既存スケジュールを安全にキャンセルしてから再登録
  await cancelDailyReminder();

  const trigger = {
    hour,
    minute,
    repeats: true,
  } as Notifications.NotificationTriggerInput;

  await Notifications.scheduleNotificationAsync({
    identifier: DAILY_REMINDER_ID,
    content: {
      title: 'DotChain',
      body: t('reminderNotificationBody'),
      sound: true,
    },
    trigger,
  });
}

export async function cancelDailyReminder(): Promise<void> {
  try {
    await Notifications.cancelScheduledNotificationAsync(DAILY_REMINDER_ID);
  } catch {
    // まだ登録が無い場合などは無視
  }
}
