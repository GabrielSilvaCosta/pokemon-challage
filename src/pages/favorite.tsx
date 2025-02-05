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
    <div>
      <h1>Favoritos</h1>
      {favorites.length === 0 ? (
        <p>No favorite Pokémon yet!</p>
      ) : (
        <div>
          {favorites.map((pokemon) => (
            <div key={pokemon.name} className="pokemon-card">
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
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
