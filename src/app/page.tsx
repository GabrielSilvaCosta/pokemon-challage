"use client";

import { usePokemons } from "../composables/query/pokemonQuery";

export default function Home() {
  const { data, error, isLoading } = usePokemons();

  if (isLoading) return <h1>Loading Pokémon...</h1>;

  if (error) return <h1>Failed to load Pokémon: {error.message}</h1>;

  return (
    <div>
      <h1>My Pokémon Challenge 🐱‍👤</h1>
      {data && (
        <ul>
          {data.data.map((pokemon) => (
            <li key={pokemon.name}>{pokemon.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
