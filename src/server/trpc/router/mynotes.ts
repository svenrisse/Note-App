import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const notesRouter = router({
  //create a note
  newNote: publicProcedure
    .input(
      z.object({
        title: z
          .string()
          .min(5, { message: "Must be longer than 5 characters" })
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
});
