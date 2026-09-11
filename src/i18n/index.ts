import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import {
  FESTIVAL_FILTER_KEYWORDS,
  type FestivalFilterLanguage,
} from "../constants/festivalFilterKeywords";

import kor from "./locales/kor.json";
import eng from "./locales/eng.json";
import jpn from "./locales/jpn.json";
import chn from "./locales/chn.json";
import fra from "./locales/fra.json";     // 프랑스어
import spa from "./locales/spa.json";     // 스페인어
import rus from "./locales/rus.json";     // 러시아어
// ...필요한 언어 추가

function withFestivalFilterKeywords<T extends { festivalFilter: object }>(
  locale: T,
  language: FestivalFilterLanguage,
) {
  return {
    ...locale,
    festivalFilter: {
      ...locale.festivalFilter,
      keywords: FESTIVAL_FILTER_KEYWORDS[language],
    },
  };
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      kor: { translation: withFestivalFilterKeywords(kor, "kor") },
      eng: { translation: withFestivalFilterKeywords(eng, "eng") },
      jpn: { translation: withFestivalFilterKeywords(jpn, "jpn") },
      chn: { translation: withFestivalFilterKeywords(chn, "chn") },
      fra: { translation: withFestivalFilterKeywords(fra, "fra") }, // 프랑스어
      spa: { translation: withFestivalFilterKeywords(spa, "spa") }, // 스페인어
      rus: { translation: withFestivalFilterKeywords(rus, "rus") }, // 러시아어
      // ...필요한 언어 추가
    },
    lng: "kor", // 기본 언어
    fallbackLng: "kor", // 없으면 한글
    interpolation: { escapeValue: false },
  });

export default i18n;
