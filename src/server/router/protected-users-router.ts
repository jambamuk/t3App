import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createProtectedRouter } from "./protected-router";

export const usersRouter = createProtectedRouter()
    .mutation('add', {
    input: z.object({
      id: z.string().uuid().optional(),
      name: z.string().min(1).max(32),
      email: z.string().email(),
    }),
    async resolve({ input }) {
      const post = await prisma?.user.create({
        data: input,
      });
      return post;
    },
  })
    .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const {id} = input
      const post = await prisma?.user.delete({
        where: { id }
      });
      if(!post){
        throw new TRPCError({
          code: "NOT_FOUND",
          message: 'User does not exist'
        })
      }
      return post;
    },
  })
