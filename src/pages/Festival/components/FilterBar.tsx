"use client";

import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import { Badge } from "../../../components/ui/Badge";
import { Button } from "../../../components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../components/Popover";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../components/Select";
import { SearchBar } from "../components/SearchBar";
import {
  createFestivalKeywordOptions,
  type FestivalKeywordId,
} from "../constants";
// import { keywords } from "../constants";
import { useTranslation } from 'react-i18next';
// AND/OR 토글 버튼
function KeywordModeToggle({
  mode,
  onChange,
}: {
  mode: "AND" | "OR";
  onChange: (m: "AND" | "OR") => void;
}) {
  const { t } = useTranslation();
  return (
    <div className="flex gap-2 items-center">
      <span className="text-xs text-gray-400">{t("festivalFilter.keywordMode")}</span>
      <Button
        size="sm"
        variant={mode === "OR" ? "default" : "outline"}
        className="px-2 py-0.5 text-xs"
        onClick={() => onChange("OR")}
      >
        OR
      </Button>
      <Button
        size="sm"
        variant={mode === "AND" ? "default" : "outline"}
        className="px-2 py-0.5 text-xs"
        onClick={() => onChange("AND")}
      >
        AND
      </Button>
    </div>
  );
}

interface FilterBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  selectedSeason: string;
  onSeasonChange: (season: string) => void;
  selectedKeywordIds: FestivalKeywordId[];
  onApplyKeywords: (appliedKeywordIds: FestivalKeywordId[]) => void;
  onReset: () => void;
  keywordFilterMode: "AND" | "OR";
  onKeywordFilterModeChange: (mode: "AND" | "OR") => void;
}

export function FilterBar({
  searchQuery,
  onSearch,
  selectedRegion,
  // onRegionChange,
  selectedSeason,
  // onSeasonChange,
  selectedKeywordIds,
  onApplyKeywords,
  onReset,
  keywordFilterMode,
  onKeywordFilterModeChange,
}: FilterBarProps) {
  const { t } = useTranslation();
  // "적용 전" draft 상태 관리
  const [selectedKeywordIdsDraft, setSelectedKeywordIdsDraft] = useState<FestivalKeywordId[]>(
    selectedKeywordIds,
  );

  const keywordLabels = t("festivalFilter.keywords", { returnObjects: true }) as string[];
  const keywordOptions = createFestivalKeywordOptions(keywordLabels);

  // 부모가 바뀌면 draft도 맞춰서 동기화
  useEffect(() => {
    setSelectedKeywordIdsDraft(selectedKeywordIds);
  }, [selectedKeywordIds]);

  const hasFilter =
    selectedRegion !== "all" || selectedSeason !== "all" || selectedKeywordIds.length > 0;

  const handleBadgeClick = (keywordId: FestivalKeywordId) => {
    setSelectedKeywordIdsDraft((prev) =>
      prev.includes(keywordId)
        ? prev.filter((id) => id !== keywordId)
        : [...prev, keywordId],
    );
  };

  const handleApply = () => {
    onApplyKeywords(selectedKeywordIdsDraft);
  };

  const handleReset = () => {
    setSelectedKeywordIdsDraft([]);
    onReset();
  };

  return (
    <div className="mb-3 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* 검색바 */}
      <SearchBar onSearch={onSearch} defaultValue={searchQuery} />

      <Popover>
        <PopoverTrigger>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            {t("festivalFilter.filter")}
            {hasFilter && (
              <Badge className="ml-1 rounded-full bg-[#ff651b] px-1.5 py-0.5 text-xs text-white">
                {t("festivalFilter.filterApplied")}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4 p-2">
            {/* 지역
            <div className="space-y-2">
              <h4 className="font-medium">지역</h4>
              <Select value={selectedRegion} onValueChange={onRegionChange}>
                <SelectTrigger>
                  <SelectValue placeholder="지역 선택" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.value} value={region.value}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            계절
            <div className="space-y-2">
              <h4 className="font-medium">계절</h4>
              <Select value={selectedSeason} onValueChange={onSeasonChange}>
                <SelectTrigger>
                  <SelectValue placeholder="계절 선택" />
                </SelectTrigger>
                <SelectContent>
                  {seasons.map((season) => (
                    <SelectItem key={season.value} value={season.value}>
                      {season.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
            {/* 키워드 + AND/OR 토글 */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{t("festivalFilter.keyword")}</h4>
                <KeywordModeToggle mode={keywordFilterMode} onChange={onKeywordFilterModeChange} />
              </div>
              {/* --- AND/OR 가이드 --- */}
              <div className="flex gap-2 items-center mb-2">
                <span className="text-xs text-gray-400">
                  {keywordFilterMode === "AND"
                    ? t("festivalFilter.guideAnd")
                    : t("festivalFilter.guideOr")}
                </span>
              </div>
              {/* --- 검색 기준 키워드 구역 --- */}
              <div className="flex flex-wrap items-center gap-1 mb-2 min-h-6">
                {selectedKeywordIdsDraft.length > 0 && (
                  <>
                    <span className="font-bold text-xs text-gray-500 mr-1">{t("festivalFilter.searchBasis")} </span>
                    <Badge className="bg-[#ff651b] text-white">
                      {keywordOptions.find((option) => option.id === selectedKeywordIdsDraft[0])?.label}
                    </Badge>
                    {selectedKeywordIdsDraft.slice(1).map((id, idx) => (
                      <span key={id} className="flex items-center">
                        <span className="mx-1 text-xs font-bold text-gray-400">
                          {keywordFilterMode === "AND"
                            ? idx === 0
                              ? "+" // 두 번째 키워드 앞에는 +
                              : "," // 그 뒤에는 ,
                            : "or"}
                        </span>
                        <Badge className="bg-gray-200 text-gray-700">
                          {keywordOptions.find((option) => option.id === id)?.label}
                        </Badge>
                      </span>
                    ))}
                  </>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {keywordOptions.map(({ id, label }) => (
                  <Badge
                    key={id}
                    variant={selectedKeywordIdsDraft.includes(id) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      selectedKeywordIdsDraft.includes(id)
                        ? "bg-[#ff651b] hover:bg-[#ff651b]"
                        : "hover:bg-gray-300 text-gray-500"
                    }`}
                    onClick={() => handleBadgeClick(id)}
                  >
                    {label}
                  </Badge>
                ))}
              </div>
            </div>
            {/* 버튼 */}
            <div className="flex justify-between pt-2">
              <Button variant="outline" size="sm" onClick={handleReset}>
                {t("festivalFilter.reset")}
              </Button>
              <Button
                size="sm"
                className="bg-[#ff651b] hover:bg-[#ff651b]/90 text-[#fffefb]"
                onClick={handleApply}
                disabled={selectedKeywordIdsDraft.length === 0}
              >
                {t("festivalFilter.apply")}
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
