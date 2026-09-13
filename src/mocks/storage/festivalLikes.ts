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

export function writeFestivalLikes(likes: FestivalLike[]) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      FESTIVAL_LIKES_STORAGE_KEY,
      JSON.stringify(likes),
    );
  } catch {
    // Demo storage failures should not crash the application.
  }
}

export function toggleStoredFestivalLike(like: FestivalLike) {
  const likes = readFestivalLikes();
  const existingIndex = likes.findIndex(
    (savedLike) => savedLike.contentId === like.contentId,
  );

  if (existingIndex >= 0) {
    likes.splice(existingIndex, 1);
    writeFestivalLikes(likes);
    return { liked: false };
  }

  writeFestivalLikes([...likes, like]);
  return { liked: true };
}
