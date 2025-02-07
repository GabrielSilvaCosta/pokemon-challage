"use client";
import { useState, useEffect } from "react";
import { usePokemons } from "../composables/query/pokemonQuery";
import { Pokemon } from "../@types/pokemon";
import { PokemonCard } from "../components/pokemonCard";
import Pagination from "../components/pagination";
import { useRouter } from "next/navigation";
import Image from "next/image";
import pokemonLogo from "../assets/pokemon-logo.png";

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
    const updatedFavorites = favorites.filter((fav) => fav.name !== name);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

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
    <div className="relative min-h-screen bg-cover bg-center">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <Image
            src={pokemonLogo}
            alt="Pokemon Logo"
            width={200}
            height={100}
          />
          <button
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
            onClick={() => router.push("/favorite")}
          >
            Meus Favoritos
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {currentPokemons
            ?.filter((pokemon): pokemon is Pokemon => pokemon !== null)
            .map((pokemon) => (
              <div
                key={pokemon.name}
                className="pokemon-card bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl"
              >
                <PokemonCard
                  pokemon={pokemon}
                  onLike={handleLike}
                  onDislike={handleDislike}
                />
              </div>
            ))}
        </div>

        <div className="flex justify-center mt-10">
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
