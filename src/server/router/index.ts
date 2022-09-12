// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { noAuthUserRouter } from "./users-router";
import { usersRouter } from "./protected-users-router";
import { pokemon } from "./pokemon-router";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("noAuthUser.", noAuthUserRouter)
  .merge("users.", usersRouter )
  .merge("pokemon.", pokemon);

// export type definition of API
export type AppRouter = typeof appRouter;
