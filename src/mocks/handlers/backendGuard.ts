import { http, HttpResponse, passthrough } from "msw";
import { isOwnBackendRequest } from "../isOwnBackendRequest";

const UNHANDLED_BACKEND_MESSAGE =
  "Demo API handler가 없는 Backend 요청은 차단되었습니다.";

/**
 * Existing domain handlers run first. This final catch-all prevents an app
 * Backend request that missed a handler from reaching the terminated server,
 * while allowing external images and static resources to load normally.
 */
export const backendGuardHandler = http.all("*", ({ request }) => {
  if (!isOwnBackendRequest(request)) return passthrough();

  console.error(
    `[MSW] Blocked unhandled Demo Backend request: ${request.method} ${request.url}`,
  );

  return HttpResponse.json(
    {
      status: 501,
      message: UNHANDLED_BACKEND_MESSAGE,
      data: null,
    },
    { status: 501 },
  );
});
