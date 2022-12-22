import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const notesRouter = router({
  //create a note
  newNote: publicProcedure
    .input(
      z.object({
        title: z
          .string()
          .max(200, { message: "Must be shorter than 200 characters" })
          .trim(),
        description: z
          .string()
          .min(5, { message: "Must be longer than 5 characters" })
          .max(200, { message: "Must be shorter than 200 characters" })
          .trim(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.notes.create({
          data: {
            title: input.title,
            description: input.description,
          },
        });
      } catch (error) {
        console.log(`Note cannot be created ${error}`);
      }
    }),
  allNotes: publicProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.notes.findMany({
        select: {
          title: true,
          id: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      console.log(`Cannot fetch your notes ${error}`);
    }
  }),
  detailNote: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input;
      try {
        return await ctx.prisma.notes.findUnique({
          where: {
            id,
          },
        });
      } catch (error) {
        console.log(`Note detail not found ${error}`);
      }
    }),
  updateNote: publicProcedure
    .input(
      z.object({
        title: z
          .string()
          .max(200, { message: "Must be less than 200 characters!" })
          .trim(),
        description: z
          .string()
          .max(200, { message: "Must be less than 200 characters!" })
          .trim(),
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      try {
        return await ctx.prisma.notes.update({
          where: {
            id,
          },
          data: {
            title: input.title,
            description: input.description,
          },
        });
      } catch (error) {
        console.log(`Note cannot be updated ${error}`);
      }
    }),
  deleteNote: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      try {
        return await ctx.prisma.notes.delete({
          where: {
            id,
          },
        });
      } catch (error) {
        console.log(`Note cannot be deleted ${error}`);
      }
    }),
});
