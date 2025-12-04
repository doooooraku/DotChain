import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Localization from 'expo-localization';

import baseEn, { TranslationKey } from './locales/en';
import ja from './locales/ja';
import fr from './locales/fr';
import es from './locales/es';
import de from './locales/de';
import it from './locales/it';
import pt from './locales/pt';
import ru from './locales/ru';
import zh from './locales/zh';
import ko from './locales/ko';
import hi from './locales/hi';
import id from './locales/id';
import th from './locales/th';
import vi from './locales/vi';
import ms from './locales/ms';
import tr from './locales/tr';
import nl from './locales/nl';
import sv from './locales/sv';

const dictionaries = {
  en: baseEn,
  ja,
  fr,
  es,
  de,
  it,
  pt,
  ru,
  zh,
  ko,
  hi,
  id,
  th,
  vi,
  ms,
  tr,
  nl,
  sv,
} satisfies Record<string, Record<TranslationKey, string>>;

export type Lang = keyof typeof dictionaries;

const isSupportedLang = (code?: string): code is Lang => {
  if (!code) return false;
  return code in dictionaries;
};

const detectInitialLang = (): Lang => {
  try {
    const locales = Localization.getLocales();
    const primary = locales?.[0];
    const code = primary?.languageCode?.toLowerCase();
    if (isSupportedLang(code)) return code;
    return 'en';
  } catch {
    return 'en';
  }
};

type I18nState = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const useI18nStore = create<I18nState>()(
  persist(
    (set) => ({
      lang: detectInitialLang(),
      setLang: (lang) => set({ lang: isSupportedLang(lang) ? lang : 'en' }),
    }),
    {
      name: 'dotchain-i18n',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export function useTranslation() {
  const lang = useI18nStore((s) => s.lang);
  const setLang = useI18nStore((s) => s.setLang);
  const t = (key: TranslationKey) => dictionaries[lang][key] ?? key;
  return { t, lang, setLang };
}

export function setLang(lang: Lang) {
  useI18nStore.getState().setLang(lang);
}

export function getLang(): Lang {
  return useI18nStore.getState().lang;
}

export function tAll() {
  const lang = useI18nStore.getState().lang;
  return dictionaries[lang];
}

export function t(key: TranslationKey) {
  const lang = useI18nStore.getState().lang;
  return dictionaries[lang][key] ?? key;
}

export { TranslationKey };
