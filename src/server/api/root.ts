import { livekitRouter } from "~/server/api/routers/livekit";
import { userRouter } from "~/server/api/routers/user";
import { eventRouter } from "~/server/api/routers/event";
import { createTRPCRouter } from "~/server/api/trpc";
import { messagelivekitRouter } from './routers/messagelivekitRouter';
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  livekit: livekitRouter
  event: eventRouter,
  user: userRouter
  messagelivekit: messagelivekitRou
});

// export type definition of API
export type AppRouter = typeof appRouter;
