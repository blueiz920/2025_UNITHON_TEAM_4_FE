import { communityHandlers } from "./community";
import { festivalHandlers } from "./festival";
import { userHandlers } from "./user";
import { backendGuardHandler } from "./backendGuard";

export const handlers = [
  ...communityHandlers,
  ...userHandlers,
  ...festivalHandlers,
  backendGuardHandler,
];
