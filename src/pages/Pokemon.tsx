import { Pokemon, PokemonClient } from "pokenode-ts"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function AdviserHome() {
  const [data, setData] = useState<Pokemon[]>([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    // move to back ?
    addPokemon()
  }, [])

  function addPokemon() {
    const api = new PokemonClient();
    setLoading(true)
    api
      .getPokemonById(getRandomPokemon())
      .then((p) => {
        console.log(p)
        if (p) {
          setData([...data, p])
          setLoading(false)
        }
      })
  }
  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <div>
      <button onClick={addPokemon}>Add</button>
      {data &&
        data.map((p) => (
          <div key={p.id}>
              <Image
                src={p.sprites.front_default as string}
                alt={p.name}
                width={100}
                height={100}
              />
              <h1>{p.name}</h1>
          </div>
        ))
      }
    </div>
  );
}

const MAX_DEX_ID = 493;

export const getRandomPokemon: (notThisOne?: number) => number = (
  notThisOne
) => {
  const pokedexNumber = Math.floor(Math.random() * MAX_DEX_ID) + 1;

  if (pokedexNumber !== notThisOne) return pokedexNumber;
  return getRandomPokemon(notThisOne);
};
