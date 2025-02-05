"use client";
import { usePokemons } from "../composables/query/pokemonQuery";

export default function Home() {
  const { data, error, isLoading } = usePokemons();

  if (isLoading) return <h1>Loading Pokémon...</h1>;

  if (error) return <h1>Failed to load Pokémon: {error.message}</h1>;

  if (!data || !data.data) return <h1>No Pokémon data found.</h1>;

  return (
    <div>
      <h1>My Pokémon Challenge 🐱‍👤</h1>
      <ul>
        {data.data.map((pokemon) => (
          <li key={pokemon.name}>
            <h2>{pokemon.name}</h2>
            {pokemon.image && (
              <img
                src={pokemon.image}
                alt={pokemon.name}
                style={{ width: "100px", height: "100px" }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
