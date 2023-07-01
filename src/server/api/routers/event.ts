import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure
} from "~/server/api/trpc";
import { z } from "zod";

export const userRouter
  = createTRPCRouter({
    getAllEvents: publicProcedure.query(({ ctx }) => {
      return ctx.prisma.event.findMany();
    }),

    createEvent: protectedProcedure.input(z.object({ name: z.string(), beginsAt: z.string(), capacity: z.number(), price: z.number().optional() })).mutation(({ ctx, input }) => {
      ctx.prisma.event.create({
        data: {
          name: input.name,
          beginsAt: input.beginsAt,
          capacity: input.capacity,
          price: input.price ?? 0,
          organizerID: ctx.session.user.id,
        },
      });
    }),

    getEvent: publicProcedure.input(z.object({ id: z.string() })).query(({ ctx, input }) => {
      return ctx.prisma.event.findFirst({
        where: { id: input.id }
      });
    }),
  });
