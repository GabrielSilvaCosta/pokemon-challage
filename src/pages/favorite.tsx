"use client";
import { useState, useEffect } from "react";
import { Pokemon } from "../@types/pokemon";
import { PokemonCard } from "../components/pokemonCard";

const getFavoritesFromStorage = (): Pokemon[] => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

const Favorites = () => {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  useEffect(() => {
    setFavorites(getFavoritesFromStorage());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-red-900 mb-6">
          Meus Favoritos
        </h1>

        {favorites.length === 0 ? (
          <p className="text-xl text-center text-gray-600">
            Você ainda não tem Pokémon favoritos!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((pokemon) => (
              <div key={pokemon.name} className="flex justify-center">
                <div className="pokemon-card shadow-lg rounded-lg overflow-hidden bg-white">
                  <PokemonCard
                    pokemon={pokemon}
                    onLike={() => {}}
                    onDislike={(name) => {
                      const updatedFavorites = favorites.filter(
                        (fav) => fav.name !== name
                      );
                      setFavorites(updatedFavorites);
                      localStorage.setItem(
                        "favorites",
                        JSON.stringify(updatedFavorites)
                      );
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
