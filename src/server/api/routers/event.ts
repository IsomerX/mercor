import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const eventRouter = createTRPCRouter({
  getAllEvents: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany();
  }),

  createEvent: protectedProcedure.input(
    z.object({
      name: z.string(),
      beginsAt: z.date(),
      capacity: z.number(),
      price: z.number().optional(),
      duration: z.number(),
    }),
  ).mutation(({ ctx, input }) => {
    console.log('Event CREATING', input)
    ctx.prisma.event.create({
      data: {
        name: input.name,
        beginsAt: input.beginsAt,
        capacity: input.capacity,
        price: input.price ?? 0,
        organizerID: ctx.session.user.id,
        duration: input.duration,
      },
    });
  }),

  getEvent: publicProcedure.input(z.object({ id: z.string() })).query(
    ({ ctx, input }) => {
      return ctx.prisma.event.findFirst({
        where: { id: input.id },
      });
    },
  ),
});
