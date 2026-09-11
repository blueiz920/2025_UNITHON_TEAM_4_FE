import { useState } from "react";
import { useLangStore } from "../libraries/stores/langStore";
import {
  fetchFestivalInfo,
  fetchFestivalList,
  fetchFestivalPeriod,
  fetchFestivalSearch,
  fetchFestivalDetailInfo,
  fetchLocationFood,
  GetFestivalListParams,
  GetLocationFoodParams,
} from "../apis/festival";
import type { FestivalListItem, FestivalDetailInfoItem, LocationFoodItem } from "../types/festival";
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

const FESTIVAL_SEARCH_PAGE_SIZE = 8;

type FestivalSearchPage = {
  item: FestivalListItem[];
  totalCount: number;
};

type MultiKeywordSearchMode = "AND" | "OR";

function uniqueFestivalItems(items: FestivalListItem[]) {
  return Array.from(
    new Map(items.map((festival) => [festival.contentid, festival])).values(),
  );
}

async function fetchAllFestivalSearchResults(keyword: string, lang: string) {
  const firstPage = await fetchFestivalSearch(keyword, lang, 1);
  const totalPages = Math.ceil(firstPage.totalCount / FESTIVAL_SEARCH_PAGE_SIZE);

  if (totalPages <= 1) {
    return uniqueFestivalItems(firstPage.item);
  }

  const remainingPages = await Promise.all(
    Array.from({ length: totalPages - 1 }, (_, index) =>
      fetchFestivalSearch(keyword, lang, index + 2),
    ),
  );

  return uniqueFestivalItems([
    ...firstPage.item,
    ...remainingPages.flatMap((page) => page.item),
  ]);
}

function combineFestivalSearchResults(
  resultItems: FestivalListItem[][],
  mode: MultiKeywordSearchMode,
): FestivalSearchPage {
  if (mode === "OR") {
    const item = uniqueFestivalItems(resultItems.flat());
    return { item, totalCount: item.length };
  }

  const firstResult = uniqueFestivalItems(resultItems[0] ?? []);
  const resultSets = resultItems.map(
    (items) => new Set(items.map((festival) => festival.contentid)),
  );
  const item = firstResult.filter((festival) =>
    resultSets.every((resultSet) => resultSet.has(festival.contentid)),
  );

  return { item, totalCount: item.length };
}

// 무한 스크롤용 리스트
export function useInfiniteFestivalList(params: GetFestivalListParams = {}) {
  const lang = useLangStore((state) => state.lang);
  return useInfiniteQuery<{ item: FestivalListItem[]; totalCount: number }>({
    queryKey: ["festivalsInfinite", { ...params, lang }],
    queryFn: ({ pageParam = 1 }) => fetchFestivalList({ ...params, lang, pageNo: pageParam as number }),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.item.length === 8 ? allPages.length + 1 : undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60,
  });
}

// 무한 스크롤용 검색
export function useInfiniteFestivalSearch(keyword: string) {
  const lang = useLangStore((state) => state.lang);
  return useInfiniteQuery<{ item: FestivalListItem[]; totalCount: number }>({
    queryKey: ["festivalSearchInfinite", keyword, lang],
    queryFn: ({ pageParam = 1 }) => fetchFestivalSearch(keyword, lang, pageParam as number),
    enabled: !!keyword,
    getNextPageParam: (lastPage, allPages) => {
      const loadedCount = allPages.reduce(
        (total, page) => total + page.item.length,
        0,
      );

      return loadedCount < lastPage.totalCount
        ? allPages.length + 1
        : undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60,
  });
}

export function useFestivalSearchByKeywords(
  keywords: string[],
  mode: MultiKeywordSearchMode,
  enabled: boolean,
) {
  const lang = useLangStore((state) => state.lang);
  const normalizedKeywords = Array.from(
    new Set(keywords.map((keyword) => keyword.trim()).filter(Boolean)),
  ).sort();
  const normalizedKeywordKey = normalizedKeywords.join("\u0000");
  const paginationKey = [normalizedKeywordKey, mode, lang].join("\u0001");
  const [pagination, setPagination] = useState({
    key: paginationKey,
    page: 1,
  });

  if (pagination.key !== paginationKey) {
    setPagination({ key: paginationKey, page: 1 });
  }

  const visiblePage = pagination.key === paginationKey ? pagination.page : 1;

  const query = useQuery<FestivalSearchPage>({
    queryKey: ["festivalSearchByKeywords", normalizedKeywords, mode, lang],
    queryFn: async () => {
      const resultItems = await Promise.all(
        normalizedKeywords.map((keyword) =>
          fetchAllFestivalSearchResults(keyword, lang),
        ),
      );

      return combineFestivalSearchResults(resultItems, mode);
    },
    enabled: enabled && normalizedKeywords.length > 1,
    staleTime: 1000 * 60,
  });

  const visibleItems = query.data?.item.slice(
    0,
    visiblePage * FESTIVAL_SEARCH_PAGE_SIZE,
  ) ?? [];
  const hasNextPage = !!query.data && visibleItems.length < query.data.item.length;

  const fetchNextPage = () => {
    if (hasNextPage) {
      setPagination((previousPagination) => ({
        key: paginationKey,
        page:
          previousPagination.key === paginationKey
            ? previousPagination.page + 1
            : 2,
      }));
    }
  };

  return {
    data: query.data
      ? {
          pages: [
            {
              item: visibleItems,
              totalCount: query.data.totalCount,
            },
          ],
        }
      : undefined,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage: false,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}

// 소개(overview)/info
export function useFestivalOverview(contentId?: string) {
  const lang = useLangStore((state) => state.lang);
  return useQuery({
    queryKey: ["festivalOverview", contentId, lang],
    queryFn: () => fetchFestivalInfo(contentId!, lang),
    enabled: !!contentId,
    staleTime: 1000 * 60,
  });
}

// 기간(시작,종료일)/detailIntro
export function useFestivalPeriod(contentId?: string, contentTypeId?: string) {
  const lang = useLangStore((state) => state.lang);
  return useQuery({
    queryKey: ["festivalPeriod", contentId, contentTypeId, lang],
    queryFn: () => fetchFestivalPeriod(contentId!, contentTypeId!, lang),
    enabled: !!contentId && !!contentTypeId,
    staleTime: 1000 * 60,
  });
}

// 상세정보/detailInfo
export function useFestivalDetailInfo(contentId?: string, contentTypeId?: string) {
  const lang = useLangStore((state) => state.lang);
  return useQuery<FestivalDetailInfoItem[]>({
    queryKey: ["festivalDetailInfo", contentId, contentTypeId, lang],
    queryFn: () => fetchFestivalDetailInfo(contentId!, contentTypeId!, lang),
    enabled: !!contentId && !!contentTypeId,
    staleTime: 1000 * 60,
  });
}

// 근처 먹거리 음식점 hook /api/festivals/locationFood
export function useLocationFood(params: GetLocationFoodParams, enabled = true) {
  const lang = useLangStore((state) => state.lang);
  return useQuery<LocationFoodItem[]>({
    queryKey: ["locationFood", { ...params, lang }],
    queryFn: () => fetchLocationFood({ ...params, lang }),
    enabled: !!params.mapx && !!params.mapy && enabled,
    staleTime: 1000 * 60,
  });
}
