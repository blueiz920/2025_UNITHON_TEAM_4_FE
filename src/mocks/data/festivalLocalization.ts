import type { FestivalListItem } from "../../types/festival";
import {
  DEFAULT_FESTIVAL_SEARCH_LANGUAGE,
  festivalSearchAliases,
  isFestivalSearchLanguage,
  type FestivalSearchLanguage,
} from "./festivalSearchAliases";
import type { FestivalBase } from "./festivals";
import { festivalLocales, type FestivalLocalizedFields } from "./festivalLocales";

export function resolveFestivalLanguage(
  value: string | null | undefined,
): FestivalSearchLanguage {
  const normalizedValue = value?.trim() ?? null;

  return isFestivalSearchLanguage(normalizedValue)
    ? normalizedValue
    : DEFAULT_FESTIVAL_SEARCH_LANGUAGE;
}

export function getFestivalLocale(
  contentId: string,
  lang: string | null | undefined,
): FestivalLocalizedFields | undefined {
  const language = resolveFestivalLanguage(lang);
  const locale = festivalLocales[contentId];

  return locale?.[language] ?? locale?.[DEFAULT_FESTIVAL_SEARCH_LANGUAGE];
}

export function getLocalizedFestival(
  festival: FestivalBase,
  lang: string | null | undefined,
): FestivalListItem {
  const locale = getFestivalLocale(festival.contentid, lang);

  if (!locale) {
    throw new Error(`Missing festival locale for ${festival.contentid}`);
  }

  return {
    ...festival,
    ...locale,
  };
}

export function getFestivalSearchableText(
  festival: FestivalBase,
  lang: string | null | undefined,
) {
  const language = resolveFestivalLanguage(lang);
  const localizedFestival = getLocalizedFestival(festival, language);
  const searchTerms = festivalSearchAliases[festival.contentid]?.[language];

  return [
    localizedFestival.title,
    localizedFestival.overview,
    localizedFestival.addr1,
    localizedFestival.addr2,
    ...(searchTerms?.aliases ?? []),
    ...(searchTerms?.tags ?? []),
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ")
    .toLowerCase();
}
