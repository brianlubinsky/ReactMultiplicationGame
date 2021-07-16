import i18n from 'i18next'
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from 'react-i18next'
import XHR from 'i18next-xhr-backend'
import { buttons_en } from "./translations/en/ButtonResource_en";
import { buttons_es } from "./translations/es/ButtonResource_es";

import { punctuation_en } from "./translations/en/PunctuationResource_en";
import { punctuation_es } from "./translations/es/PunctuationResource_es";

import { phrases_en } from "./translations/en/Phrases_en";
import { phrases_es } from "./translations/es/Phrases_es";

import { words_en } from "./translations/en/Words_en";
import { words_es } from "./translations/es/Words_es";

export const resources = {
    en: {
        buttons: buttons_en,
        punctuation:punctuation_en,
        phrases:phrases_en,
        words:words_en
    },
    es: {
        buttons: buttons_es,
        punctuation:punctuation_es,
        phrases:phrases_es,
        words:words_es
    }
}

i18n
    .use(XHR)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        //lng: 'en',
        //fallbackLng: "en",
        ns: ['buttons'],
        defaultNS: 'buttons',
        resources: resources,
        keySeparator: ".",
        interpolation: {
            escapeValue: false,
            formatSeparator: ","
        },
        react: {
            wait: true,
            bindI18n: 'languageChanged loaded',
            nsMode: 'default'
        }
    })

export default i18n;
