import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const userRouter
  = createTRPCRouter({

    getUserEvents: protectedProcedure.query(async ({ ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.session.user.id },
        include: { enrolledEvents: { include: { event: true } }, organizes: true },
      })
      return user;
    }),


    enrollUser: protectedProcedure.input(z.object({ eventId: z.string() })).mutation(async ({ ctx, input }) => {
      const isEnrolled = await ctx.prisma.eventEnrollment.findFirst({ where: { userId: ctx.session.user.id, eventId: input.eventId } });
      if (isEnrolled) throw new Error("Already enrolled");
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
