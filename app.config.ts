import type { ExpoConfig } from '@expo/config';

const BILLING_PERMISSION = 'com.android.vending.BILLING';
const RECORD_AUDIO_PERMISSION = 'android.permission.RECORD_AUDIO';
export default ({ config }: { config: ExpoConfig }) => {
  const permissions = config.android?.permissions ?? [];
  const nextPermissions = permissions.includes(BILLING_PERMISSION)
    ? permissions
    : [...permissions, BILLING_PERMISSION];
  const blockedPermissions = config.android?.blockedPermissions ?? [];
  const nextBlockedPermissions = blockedPermissions.includes(RECORD_AUDIO_PERMISSION)
    ? blockedPermissions
    : [...blockedPermissions, RECORD_AUDIO_PERMISSION];

  return {
    ...config,
    android: {
      ...config.android,
      versionCode: 8,
      permissions: nextPermissions,
      blockedPermissions: nextBlockedPermissions,
    },
    extra: {
      ...config.extra,
      // iOS Public SDK Key (appl_...) ONLY. Do NOT put Secret API Key here.
      REVENUECAT_IOS_API_KEY: 'appl_gbzEeaGdycTrUUVKxuZBbToPnEd',
      // Android Public SDK Key (goog_...) ONLY. Do NOT put Secret API Key here.
      REVENUECAT_ANDROID_API_KEY: 'goog_DvfwxgtIEWZpFVZQhrOwfdYSNRi',
      // Set to '1' while debugging. Change to '0' (or remove) for release builds.
      IAP_DEBUG: '1',
    },
  };
};
