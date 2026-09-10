import { http, HttpResponse, passthrough } from "msw";
import type { FestivalListResponse } from "../../types/festival";
import { mockFestivals } from "../data/festivals";

const DEFAULT_PAGE_NO = 1;
const DEFAULT_NUM_OF_ROWS = 8;

function parsePositiveInteger(value: string | null, fallback: number) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function getPagination(request: Request) {
  const requestUrl = new URL(request.url);

  return {
    pageNo: parsePositiveInteger(requestUrl.searchParams.get("pageNo"), DEFAULT_PAGE_NO),
    numOfRows: parsePositiveInteger(
      requestUrl.searchParams.get("numOfRows"),
      DEFAULT_NUM_OF_ROWS,
    ),
  };
}

function createFestivalListResponse(request: Request) {
  const { pageNo, numOfRows } = getPagination(request);
  const startIndex = (pageNo - 1) * numOfRows;
  const item = mockFestivals.slice(startIndex, startIndex + numOfRows);

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
          totalCount: mockFestivals.length,
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
