import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import ja from './locales/ja.json';

/** <html lang> を表示言語に追従させる（スクリーンリーダーと字形選択のため） */
function syncDocumentLang(lng: string) {
  document.documentElement.lang = lng.startsWith('ja') ? 'ja' : 'en';
}

i18n.on('languageChanged', syncDocumentLang);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ja: { translation: ja },
    },
    fallbackLng: 'en',
    // en-US や ja-JP は en / ja に丸め、それ以外の言語は en にフォールバックする
    supportedLngs: ['en', 'ja'],
    nonExplicitSupportedLngs: true,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
