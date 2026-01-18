import { Alert, Linking } from 'react-native';

const DEFAULT_TITLE = 'Link Error';
const DEFAULT_MESSAGE = 'Failed to open the link.';

export async function openExternalLink(
  url: string,
  options?: { title?: string; message?: string },
) {
  try {
    const supported = await Linking.canOpenURL(url);
    if (!supported) {
      Alert.alert(options?.title ?? DEFAULT_TITLE, options?.message ?? DEFAULT_MESSAGE);
      return;
    }
    await Linking.openURL(url);
  } catch (error) {
    console.warn('[openExternalLink] failed to open url', { url, error });
    Alert.alert(options?.title ?? DEFAULT_TITLE, options?.message ?? DEFAULT_MESSAGE);
  }
}
