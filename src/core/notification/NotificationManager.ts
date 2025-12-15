import Constants from 'expo-constants';
import type { NotificationTriggerInput } from 'expo-notifications';

import { t } from '@/src/core/i18n/i18n';

const DAILY_REMINDER_ID = 'daily-reminder';

let Notifications: typeof import('expo-notifications') | null = null;
let notificationInitialized = false;

async function loadNotifications() {
  if (!Notifications) {
    Notifications = await import('expo-notifications');
  }
  return Notifications;
}

// 初期化は遅延実行し、Expo Go ではスキップ
export async function initNotifications() {
  if (notificationInitialized) return;
  if (Constants.appOwnership === 'expo') {
    // Expo Go では通知をスキップ
    return;
  }
  const Notif = await loadNotifications();
  Notif.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
  notificationInitialized = true;
}

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
  const Notif = await loadNotifications();
  const { status } = await Notif.getPermissionsAsync();
  if (status === 'granted') return true;

  const { status: newStatus } = await Notif.requestPermissionsAsync({
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
  const Notif = await loadNotifications();
  const { hour, minute } = parseTimeString(timeStr);

  // 既存スケジュールを安全にキャンセルしてから再登録
  await cancelDailyReminder();

  const trigger = {
    hour,
    minute,
    repeats: true,
  } as NotificationTriggerInput;

  await Notif.scheduleNotificationAsync({
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
    const Notif = await loadNotifications();
    await Notif.cancelScheduledNotificationAsync(DAILY_REMINDER_ID);
  } catch {
    // まだ登録が無い場合などは無視
  }
}
