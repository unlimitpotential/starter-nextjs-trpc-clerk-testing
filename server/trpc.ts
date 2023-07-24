// context.ts

import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(async ({ next, ctx }) => {
  if (ctx.user === null) {
    // User is not authenticated, fetch posts data from the NestJS app's endpoint
    try {
      const response = await fetch(
        "https://nestjs-nextjs-trpc-monorepo-production.up.railway.app/posts" // Replace with the actual endpoint URL to fetch posts data
      );

      // Check if the response is successful (status code 2xx)
      if (!response.ok) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      // Parse the response body as JSON (assuming the response contains posts data as JSON)
      const posts = await response.json();

      // Return the fetched posts data as JSON
      return next({
        ctx: {
          user: null,
          posts,
        },
      });
    } catch (error) {
      // Handle error if fetching posts data fails
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
  }

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
