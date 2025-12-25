import 'dotenv/config';
import type { ExpoConfig } from '@expo/config';

export default ({ config }: { config: ExpoConfig }) => ({
  ...config,
  extra: {
    ...config.extra,
    REVENUECAT_IOS_API_KEY: process.env.REVENUECAT_IOS_API_KEY,
    REVENUECAT_ANDROID_API_KEY: process.env.REVENUECAT_ANDROID_API_KEY,
  },
});
