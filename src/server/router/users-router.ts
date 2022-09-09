import { createRouter } from "./context";
import { z } from "zod";

export const noAuthUserRouter = createRouter()
  .query('getUsers', {
    async resolve({ ctx }) {
      return await prisma?.user.findMany()
    }
  })
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