import { userRouter } from "~/server/api/routers/user";
import { eventRouter } from "~/server/api/routers/event";
import { createTRPCRouter } from "~/server/api/trpc";
import { messagelivekitRouter } from './routers/messagelivekitRouter';

export const appRouter = createTRPCRouter({
  event: eventRouter,
  user: userRouter,
  messagelivekit: messagelivekitRouter
});

export type AppRouter = typeof appRouter;
