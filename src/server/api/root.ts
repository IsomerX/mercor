import { livekitRouter } from "~/server/api/routers/livekit";
import { createTRPCRouter } from "~/server/api/trpc";
import { messagelivekitRouter } from './routers/messagelivekitRouter';
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  livekit: livekitRouter,
  messagelivekit: messagelivekitRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
