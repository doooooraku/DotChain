import type { ExpoConfig } from '@expo/config';

const BILLING_PERMISSION = 'com.android.vending.BILLING';
const PURCHASES_PLUGIN = 'react-native-purchases';

export default ({ config }: { config: ExpoConfig }) => {
  const permissions = config.android?.permissions ?? [];
  const nextPermissions = permissions.includes(BILLING_PERMISSION)
    ? permissions
    : [...permissions, BILLING_PERMISSION];

  const plugins = config.plugins ?? [];
  const hasPurchasesPlugin = plugins.some((plugin) =>
    Array.isArray(plugin) ? plugin[0] === PURCHASES_PLUGIN : plugin === PURCHASES_PLUGIN,
  );
  const nextPlugins = hasPurchasesPlugin ? plugins : [...plugins, PURCHASES_PLUGIN];

  return {
    ...config,
    android: {
      ...config.android,
      permissions: nextPermissions,
    },
    plugins: nextPlugins,
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
