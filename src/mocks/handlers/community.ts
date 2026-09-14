import { http, HttpResponse } from "msw";
import type {
  BaseResponse,
  Comment,
  PostDetail,
} from "../../apis/post";
import type { Post, PostsPaginatedResponse } from "../../apis/posts";
import {
  DEMO_USER,
} from "../data/communityPosts";
import {
  deleteStoredCommunityPost,
  readCommunityLikedPostIds,
  readCommunityPosts,
  toggleStoredCommunityPostLike,
  writeCommunityPosts,
} from "../storage/communityPosts";

const DEFAULT_PAGE = 0;
const DEFAULT_SIZE = 6;
const MAX_PERSISTED_IMAGE_BYTES = 160_000;
let imageIdentityCounter = 0;

function getRequestTargetUrl(request: Request) {
  const requestUrl = new URL(request.url);
  const targetUrl = requestUrl.searchParams.get("url");

  if (!targetUrl) return requestUrl;

  try {
    return new URL(targetUrl, requestUrl.origin);
  } catch {
    return requestUrl;
  }
}

function getRequestPath(request: Request) {
  return getRequestTargetUrl(request).pathname.replace(/\/+$/, "") || "/";
}

function getRequestSearchParams(request: Request) {
  const requestUrl = new URL(request.url);
  const targetUrl = requestUrl.searchParams.get("url");
  const params = new URLSearchParams();

  if (targetUrl) {
    try {
      const target = new URL(targetUrl, requestUrl.origin);
      target.searchParams.forEach((value, key) => params.set(key, value));
    } catch {
      // Outer proxy parameters below are still available for malformed targets.
    }
  } else {
    requestUrl.searchParams.forEach((value, key) => params.set(key, value));
  }

  requestUrl.searchParams.forEach((value, key) => {
    if (key !== "url") params.set(key, value);
  });

  return params;
}

function parseNonNegativeInteger(value: string | null, fallback: number) {
  if (value === null || value.trim() === "") return fallback;

  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : fallback;
}

function getPostIdFromPath(request: Request) {
  const match = getRequestPath(request).match(/\/posts\/([^/]+)$/);
  if (!match?.[1]) return undefined;

  try {
    const postId = Number(decodeURIComponent(match[1]));
    return Number.isInteger(postId) && postId > 0 ? postId : undefined;
  } catch {
    return undefined;
  }
}

function getCommentPostId(request: Request) {
  const match = getRequestPath(request).match(/\/posts\/([^/]+)\/comments$/);
  if (!match?.[1]) return undefined;

  try {
    const postId = Number(decodeURIComponent(match[1]));
    return Number.isInteger(postId) && postId > 0 ? postId : undefined;
  } catch {
    return undefined;
  }
}

function getPostLikeId(request: Request) {
  const match = getRequestPath(request).match(/\/postLikes\/([^/]+)\/like$/);
  if (!match?.[1]) return undefined;

  try {
    const postId = Number(decodeURIComponent(match[1]));
    return Number.isInteger(postId) && postId > 0 ? postId : undefined;
  } catch {
    return undefined;
  }
}

function isPostsCollectionPath(path: string) {
  return path.endsWith("/posts");
}

function isPostDetailPath(path: string) {
  return /\/posts\/[^/]+$/.test(path);
}

function isCommentPath(path: string) {
  return /\/posts\/[^/]+\/comments$/.test(path);
}

function isPostLikePath(path: string) {
  return /\/postLikes\/[^/]+\/like$/.test(path);
}

function isMyPostLikesPath(path: string) {
  return path.endsWith("/postLikes/myLikes");
}

function toPostSummary(post: PostDetail): Post {
  return {
    postId: post.postId,
    likes: post.likes,
    title: post.title,
    thumbnailUrl: post.thumbnailUrl,
    writer: post.writer,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };
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

function createSuccessResponse<T>(data: T, message = "OK") {
  return HttpResponse.json({
    status: 200,
    message,
    data,
  });
}

function createPostsListResponse(request: Request) {
  const searchParams = getRequestSearchParams(request);
  const page = parseNonNegativeInteger(
    searchParams.get("page"),
    DEFAULT_PAGE,
  );
  const size = Math.max(
    1,
    parseNonNegativeInteger(searchParams.get("size"), DEFAULT_SIZE),
  );
  const posts = readCommunityPosts()
    .sort((a, b) => b.postId - a.postId)
    .map(toPostSummary);
  const totalElements = posts.length;
  const totalPages = totalElements === 0 ? 0 : Math.ceil(totalElements / size);
  const content = posts.slice(page * size, (page + 1) * size);

  const response: PostsPaginatedResponse = {
    status: 200,
    message: "OK",
    data: {
      content,
      totalPages,
      totalElements,
      last: totalPages === 0 || page >= totalPages - 1,
      number: page,
      size,
      first: page === 0,
      empty: content.length === 0,
    },
  };

  return HttpResponse.json(response);
}

function createPostDetailResponse(request: Request) {
  const postId = getPostIdFromPath(request);
  if (!postId) return createErrorResponse(400, "게시물 ID가 올바르지 않습니다.");

  const post = readCommunityPosts().find(
    (candidate) => candidate.postId === postId,
  );
  if (!post) return createErrorResponse(404, "게시물을 찾을 수 없습니다.");

  return createSuccessResponse(post);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

async function readMultipartData(request: Request) {
  try {
    return await request.formData();
  } catch {
    return null;
  }
}

async function readJsonPart(formData: FormData) {
  const field = formData.get("data");
  if (field === null) return undefined;

  try {
    const text = typeof field === "string" ? field : await field.text();
    return JSON.parse(text) as unknown;
  } catch {
    return undefined;
  }
}

function parseRequiredPostData(value: unknown) {
  if (!isRecord(value)) return null;
  if (typeof value.title !== "string" || typeof value.content !== "string") {
    return null;
  }

  const title = value.title.trim();
  const content = value.content.trim();
  if (!title || !content) return null;

  return { title, content };
}

function parseUpdatePostData(value: unknown) {
  if (!isRecord(value)) return null;

  const hasTitle = Object.prototype.hasOwnProperty.call(value, "title");
  const hasContent = Object.prototype.hasOwnProperty.call(value, "content");
  if (hasTitle && typeof value.title !== "string") return null;
  if (hasContent && typeof value.content !== "string") return null;

  const title = hasTitle ? String(value.title).trim() : undefined;
  const content = hasContent ? String(value.content).trim() : undefined;
  if (title === "" || content === "") return null;

  let removedImageUrls: string[] = [];
  if (value.removedImageUrls !== undefined) {
    if (
      !Array.isArray(value.removedImageUrls) ||
      !value.removedImageUrls.every((url) => typeof url === "string")
    ) {
      return null;
    }
    removedImageUrls = value.removedImageUrls;
  }

  return { title, content, removedImageUrls };
}

function getImageEntries(formData: FormData) {
  return formData
    .getAll("images")
    .filter(
      (entry): entry is File =>
        typeof entry !== "string" &&
        typeof entry.arrayBuffer === "function",
    );
}

function createUniqueImageIdentity() {
  const browserCrypto = globalThis.crypto;
  if (typeof browserCrypto?.randomUUID === "function") {
    return browserCrypto.randomUUID();
  }

  imageIdentityCounter += 1;
  return `${Date.now().toString(36)}-${imageIdentityCounter.toString(36)}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

function createUploadPlaceholder(postId: number) {
  return (
    "https://picsum.photos/seed/community-upload-" +
    postId +
    "-" +
    createUniqueImageIdentity() +
    "/900/600"
  );
}

async function convertSmallImageToDataUrl(file: File) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return "data:" + (file.type || "image/jpeg") + ";base64," + btoa(binary);
}

async function persistImageEntry(entry: File): Promise<string | undefined> {
  if (
    entry.size === 0 ||
    entry.size > MAX_PERSISTED_IMAGE_BYTES ||
    !entry.type.startsWith("image/")
  ) {
    return undefined;
  }

  try {
    const dataUrl = await convertSmallImageToDataUrl(entry);
    return `${dataUrl}#community-image-${createUniqueImageIdentity()}`;
  } catch {
    return undefined;
  }
}

async function getUploadedImageDataUrls(formData: FormData) {
  const entries = getImageEntries(formData);
  return Promise.all(entries.map((entry) => persistImageEntry(entry)));
}

function resolveUploadedImageUrls(
  dataUrls: Array<string | undefined>,
  postId: number,
) {
  return dataUrls.map((dataUrl) => dataUrl ?? createUploadPlaceholder(postId));
}

async function createPostResponse(request: Request) {
  const formData = await readMultipartData(request);
  if (!formData) {
    return createErrorResponse(400, "게시물 요청 형식이 올바르지 않습니다.");
  }

  const data = parseRequiredPostData(await readJsonPart(formData));
  const imageEntries = getImageEntries(formData);
  if (!data || imageEntries.length === 0) {
    return createErrorResponse(
      400,
      "제목, 내용을 입력하고 이미지를 하나 이상 첨부해 주세요.",
    );
  }

  const imageDataUrls = await getUploadedImageDataUrls(formData);
  const posts = readCommunityPosts();
  const nextPostId =
    Math.max(0, ...posts.map((post) => post.postId)) + 1;
  const imageUrls = resolveUploadedImageUrls(imageDataUrls, nextPostId);
  const images = imageUrls.map((imageUrl) => ({ imageUrl }));
  const now = new Date().toISOString();
  const newPost: PostDetail = {
    postId: nextPostId,
    likes: 0,
    title: data.title,
    content: data.content,
    thumbnailUrl: images[0].imageUrl,
    images,
    comments: [],
    writer: DEMO_USER,
    createdAt: now,
    updatedAt: now,
  };

  if (!writeCommunityPosts([...posts, newPost])) {
    return createErrorResponse(500, "게시물 저장에 실패했습니다.");
  }

  return createSuccessResponse(
    { postId: newPost.postId },
    "게시물이 등록되었습니다.",
  );
}

async function updatePostResponse(request: Request) {
  const postId = getPostIdFromPath(request);
  if (!postId) return createErrorResponse(400, "게시물 ID가 올바르지 않습니다.");

  const formData = await readMultipartData(request);
  if (!formData) {
    return createErrorResponse(400, "게시물 요청 형식이 올바르지 않습니다.");
  }

  const data = parseUpdatePostData(await readJsonPart(formData));
  if (!data) return createErrorResponse(400, "수정 데이터가 올바르지 않습니다.");

  const imageDataUrls = await getUploadedImageDataUrls(formData);
  const posts = readCommunityPosts();
  const post = posts.find((candidate) => candidate.postId === postId);
  if (!post) return createErrorResponse(404, "게시물을 찾을 수 없습니다.");

  const removedImageUrls = new Set(data.removedImageUrls);
  const retainedImages = post.images.filter(
    (image) => !removedImageUrls.has(image.imageUrl),
  );
  const newImageUrls = resolveUploadedImageUrls(imageDataUrls, postId);
  const images = [
    ...retainedImages,
    ...newImageUrls.map((imageUrl) => ({ imageUrl })),
  ];
  if (images.length === 0) {
    return createErrorResponse(400, "이미지를 하나 이상 등록해 주세요.");
  }

  const nextPost: PostDetail = {
    ...post,
    title: data.title ?? post.title,
    content: data.content ?? post.content,
    thumbnailUrl: images[0]?.imageUrl ?? "",
    images,
    updatedAt: new Date().toISOString(),
  };
  const nextPosts = posts.map((candidate) =>
    candidate.postId === postId ? nextPost : candidate,
  );

  if (!writeCommunityPosts(nextPosts)) {
    return createErrorResponse(500, "게시물 저장에 실패했습니다.");
  }

  return createSuccessResponse(
    { postId },
    "게시물이 수정되었습니다.",
  );
}

function deletePostResponse(request: Request) {
  const postId = getPostIdFromPath(request);
  if (!postId) return createErrorResponse(400, "게시물 ID가 올바르지 않습니다.");

  const result = deleteStoredCommunityPost(postId);
  if (!result.success) {
    return createErrorResponse(
      result.reason === "not-found" ? 404 : 500,
      result.reason === "not-found"
        ? "게시물을 찾을 수 없습니다."
        : "게시물 삭제에 실패했습니다.",
    );
  }

  return createSuccessResponse(null, "게시물이 삭제되었습니다.");
}

async function createCommentResponse(request: Request) {
  const postId = getCommentPostId(request);
  if (!postId) return createErrorResponse(400, "게시물 ID가 올바르지 않습니다.");

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return createErrorResponse(400, "댓글 요청 형식이 올바르지 않습니다.");
  }

  if (!isRecord(body)) {
    return createErrorResponse(400, "댓글 요청 형식이 올바르지 않습니다.");
  }

  const bodyPostId = Number(body.postId);
  const content = typeof body.content === "string" ? body.content.trim() : "";
  if (
    !Number.isInteger(bodyPostId) ||
    bodyPostId !== postId ||
    !content
  ) {
    return createErrorResponse(400, "댓글 내용을 확인해 주세요.");
  }

  const posts = readCommunityPosts();
  const post = posts.find((candidate) => candidate.postId === postId);
  if (!post) return createErrorResponse(404, "게시물을 찾을 수 없습니다.");

  const nextCommentId =
    Math.max(
      0,
      ...posts.flatMap((candidate) =>
        candidate.comments.map((comment) => comment.commentId),
      ),
    ) + 1;
  const now = new Date().toISOString();
  const comment: Comment = {
    commentId: nextCommentId,
    content,
    writerId: DEMO_USER.id,
    writerName: DEMO_USER.name,
    writerProfileImageUrl: DEMO_USER.profileImage,
    createdAt: now,
    updatedAt: now,
  };
  const nextPost: PostDetail = {
    ...post,
    comments: [...post.comments, comment],
    updatedAt: now,
  };
  const nextPosts = posts.map((candidate) =>
    candidate.postId === postId ? nextPost : candidate,
  );

  if (!writeCommunityPosts(nextPosts)) {
    return createErrorResponse(500, "댓글 저장에 실패했습니다.");
  }

  const response: BaseResponse = {
    status: 200,
    message: "댓글이 등록되었습니다.",
    data: comment,
  };
  return HttpResponse.json(response);
}

function togglePostLikeResponse(request: Request) {
  const postId = getPostLikeId(request);
  if (!postId) return createErrorResponse(400, "게시물 ID가 올바르지 않습니다.");

  const result = toggleStoredCommunityPostLike(postId);
  if (!result.success) {
    return createErrorResponse(
      result.reason === "not-found" ? 404 : 500,
      result.reason === "not-found"
        ? "게시물을 찾을 수 없습니다."
        : "좋아요 저장에 실패했습니다.",
    );
  }

  return HttpResponse.json({
    message: result.liked ? "좋아요 완료" : "좋아요 취소",
  });
}

function getMyLikedPostsResponse() {
  const postIds = new Set(readCommunityPosts().map((post) => post.postId));
  return HttpResponse.json(
    readCommunityLikedPostIds()
      .filter((postId) => postIds.has(postId))
      .map((postId) => ({ postId })),
  );
}

function createCommunityProxyGetResponse(request: Request) {
  const path = getRequestPath(request);
  if (isPostDetailPath(path)) return createPostDetailResponse(request);
  if (isPostsCollectionPath(path)) return createPostsListResponse(request);
  if (isMyPostLikesPath(path)) return getMyLikedPostsResponse();
  return;
}

function createCommunityProxyPostResponse(request: Request) {
  const path = getRequestPath(request);
  if (isCommentPath(path)) return createCommentResponse(request);
  if (isPostsCollectionPath(path)) return createPostResponse(request);
  if (isPostLikePath(path)) return togglePostLikeResponse(request);
  return;
}

function createCommunityProxyPatchResponse(request: Request) {
  return isPostDetailPath(getRequestPath(request))
    ? updatePostResponse(request)
    : undefined;
}

function createCommunityProxyDeleteResponse(request: Request) {
  return isPostDetailPath(getRequestPath(request))
    ? deletePostResponse(request)
    : undefined;
}

export const communityHandlers = [
  http.get("*/posts", ({ request }) => createPostsListResponse(request)),
  http.get("*/posts/:postId", ({ request }) =>
    createPostDetailResponse(request),
  ),
  http.post("*/posts", ({ request }) => createPostResponse(request)),
  http.patch("*/posts/:postId", ({ request }) =>
    updatePostResponse(request),
  ),
  http.delete("*/posts/:postId", ({ request }) =>
    deletePostResponse(request),
  ),
  http.post("*/posts/:postId/comments", ({ request }) =>
    createCommentResponse(request),
  ),
  http.post("*/postLikes/:postId/like", ({ request }) =>
    togglePostLikeResponse(request),
  ),
  http.get("*/postLikes/myLikes", () => getMyLikedPostsResponse()),
  http.get("*/api/proxy", ({ request }) =>
    createCommunityProxyGetResponse(request),
  ),
  http.post("*/api/proxy", ({ request }) =>
    createCommunityProxyPostResponse(request),
  ),
  http.patch("*/api/proxy", ({ request }) =>
    createCommunityProxyPatchResponse(request),
  ),
  http.delete("*/api/proxy", ({ request }) =>
    createCommunityProxyDeleteResponse(request),
  ),
];
