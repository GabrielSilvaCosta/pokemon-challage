"use client";
import { useState, useEffect } from "react";
import { usePokemons } from "../composables/query/pokemonQuery";
import { Pokemon } from "../@types/pokemon";
import { PokemonCard } from "../components/pokemonCard";
import Pagination from "../components/pagination";
import Link from "next/link";

const Home = () => {
  const { data: pokemons, isLoading } = usePokemons();
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(20);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleLike = (pokemon: Pokemon) => {
    setFavorites((prev) => [...prev, pokemon]);

    const updatedFavorites = [...favorites, pokemon];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    // Emite um evento customizado de "curtir"
    const event = new CustomEvent("pokemonLiked", { detail: pokemon });
    window.dispatchEvent(event);
  };

  const handleDislike = (name: string) => {
    setFavorites((prev) => prev.filter((pokemon) => pokemon.name !== name));

    // Emite um evento customizado de "descurtir"
    const event = new CustomEvent("pokemonDisliked", { detail: name });
    window.dispatchEvent(event);
  };

  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = pokemons?.data.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );
  const totalPages = Math.ceil((pokemons?.data.length || 0) / pokemonsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Pokémon List</h1>
      <h2>Favorites:</h2>
      <ul>
        {favorites.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>

      <Link href="/favorite">
        <button>Go to Favorites</button>
      </Link>

      {currentPokemons?.map((pokemon) => (
        <div key={pokemon.name} className="pokemon-card">
          <PokemonCard
            pokemon={pokemon}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        </div>
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
