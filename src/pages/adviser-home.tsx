import { Pokemon, PokemonClient } from "pokenode-ts"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function AdviserHome() {
  const [data, setData] = useState<Pokemon[]>([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    addPokemon()
  }, [])

  function addPokemon() {

    const api = new PokemonClient();
    setLoading(true)
    api
      .getPokemonById(Math.round(Math.random() * 10 + 1))
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
          <div>
            <Image
              src={p.sprites.front_default}
              alt={p.name}
              width={100}
              height={100}
            />
          </div>
        ))
      }
    </div>
  );
};
