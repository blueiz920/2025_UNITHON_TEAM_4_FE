import { http, HttpResponse } from "msw";
import type { UserProfileResponse } from "../../apis/users";

const demoUserProfileResponse: UserProfileResponse = {
  status: 200,
  message: "OK",
  data: {
    name: "Demo User",
    profileImageUrl: "",
    email: "demo@k-festival.local",
    createdAt: "2026-01-01T00:00:00",
    postCount: 0,
    posts: [],
  },
};

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

function isUserProxyRequest(request: Request) {
  return getProxyTargetPath(request)?.endsWith("/users") ?? false;
}

function createDemoUserProfileResponse() {
  return HttpResponse.json(demoUserProfileResponse);
}

export const userHandlers = [
  http.get("*/users", () => createDemoUserProfileResponse()),
  http.get("*/api/proxy", ({ request }) => {
    if (!isUserProxyRequest(request)) return;

    return createDemoUserProfileResponse();
  }),
];
