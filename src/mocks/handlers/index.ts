import { communityHandlers } from "./community";
import { festivalHandlers } from "./festival";
import { userHandlers } from "./user";

export const handlers = [
  ...communityHandlers,
  ...userHandlers,
  ...festivalHandlers,
];
