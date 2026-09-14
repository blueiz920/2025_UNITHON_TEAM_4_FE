export interface DemoUserProfile {
  name: string;
  profileImageUrl: string;
  email: string;
  createdAt: string;
}

export const DEMO_USER_PROFILE: DemoUserProfile = {
  name: "Demo User",
  profileImageUrl: "",
  email: "demo@k-festival.local",
  createdAt: "2026-01-01T00:00:00",
};
