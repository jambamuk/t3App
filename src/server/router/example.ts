import { createRouter } from "./context";
import { z } from "zod";

export const exampleRouter = createRouter()
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
    .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const {id} = input
      const post = await prisma?.user.delete({
        where: { id }
      });
      return post;
    },
  })
