import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const userRouter
  = createTRPCRouter({
    getEnrolledEvents: protectedProcedure.query(async ({ ctx }) => {
      const events = await ctx.prisma.eventEnrollment.findMany({
        where: { userId: ctx.session.user.id },
        include: { event: true },
      });
      return events.map((event) => event.event);
    }),
    enrollUser: protectedProcedure.input(z.object({ eventId: z.string() })).mutation(async ({ ctx, input }) => {
      await ctx.prisma.eventEnrollment.create({
        data: {
          userId: ctx.session.user.id,
          eventId: input.eventId,
        },
      });
      await ctx.prisma.event.update({
        where: { id: input.eventId },
        data: { capacity: { decrement: 1 } },
      });
    }),
  });
