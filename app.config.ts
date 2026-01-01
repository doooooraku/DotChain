import type { ExpoConfig } from '@expo/config';

export default ({ config }: { config: ExpoConfig }) => ({
  ...config,
  extra: {
    ...config.extra,
    // iOS Public SDK Key (appl_...) ONLY. Do NOT put Secret API Key here.
    REVENUECAT_IOS_API_KEY: 'appl_gbzEeaGdycTrUUVKxuZBbToPnEd',
    // Set to '1' while debugging. Change to '0' (or remove) for release builds.
    IAP_DEBUG: '1',
  },
});
