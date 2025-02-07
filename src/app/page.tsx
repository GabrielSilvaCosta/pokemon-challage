"use client";
import { useState, useEffect } from "react";
import { usePokemons } from "../composables/query/pokemonQuery";
import { Pokemon } from "../@types/pokemon";
import { PokemonCard } from "../components/pokemonCard";
import Pagination from "../components/pagination";
import { useRouter } from "next/navigation";

const Home = () => {
  const { data: pokemons, isLoading } = usePokemons();
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage] = useState(20);
  const router = useRouter();

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

  if (isLoading)
    return <p className="text-center text-gray-500">Carregando...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          Pokémon List
        </h1>

        <button
          className="block text-center text-blue-500 hover:text-blue-700 font-semibold mb-8"
          onClick={() => router.push("/favorite")}
        >
          Meus Favoritos
        </button>

        <div className="flex flex-wrap gap-8 justify-center">
          {currentPokemons?.map((pokemon) => (
            <div
              key={pokemon.name}
              className="pokemon-card w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105"
            >
              <PokemonCard
                pokemon={pokemon}
                onLike={handleLike}
                onDislike={handleDislike}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
