import { http, HttpResponse } from "msw";
import type {
  UserProfileResponse,
  UserResponse,
} from "../../apis/users";
import { DEMO_USER_ID } from "../data/communityPosts";
import { readCommunityPosts } from "../storage/communityPosts";
import {
  readDemoUserProfile,
  writeDemoUserProfile,
} from "../storage/demoUser";

const MAX_PERSISTED_PROFILE_IMAGE_BYTES = 160_000;
let profileImageIdentityCounter = 0;

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

function isProfileImageProxyRequest(request: Request) {
  return (
    getProxyTargetPath(request)?.endsWith("/users/profile-image") ?? false
  );
}

function createDemoUserProfileResponse() {
  const profile = readDemoUserProfile();
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
      ...profile,
      postCount: posts.length,
      posts,
    },
  };

  return HttpResponse.json(response);
}

function createUserResponse(profile: ReturnType<typeof readDemoUserProfile>, message: string) {
  const response: UserResponse = {
    status: 200,
    message,
    data: {
      name: profile.name,
      profileImageUrl: profile.profileImageUrl,
    },
  };

  return HttpResponse.json(response);
}

function createErrorResponse(status: number, message: string) {
  return HttpResponse.json(
    {
      status,
      message,
      data: null,
    },
    { status },
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

async function readJsonBody(request: Request) {
  try {
    return (await request.json()) as unknown;
  } catch {
    return undefined;
  }
}

function createUniqueProfileImageIdentity() {
  const browserCrypto = globalThis.crypto;
  if (typeof browserCrypto?.randomUUID === "function") {
    return browserCrypto.randomUUID();
  }

  profileImageIdentityCounter += 1;
  return `${Date.now().toString(36)}-${profileImageIdentityCounter.toString(36)}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

function createProfileImagePlaceholder() {
  return (
    "https://picsum.photos/seed/demo-profile-" +
    createUniqueProfileImageIdentity() +
    "/400/400"
  );
}

async function convertSmallProfileImageToDataUrl(file: File) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return (
    `data:${file.type || "image/jpeg"};base64,${btoa(binary)}` +
    `#demo-profile-image-${createUniqueProfileImageIdentity()}`
  );
}

async function persistProfileImage(file: File) {
  if (file.size <= MAX_PERSISTED_PROFILE_IMAGE_BYTES) {
    try {
      return await convertSmallProfileImageToDataUrl(file);
    } catch {
      return createProfileImagePlaceholder();
    }
  }

  return createProfileImagePlaceholder();
}

function isImageFile(value: FormDataEntryValue | null): value is File {
  return (
    value !== null &&
    typeof value !== "string" &&
    typeof value.arrayBuffer === "function" &&
    typeof value.type === "string" &&
    value.type.startsWith("image/") &&
    typeof value.size === "number" &&
    value.size > 0
  );
}

async function updateUserResponse(request: Request) {
  const body = await readJsonBody(request);
  if (!isRecord(body) || typeof body.name !== "string") {
    return createErrorResponse(400, "이름을 입력해 주세요.");
  }

  const name = body.name.trim();
  if (!name) return createErrorResponse(400, "이름을 입력해 주세요.");

  const profile = readDemoUserProfile();
  const nextProfile = { ...profile, name };
  if (!writeDemoUserProfile(nextProfile)) {
    return createErrorResponse(500, "사용자 정보 저장에 실패했습니다.");
  }

  return createUserResponse(nextProfile, "이름 변경에 성공했습니다.");
}

async function updateProfileImageResponse(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return createErrorResponse(400, "이미지 파일을 확인해 주세요.");
  }

  const image = formData.get("image");
  if (!isImageFile(image)) {
    return createErrorResponse(400, "이미지 파일을 확인해 주세요.");
  }

  const profileImageUrl = await persistProfileImage(image);
  const profile = readDemoUserProfile();
  const nextProfile = { ...profile, profileImageUrl };
  if (!writeDemoUserProfile(nextProfile)) {
    return createErrorResponse(500, "프로필 이미지 저장에 실패했습니다.");
  }

  return HttpResponse.json({
    status: 200,
    message: "프로필 이미지 변경에 성공했습니다.",
  });
}

export const userHandlers = [
  http.get("*/users", () => createDemoUserProfileResponse()),
  http.patch("*/users", async ({ request }) => updateUserResponse(request)),
  http.post("*/users/profile-image", async ({ request }) =>
    updateProfileImageResponse(request),
  ),
  http.get("*/api/proxy", ({ request }) => {
    if (!isUserProxyRequest(request)) return;

    return createDemoUserProfileResponse();
  }),
  http.patch("*/api/proxy", async ({ request }) => {
    if (!isUserProxyRequest(request)) return;

    return updateUserResponse(request);
  }),
  http.post("*/api/proxy", async ({ request }) => {
    if (!isProfileImageProxyRequest(request)) return;

    return updateProfileImageResponse(request);
  }),
];
