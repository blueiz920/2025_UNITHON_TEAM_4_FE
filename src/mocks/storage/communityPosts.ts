import type {
  Comment,
  Image as PostImage,
  PostDetail,
  Writer,
} from "../../apis/post";
import { mockCommunityPosts } from "../data/communityPosts";

export const COMMUNITY_POSTS_STORAGE_KEY =
  "k-festival:demo:community-posts:v1";
export const COMMUNITY_LIKED_POSTS_STORAGE_KEY =
  "k-festival:demo:community-liked-posts:v1";

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function isWriter(value: unknown): value is Writer {
  if (!isRecord(value)) return false;

  return (
    Number.isInteger(value.id) &&
    Number(value.id) > 0 &&
    typeof value.name === "string" &&
    typeof value.profileImage === "string"
  );
}

function isPostImage(value: unknown): value is PostImage {
  return isRecord(value) && typeof value.imageUrl === "string";
}

function isComment(value: unknown): value is Comment {
  if (!isRecord(value)) return false;

  return (
    Number.isInteger(value.commentId) &&
    Number(value.commentId) > 0 &&
    typeof value.content === "string" &&
    Number.isInteger(value.writerId) &&
    Number(value.writerId) > 0 &&
    typeof value.writerName === "string" &&
    typeof value.writerProfileImageUrl === "string" &&
    typeof value.createdAt === "string" &&
    typeof value.updatedAt === "string"
  );
}

function isPostDetail(value: unknown): value is PostDetail {
  if (!isRecord(value)) return false;

  return (
    Number.isInteger(value.postId) &&
    Number(value.postId) > 0 &&
    Number.isInteger(value.likes) &&
    Number(value.likes) >= 0 &&
    typeof value.title === "string" &&
    typeof value.content === "string" &&
    typeof value.thumbnailUrl === "string" &&
    Array.isArray(value.images) &&
    value.images.every(isPostImage) &&
    Array.isArray(value.comments) &&
    value.comments.every(isComment) &&
    isWriter(value.writer) &&
    typeof value.createdAt === "string" &&
    typeof value.updatedAt === "string"
  );
}

function dedupePosts(posts: PostDetail[]) {
  return Array.from(new Map(posts.map((post) => [post.postId, post])).values());
}

function writeJson(key: string, value: unknown) {
  const storage = getStorage();
  if (!storage) return false;

  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function readCommunityPosts(): PostDetail[] {
  const storage = getStorage();
  if (!storage) return clone(mockCommunityPosts);

  let raw: string | null;
  try {
    raw = storage.getItem(COMMUNITY_POSTS_STORAGE_KEY);
  } catch {
    return clone(mockCommunityPosts);
  }

  if (raw === null) return clone(mockCommunityPosts);

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return clone(mockCommunityPosts);

    const validPosts = parsed.filter(isPostDetail);
    if (parsed.length > 0 && validPosts.length === 0) {
      return clone(mockCommunityPosts);
    }

    return clone(dedupePosts(validPosts));
  } catch {
    return clone(mockCommunityPosts);
  }
}

export function writeCommunityPosts(posts: PostDetail[]) {
  return writeJson(COMMUNITY_POSTS_STORAGE_KEY, dedupePosts(posts));
}

export function readCommunityLikedPostIds(): number[] {
  const storage = getStorage();
  if (!storage) return [];

  let raw: string | null;
  try {
    raw = storage.getItem(COMMUNITY_LIKED_POSTS_STORAGE_KEY);
  } catch {
    return [];
  }

  if (raw === null) return [];

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const ids = new Set<number>();
    parsed.forEach((value) => {
      if (Number.isInteger(value) && Number(value) > 0) {
        ids.add(Number(value));
      }
    });
    return Array.from(ids);
  } catch {
    return [];
  }
}

export function writeCommunityLikedPostIds(postIds: number[]) {
  const uniquePostIds = Array.from(
    new Set(postIds.filter((postId) => Number.isInteger(postId) && postId > 0)),
  );
  return writeJson(COMMUNITY_LIKED_POSTS_STORAGE_KEY, uniquePostIds);
}

export type CommunityLikeToggleResult =
  | { success: true; liked: boolean }
  | { success: false; reason: "not-found" | "storage" };

export function toggleStoredCommunityPostLike(
  postId: number,
): CommunityLikeToggleResult {
  const posts = readCommunityPosts();
  const post = posts.find((candidate) => candidate.postId === postId);
  if (!post) return { success: false, reason: "not-found" };

  const likedPostIds = readCommunityLikedPostIds();
  const existingIndex = likedPostIds.indexOf(postId);
  const liked = existingIndex < 0;
  const nextLikedPostIds = liked
    ? [...likedPostIds, postId]
    : likedPostIds.filter((likedPostId) => likedPostId !== postId);
  const nextPosts = posts.map((candidate) =>
    candidate.postId === postId
      ? {
          ...candidate,
          likes: Math.max(0, candidate.likes + (liked ? 1 : -1)),
        }
      : candidate,
  );

  if (!writeCommunityPosts(nextPosts)) {
    return { success: false, reason: "storage" };
  }

  if (!writeCommunityLikedPostIds(nextLikedPostIds)) {
    // Keep the two representations aligned when the second write fails.
    writeCommunityPosts(posts);
    return { success: false, reason: "storage" };
  }

  return { success: true, liked };
}

export type CommunityDeleteResult =
  | { success: true }
  | { success: false; reason: "not-found" | "storage" };

export function deleteStoredCommunityPost(
  postId: number,
): CommunityDeleteResult {
  const posts = readCommunityPosts();
  if (!posts.some((post) => post.postId === postId)) {
    return { success: false, reason: "not-found" };
  }

  const likedPostIds = readCommunityLikedPostIds();
  const nextPosts = posts.filter((post) => post.postId !== postId);
  const nextLikedPostIds = likedPostIds.filter(
    (likedPostId) => likedPostId !== postId,
  );

  if (!writeCommunityPosts(nextPosts)) {
    return { success: false, reason: "storage" };
  }

  if (
    nextLikedPostIds.length !== likedPostIds.length &&
    !writeCommunityLikedPostIds(nextLikedPostIds)
  ) {
    writeCommunityPosts(posts);
    return { success: false, reason: "storage" };
  }

  return { success: true };
}
