import { PokemonClient } from 'pokenode-ts'
import Image from 'next/image';
import { trpc } from '../utils/trpc';

export default function Pokemon() {
  const pokemons = trpc.useQuery(["pokemon.getPokemon"]);
  const utils = trpc.useContext()
  const addPokemonMutation = trpc.useMutation(["pokemon.addPokemon"], {
    async onSuccess() {
      // refetches posts after a post is added
      await utils.invalidateQueries(["pokemon.getPokemon"]);
    },
    onError(error) {
      console.log(error.data)
      console.log(error.data?.code)
    }
  });

  async function addRandomPokemon() {
    console.log(pokemons)
    const api = new PokemonClient();
    await api
      .getPokemonById(Math.round(Math.random()*10 + 1))
      .then((p) => {
        console.log(p.sprites.front_default)
        addPokemonMutation.mutateAsync({
          name: p.name,
          sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/405.png',
        })
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
    <h1>POKEMON</h1>
    {pokemons.data?.map((pokemon)=>{
      <p>{pokemon.name}</p>
    })}
      {pokemons.data?.map((pokemon) => {
        <Image key={pokemon.name} src={pokemon.sprite} alt="pokemon"></Image>
      })}
      <button onClick={addRandomPokemon} className=''>get pokemon</button>
    </div>
  )
}
