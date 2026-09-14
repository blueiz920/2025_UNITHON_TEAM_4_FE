import { http, HttpResponse } from "msw";
import type { UserProfileResponse } from "../../apis/users";
import { DEMO_USER_ID } from "../data/communityPosts";
import { readCommunityPosts } from "../storage/communityPosts";

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
  const posts = readCommunityPosts()
    .filter((post) => post.writer.id === DEMO_USER_ID)
    .sort((a, b) => b.postId - a.postId)
    .map((post) => ({
      postId: post.postId,
      thumbnailUrl: post.thumbnailUrl,
      title: post.title,
      updatedAt: post.updatedAt,
    }));
  const response: UserProfileResponse = {
    status: 200,
    message: "OK",
    data: {
      name: "Demo User",
      profileImageUrl: "",
      email: "demo@k-festival.local",
      createdAt: "2026-01-01T00:00:00",
      postCount: posts.length,
      posts,
    },
  };

  return HttpResponse.json(response);
}

export const userHandlers = [
  http.get("*/users", () => createDemoUserProfileResponse()),
  http.get("*/api/proxy", ({ request }) => {
    if (!isUserProxyRequest(request)) return;

    return createDemoUserProfileResponse();
  }),
];
