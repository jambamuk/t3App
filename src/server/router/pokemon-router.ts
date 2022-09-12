import { createRouter } from "./context";
import { z } from "zod";

export const pokemon = createRouter()
  .query('getPokemon', {
    async resolve({ ctx }) {
        const pokemon = await prisma?.pokemon.findMany()
        console.log(pokemon)
        if(pokemon) return pokemon
    }
  })
  .mutation('addPokemon', {
    input: z.object({
      name: z.string(),
      sprite: z.string(),
    }),
    async resolve({ input }) {
      const post = await prisma?.pokemon.create({
        data: input,
      });
      return post;
    },
  })