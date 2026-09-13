import { festivalHandlers } from "./festival";
import { userHandlers } from "./user";

export const handlers = [...userHandlers, ...festivalHandlers];
