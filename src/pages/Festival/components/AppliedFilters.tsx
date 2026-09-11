"use client";

import { MapPin, Calendar } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/Badge";
import {
  createFestivalKeywordOptions,
  regions,
  seasons,
  type FestivalKeywordId,
  type FestivalKeywordLabels,
} from "../constants";
import { useTranslation } from 'react-i18next';
interface AppliedFiltersProps {
  selectedRegion: string;
  selectedSeason: string;
  selectedKeywordIds: FestivalKeywordId[];
  onReset: () => void;
  // (옵션: onRemoveKeyword, onRemoveRegion 등 추가로 지원 가능)
}

export function AppliedFilters({
  selectedRegion,
  selectedSeason,
  selectedKeywordIds,
  onReset,
}: AppliedFiltersProps) {
  const hasAny =
    selectedRegion !== "all" || selectedSeason !== "all" || selectedKeywordIds.length > 0;
  const { t } = useTranslation();
  const keywordLabels = t("festivalFilter.keywords", {
    returnObjects: true,
  }) as FestivalKeywordLabels;
  const keywordOptions = createFestivalKeywordOptions(keywordLabels);
  if (!hasAny) return null;

  return (
    <div className="mb-4 w-auto flex flex-wrap items-center justify-end gap-2 ml-6">
      <span className="text-sm text-gray-500">{t("festivalAppliedFilter.appliedFilters")}</span>
      {selectedRegion !== "all" && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {regions.find((r) => r.value === selectedRegion)?.label}
        </Badge>
      )}
      {selectedSeason !== "all" && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {seasons.find((s) => s.value === selectedSeason)?.label}
        </Badge>
      )}
      {selectedKeywordIds.map((keywordId) => {
        const keyword = keywordOptions.find((option) => option.id === keywordId);
        if (!keyword) return null;

        return (
          <Badge key={keywordId} variant="outline" className="flex bg-[#ff651b]/90 items-center gap-1">
            {keyword.label}
          </Badge>
        );
      })}
      <Button variant="ghost" size="sm" className="h-6 text-xs text-gray-500" onClick={onReset}>
        {t("festivalAppliedFilter.resetFilters")}
      </Button>
    </div>
  );
}
