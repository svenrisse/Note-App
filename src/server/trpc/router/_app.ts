import { router } from "../trpc";
import { subscribeRouter } from "./subscripe";
import { notesRouter } from "./mynotes";

export const appRouter = router({
  subscribe: subscribeRouter,
  notes: notesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
