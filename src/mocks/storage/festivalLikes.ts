import type { FestivalLike } from "../../types/festival";

export const FESTIVAL_LIKES_STORAGE_KEY = "k-festival:demo:liked-festivals:v1";

function isFestivalLike(value: unknown): value is FestivalLike {
  if (!value || typeof value !== "object") return false;

  const like = value as Record<string, unknown>;
  return (
    typeof like.contentId === "string" &&
    typeof like.title === "string" &&
    typeof like.imageUrl === "string" &&
    typeof like.address === "string"
  );
}

export function readFestivalLikes(): FestivalLike[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(FESTIVAL_LIKES_STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return Array.from(
      new Map(
        parsed
          .filter(isFestivalLike)
          .map((like) => [like.contentId, like]),
      ).values(),
    );
  } catch {
    return [];
  }
}

export function writeFestivalLikes(likes: FestivalLike[]): boolean {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(
      FESTIVAL_LIKES_STORAGE_KEY,
      JSON.stringify(likes),
    );
    return true;
  } catch {
    // Demo storage failures should not crash the application.
    return false;
  }
}

type FestivalLikeToggleResult =
  | { success: true; liked: boolean }
  | { success: false };

export function toggleStoredFestivalLike(
  like: FestivalLike,
): FestivalLikeToggleResult {
  const likes = readFestivalLikes();
  const existingIndex = likes.findIndex(
    (savedLike) => savedLike.contentId === like.contentId,
  );
  const nextLikes =
    existingIndex >= 0
      ? likes.filter((savedLike) => savedLike.contentId !== like.contentId)
      : [...likes, like];

  if (!writeFestivalLikes(nextLikes)) {
    return { success: false };
  }

  return { success: true, liked: existingIndex < 0 };
}
