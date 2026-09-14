import {
  DEMO_USER_PROFILE,
  type DemoUserProfile,
} from "../data/demoUser";

export const DEMO_USER_PROFILE_STORAGE_KEY =
  "k-festival:demo:user-profile:v1";

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
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isValidProfileImageUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  if (value === "") return true;

  return (
    value.startsWith("data:image/") ||
    /^https?:\/\//i.test(value) ||
    value.startsWith("/")
  );
}

function isDemoUserProfile(value: unknown): value is DemoUserProfile {
  if (!isRecord(value)) return false;

  return (
    typeof value.name === "string" &&
    value.name.trim().length > 0 &&
    isValidProfileImageUrl(value.profileImageUrl) &&
    typeof value.email === "string" &&
    value.email.trim().length > 0 &&
    typeof value.createdAt === "string" &&
    value.createdAt.trim().length > 0
  );
}

export function readDemoUserProfile(): DemoUserProfile {
  const storage = getStorage();
  if (!storage) return clone(DEMO_USER_PROFILE);

  let raw: string | null;
  try {
    raw = storage.getItem(DEMO_USER_PROFILE_STORAGE_KEY);
  } catch {
    return clone(DEMO_USER_PROFILE);
  }

  if (raw === null) return clone(DEMO_USER_PROFILE);

  try {
    const parsed: unknown = JSON.parse(raw);
    return isDemoUserProfile(parsed)
      ? clone(parsed)
      : clone(DEMO_USER_PROFILE);
  } catch {
    return clone(DEMO_USER_PROFILE);
  }
}

export function writeDemoUserProfile(profile: DemoUserProfile): boolean {
  const storage = getStorage();
  if (!storage) return false;

  try {
    storage.setItem(
      DEMO_USER_PROFILE_STORAGE_KEY,
      JSON.stringify(profile),
    );
    return true;
  } catch {
    return false;
  }
}
