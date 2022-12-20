import { router } from "../trpc";
import { subscribeRouter } from "./subscripe";

export const appRouter = router({
  subscribe: subscribeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
