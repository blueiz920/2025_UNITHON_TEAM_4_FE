import { http, HttpResponse, passthrough } from "msw";
import type { FestivalListResponse } from "../../types/festival";
import { mockFestivals } from "../data/festivals";

const DEFAULT_PAGE_NO = 1;
const DEFAULT_NUM_OF_ROWS = 8;

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
  const requestUrl = new URL(request.url);

  return {
    pageNo: parsePositiveInteger(requestUrl.searchParams.get("pageNo"), DEFAULT_PAGE_NO),
    numOfRows: parsePositiveInteger(
      requestUrl.searchParams.get("numOfRows"),
      DEFAULT_NUM_OF_ROWS,
    ),
    eventStartDate: normalizeDate(requestUrl.searchParams.get("eventStartDate")),
    eventEndDate: normalizeDate(requestUrl.searchParams.get("eventEndDate")),
    areaCode: requestUrl.searchParams.get("areaCode")?.trim() || undefined,
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

function isFestivalListProxyRequest(request: Request) {
  const requestUrl = new URL(request.url);
  const targetUrl = requestUrl.searchParams.get("url");

  if (!targetUrl) return false;

  try {
    return new URL(targetUrl, requestUrl.origin).pathname.endsWith("/festivals/list");
  } catch {
    return targetUrl.includes("/festivals/list");
  }
}

export const festivalHandlers = [
  http.get("*/festivals/list", ({ request }) => createFestivalListResponse(request)),
  http.get("*/api/proxy", ({ request }) => {
    if (!isFestivalListProxyRequest(request)) {
      return passthrough();
    }

    return createFestivalListResponse(request);
  }),
];
