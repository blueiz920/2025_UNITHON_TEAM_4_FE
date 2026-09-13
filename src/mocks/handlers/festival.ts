import { http, HttpResponse, passthrough } from "msw";
import type {
  FestivalDetailInfoItem,
  FestivalDetailInfoResponse,
  FestivalDetailIntroItem,
  FestivalDetailIntroResponse,
  FestivalInfoItem,
  FestivalInfoResponse,
  FestivalListResponse,
  LocationFoodItem,
  LocationFoodResponse,
} from "../../types/festival";
import { mockFestivals } from "../data/festivals";
import {
  getFestivalDetailMetadata,
  getFestivalDetailSectionLabels,
} from "../data/festivalDetails";
import {
  DEFAULT_FESTIVAL_SEARCH_LANGUAGE,
  festivalSearchAliases,
  isFestivalFilterKeyword,
  isFestivalSearchLanguage,
} from "../data/festivalSearchAliases";
import type { FestivalSearchLanguage } from "../data/festivalSearchAliases";
import {
  readFestivalLikes,
  toggleStoredFestivalLike,
} from "../storage/festivalLikes";
import type { FestivalLike } from "../storage/festivalLikes";

const DEFAULT_PAGE_NO = 1;
const DEFAULT_NUM_OF_ROWS = 8;

function getRequestSearchParams(request: Request) {
  const requestUrl = new URL(request.url);
  const targetUrl = requestUrl.searchParams.get("url");

  if (!targetUrl) return requestUrl.searchParams;

  const params = new URLSearchParams();

  try {
    const target = new URL(targetUrl, requestUrl.origin);
    target.searchParams.forEach((value, key) => params.set(key, value));
  } catch {
    // The outer proxy query is still available when the target URL is invalid.
  }

  requestUrl.searchParams.forEach((value, key) => {
    if (key !== "url") params.set(key, value);
  });

  return params;
}

function parsePositiveInteger(value: string | null, fallback: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function normalizeDate(value: string | null) {
  if (!value) return undefined;

  const normalized = value.replace(/-/g, "");
  return /^\d{8}$/.test(normalized) ? normalized : undefined;
}

function getFestivalListParams(request: Request) {
  const searchParams = getRequestSearchParams(request);

  return {
    pageNo: parsePositiveInteger(searchParams.get("pageNo"), DEFAULT_PAGE_NO),
    numOfRows: parsePositiveInteger(
      searchParams.get("numOfRows"),
      DEFAULT_NUM_OF_ROWS,
    ),
    eventStartDate: normalizeDate(searchParams.get("eventStartDate")),
    eventEndDate: normalizeDate(searchParams.get("eventEndDate")),
    areaCode: searchParams.get("areaCode")?.trim() || undefined,
  };
}

function createFestivalListResponse(request: Request) {
  const { pageNo, numOfRows, eventStartDate, eventEndDate, areaCode } =
    getFestivalListParams(request);
  const filteredFestivals = mockFestivals.filter((festival) => {
    const festivalStartDate = normalizeDate(festival.eventstartdate ?? null);
    const festivalEndDate = normalizeDate(festival.eventenddate ?? null);

    if (areaCode && festival.areacode !== areaCode) return false;
    if (eventStartDate && (!festivalEndDate || festivalEndDate < eventStartDate)) {
      return false;
    }
    if (eventEndDate && (!festivalStartDate || festivalStartDate > eventEndDate)) {
      return false;
    }

    return true;
  });
  const startIndex = (pageNo - 1) * numOfRows;
  const item = filteredFestivals.slice(startIndex, startIndex + numOfRows);

  const response: FestivalListResponse = {
    status: 200,
    message: "OK",
    data: {
      response: {
        header: {
          resultCode: "0000",
          resultMsg: "OK",
        },
        body: {
          items: {
            item,
          },
          numOfRows,
          pageNo,
          totalCount: filteredFestivals.length,
        },
      },
    },
  };

  return HttpResponse.json(response);
}

function normalizeKeyword(value: string | null) {
  return value?.trim().toLowerCase() ?? "";
}

function getFestivalSearchParams(request: Request) {
  const searchParams = getRequestSearchParams(request);
  const requestedLanguage = searchParams.get("lang")?.trim() ?? null;

  return {
    keyword: normalizeKeyword(searchParams.get("keyword")),
    lang: isFestivalSearchLanguage(requestedLanguage)
      ? requestedLanguage
      : DEFAULT_FESTIVAL_SEARCH_LANGUAGE,
    pageNo: parsePositiveInteger(searchParams.get("pageNo"), DEFAULT_PAGE_NO),
    numOfRows: parsePositiveInteger(
      searchParams.get("numOfRows"),
      DEFAULT_NUM_OF_ROWS,
    ),
  };
}

function getFestivalSearchableText(
  festival: (typeof mockFestivals)[number],
  lang: FestivalSearchLanguage,
) {
  const searchTerms = festivalSearchAliases[festival.contentid]?.[lang];
  const aliases = searchTerms?.aliases ?? [];
  const tags = searchTerms?.tags ?? [];

  return [
    festival.title,
    festival.overview,
    festival.addr1,
    festival.addr2,
    ...aliases,
    ...tags,
  ]
    .filter((value): value is string => Boolean(value))
    .join(" ")
    .toLowerCase();
}

function matchesFestivalSearchKeyword(
  festival: (typeof mockFestivals)[number],
  keyword: string,
  lang: FestivalSearchLanguage,
) {
  const searchTerms = festivalSearchAliases[festival.contentid]?.[lang];

  if (isFestivalFilterKeyword(keyword, lang)) {
    return searchTerms?.tags.some((tag) => normalizeKeyword(tag) === keyword) ?? false;
  }

  return getFestivalSearchableText(festival, lang).includes(keyword);
}

function createFestivalSearchResponse(request: Request) {
  const { keyword, lang, pageNo, numOfRows } = getFestivalSearchParams(request);
  const filteredFestivals = keyword
    ? mockFestivals.filter((festival) =>
        matchesFestivalSearchKeyword(festival, keyword, lang),
      )
    : mockFestivals;
  const startIndex = (pageNo - 1) * numOfRows;
  const item = filteredFestivals.slice(startIndex, startIndex + numOfRows);

  const response: FestivalListResponse = {
    status: 200,
    message: "OK",
    data: {
      response: {
        header: {
          resultCode: "0000",
          resultMsg: "OK",
        },
        body: {
          items: {
            item,
          },
          numOfRows,
          pageNo,
          totalCount: filteredFestivals.length,
        },
      },
    },
  };

  return HttpResponse.json(response);
}

function getFestivalDetailParams(request: Request) {
  const searchParams = getRequestSearchParams(request);
  const requestedLanguage = searchParams.get("lang")?.trim() ?? null;

  return {
    contentId: searchParams.get("contentId")?.trim() || undefined,
    contentTypeId: searchParams.get("contentTypeId")?.trim() || undefined,
    lang: isFestivalSearchLanguage(requestedLanguage)
      ? requestedLanguage
      : DEFAULT_FESTIVAL_SEARCH_LANGUAGE,
  };
}

function findFestivalByContentId(contentId?: string) {
  return mockFestivals.find((festival) => festival.contentid === contentId);
}

function findFestivalByDetailParams(
  contentId?: string,
  contentTypeId?: string,
) {
  return mockFestivals.find(
    (festival) =>
      festival.contentid === contentId &&
      festival.contenttypeid === contentTypeId,
  );
}

function createFestivalInfoItem(festival: (typeof mockFestivals)[number]): FestivalInfoItem {
  return {
    contentid: festival.contentid,
    contenttypeid: festival.contenttypeid,
    addr1: festival.addr1,
    addr2: festival.addr2 ?? "",
    areacode: festival.areacode,
    createdtime: festival.createdtime,
    firstimage: festival.firstimage,
    firstimage2: festival.firstimage2,
    mapx: festival.mapx,
    mapy: festival.mapy,
    modifiedtime: festival.modifiedtime,
    tel: festival.tel,
    title: festival.title,
    zipcode: festival.zipcode ?? "",
    overview: festival.overview ?? "",
  };
}

function createFestivalInfoResponse(request: Request) {
  const { contentId } = getFestivalDetailParams(request);
  const festival = findFestivalByContentId(contentId);
  const item = festival ? [createFestivalInfoItem(festival)] : [];

  const response: FestivalInfoResponse = {
    status: 200,
    message: "OK",
    data: {
      response: {
        header: {
          resultCode: "0000",
          resultMsg: "OK",
        },
        body: {
          items: { item },
          numOfRows: item.length,
          pageNo: 1,
          totalCount: item.length,
        },
      },
    },
  };

  return HttpResponse.json(response);
}

function createFestivalDetailIntroResponse(request: Request) {
  const { contentId, contentTypeId } = getFestivalDetailParams(request);
  const festival = findFestivalByDetailParams(contentId, contentTypeId);
  const metadata = festival ? getFestivalDetailMetadata(festival) : undefined;
  const item: FestivalDetailIntroItem[] = festival && metadata
    ? [
        {
          contentid: festival.contentid,
          contenttypeid: festival.contenttypeid,
          sponsor1: metadata.sponsor1,
          sponsor1tel: metadata.sponsor1tel,
          eventenddate: festival.eventenddate,
          playtime: "10:00 ~ 20:00",
          eventplace: metadata.eventplace,
          eventhomepage: "https://festival-demo.example",
          agelimit: "전 연령",
          bookingplace: "현장 접수",
          placeinfo: `${festival.addr1} ${festival.addr2 ?? ""}`.trim(),
          subevent: "현장 참여 프로그램",
          program: metadata.program,
          eventstartdate: festival.eventstartdate,
          usetimefestival: "무료",
          discountinfofestival: "일부 체험 프로그램은 현장 안내를 확인해 주세요.",
          spendtimefestival: "약 2시간",
          festivalgrade: "",
        },
      ]
    : [];

  const response: FestivalDetailIntroResponse = {
    status: 200,
    message: "OK",
    data: {
      response: {
        header: {
          resultCode: "0000",
          resultMsg: "OK",
        },
        body: {
          items: { item },
          numOfRows: item.length,
          pageNo: 1,
          totalCount: item.length,
        },
      },
    },
  };

  return HttpResponse.json(response);
}

function createFestivalDetailInfoResponse(request: Request) {
  const { contentId, contentTypeId, lang } = getFestivalDetailParams(request);
  const festival = findFestivalByDetailParams(contentId, contentTypeId);
  const metadata = festival ? getFestivalDetailMetadata(festival) : undefined;
  const sectionLabels = getFestivalDetailSectionLabels(lang);
  const item: FestivalDetailInfoItem[] = festival && metadata
    ? [
        {
          contentid: festival.contentid,
          contenttypeid: festival.contenttypeid,
          serialnum: "1",
          infoname: sectionLabels.intro,
          infotext: metadata.intro,
          fldgubun: "A",
        },
        {
          contentid: festival.contentid,
          contenttypeid: festival.contenttypeid,
          serialnum: "2",
          infoname: sectionLabels.detail,
          infotext: metadata.detail,
          fldgubun: "A",
        },
      ]
    : [];

  const response: FestivalDetailInfoResponse = {
    status: 200,
    message: "OK",
    data: {
      response: {
        header: {
          resultCode: "0000",
          resultMsg: "OK",
        },
        body: {
          items: { item },
          numOfRows: item.length,
          pageNo: 1,
          totalCount: item.length,
        },
      },
    },
  };

  return HttpResponse.json(response);
}

function getLocationFoodParams(request: Request) {
  const searchParams = getRequestSearchParams(request);

  return {
    mapx: searchParams.get("MapX")?.trim() ?? "",
    mapy: searchParams.get("MapY")?.trim() ?? "",
    pageNo: parsePositiveInteger(searchParams.get("PageNo"), DEFAULT_PAGE_NO),
    numOfRows: parsePositiveInteger(searchParams.get("NumOfRows"), 4),
    radius: parsePositiveInteger(searchParams.get("Radius"), 10000),
  };
}

function createLocationFoodItem(
  festival: (typeof mockFestivals)[number],
  food: ReturnType<typeof getFestivalDetailMetadata>["foods"][number],
  index: number,
): LocationFoodItem {
  return {
    addr1: food.addr1,
    addr2: food.addr2,
    areacode: festival.areacode,
    contentid: `${festival.contentid}-food-${index + 1}`,
    contenttypeid: "39",
    createdtime: festival.createdtime,
    firstimage: `https://picsum.photos/seed/${festival.contentid}-food-${index + 1}/800/600`,
    firstimage2: `https://picsum.photos/seed/${festival.contentid}-food-${index + 1}-detail/800/600`,
    mapx: festival.mapx,
    mapy: festival.mapy,
    modifiedtime: festival.modifiedtime,
    tel: food.tel,
    title: food.title,
    zipcode: festival.zipcode,
    overview: food.overview,
    dist: food.dist,
  };
}

function createLocationFoodResponse(request: Request) {
  const { mapx, mapy, pageNo, numOfRows, radius } = getLocationFoodParams(request);
  const festival = mockFestivals.find(
    (candidate) => candidate.mapx === mapx && candidate.mapy === mapy,
  );
  const metadata = festival ? getFestivalDetailMetadata(festival) : undefined;
  const filteredFoods = metadata?.foods.filter((food) => Number(food.dist) <= radius) ?? [];
  const startIndex = (pageNo - 1) * numOfRows;
  const item = festival
    ? filteredFoods
        .slice(startIndex, startIndex + numOfRows)
        .map((food, index) => createLocationFoodItem(festival, food, startIndex + index))
    : [];

  const response: LocationFoodResponse = {
    status: 200,
    message: "OK",
    data: {
      response: {
        header: {
          resultCode: "0000",
          resultMsg: "OK",
        },
        body: {
          items: { item },
          numOfRows,
          pageNo,
          totalCount: filteredFoods.length,
        },
      },
    },
  };

  return HttpResponse.json(response);
}

function getProxyTargetPath(request: Request) {
  const requestUrl = new URL(request.url);
  const targetUrl = requestUrl.searchParams.get("url");

  if (!targetUrl) return undefined;

  try {
    return new URL(targetUrl, requestUrl.origin).pathname;
  } catch {
    return targetUrl.split("?")[0];
  }
}

function isFestivalProxyRequest(request: Request, endpoint: string) {
  return getProxyTargetPath(request)?.endsWith(endpoint) ?? false;
}

function getFestivalLikeRequestPath(request: Request) {
  return getProxyTargetPath(request) ?? new URL(request.url).pathname;
}

function getFestivalLikeContentId(request: Request) {
  const path = getFestivalLikeRequestPath(request);
  const match = path.match(/\/festivals\/([^/]+)\/like$/);

  if (!match?.[1]) return undefined;

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return undefined;
  }
}

function isFestivalLikePath(path?: string) {
  return /\/festivals\/[^/]+\/like$/.test(path ?? "");
}

function isFestivalProxyLikeRequest(request: Request) {
  return isFestivalLikePath(getProxyTargetPath(request));
}

function createFestivalLikesResponse() {
  const item = readFestivalLikes().map((like) => {
    const festival = findFestivalByContentId(like.contentId);

    return festival
      ? { ...like, contentTypeId: festival.contenttypeid }
      : like;
  });

  return HttpResponse.json(item);
}

async function readFestivalLikePayload(
  request: Request,
  contentId?: string,
): Promise<FestivalLike | null> {
  if (!contentId) return null;

  let parsed: unknown;
  try {
    parsed = await request.json();
  } catch {
    return null;
  }

  if (!parsed || typeof parsed !== "object") return null;

  const body = parsed as Record<string, unknown>;
  if (
    typeof body.contentId !== "string" ||
    typeof body.title !== "string" ||
    typeof body.imageUrl !== "string" ||
    typeof body.address !== "string"
  ) {
    return null;
  }

  return {
    // The REST path is the identity source; the body is still contract-validated.
    contentId,
    title: body.title,
    imageUrl: body.imageUrl,
    address: body.address,
  };
}

async function createFestivalLikeResponse(request: Request) {
  const contentId = getFestivalLikeContentId(request);
  const like = await readFestivalLikePayload(request, contentId);

  if (!like) {
    return HttpResponse.json(
      { message: "좋아요 요청이 올바르지 않습니다." },
      { status: 400 },
    );
  }

  const result = toggleStoredFestivalLike(like);
  return HttpResponse.json({
    message: result.liked ? "좋아요 추가됨" : "좋아요 취소됨",
  });
}

export const festivalHandlers = [
  http.get("*/festivals/list", ({ request }) => createFestivalListResponse(request)),
  http.get("*/festivals/search", ({ request }) => createFestivalSearchResponse(request)),
  http.get("*/festivals/likes", () => createFestivalLikesResponse()),
  http.get("*/festivals/info", ({ request }) => createFestivalInfoResponse(request)),
  http.get("*/festivals/detailIntro", ({ request }) => createFestivalDetailIntroResponse(request)),
  http.get("*/festivals/detailInfo", ({ request }) => createFestivalDetailInfoResponse(request)),
  http.get("*/festivals/locationFood", ({ request }) => createLocationFoodResponse(request)),
  http.post("*/festivals/:contentId/like", ({ request }) =>
    createFestivalLikeResponse(request),
  ),
  http.get("*/api/proxy", ({ request }) => {
    if (isFestivalProxyRequest(request, "/festivals/list")) {
      return createFestivalListResponse(request);
    }

    if (isFestivalProxyRequest(request, "/festivals/search")) {
      return createFestivalSearchResponse(request);
    }

    if (isFestivalProxyRequest(request, "/festivals/likes")) {
      return createFestivalLikesResponse();
    }

    if (isFestivalProxyRequest(request, "/festivals/info")) {
      return createFestivalInfoResponse(request);
    }

    if (isFestivalProxyRequest(request, "/festivals/detailIntro")) {
      return createFestivalDetailIntroResponse(request);
    }

    if (isFestivalProxyRequest(request, "/festivals/detailInfo")) {
      return createFestivalDetailInfoResponse(request);
    }

    if (isFestivalProxyRequest(request, "/festivals/locationFood")) {
      return createLocationFoodResponse(request);
    }

    return passthrough();
  }),
  http.post("*/api/proxy", ({ request }) => {
    if (isFestivalProxyLikeRequest(request)) {
      return createFestivalLikeResponse(request);
    }

    return passthrough();
  }),
];
