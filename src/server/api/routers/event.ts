import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const eventRouter = createTRPCRouter({
  getAllEvents: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany({ include: { organizer: true } });
  }),

  createEvent: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        beginsAt: z.string(),
        capacity: z.number(),
        price: z.number().optional(),
        duration: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log("Event CREATING", input, ctx.session?.user.id);
      try {
        await ctx.prisma.event.create({
          data: {
            name: input.name,
            beginsAt: new Date(input.beginsAt).toISOString(),
            capacity: input.capacity,
            price: input.price ?? 0,
            duration: input.duration,
            organizerID: ctx.session?.user.id,
          },
        });
      } catch (e) {
        console.log("ERROR: ", e);
      }
    }),

  getEvent: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.event.findFirst({
        where: { id: input.id },
      });
    }),
});
