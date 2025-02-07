"use client";
import { useState, useEffect } from "react";
import { Pokemon } from "../@types/pokemon";
import { PokemonCard } from "../components/pokemonCard";
import { useRouter } from "next/navigation";
import styles from "../css/favorite.module.css";
const getFavoritesFromStorage = (): Pokemon[] => {
  const favorites = localStorage.getItem("favorites");
  return favorites ? JSON.parse(favorites) : [];
};

export default function Favorite() {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const router = useRouter();

  useEffect(() => {
    setFavorites(getFavoritesFromStorage());
  }, []);

  const handleDislike = (name: string) => {
    const updatedFavorites = favorites.filter((fav) => fav.name !== name);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div className={styles.favoritePage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Meus Favoritos</h1>

        <button onClick={handleGoBack} className={styles.backButton}>
          Voltar para a Lista de Pokémon
        </button>

        {favorites.length === 0 ? (
          <p className={styles.emptyMessage}>
            Você ainda não tem Pokémon favoritos!
          </p>
        ) : (
          <div className={styles.pokemonGrid}>
            {favorites.map((pokemon) => (
              <div key={pokemon.name} className={styles.pokemonItem}>
                <div className={styles.pokemonCard}>
                  <img src={pokemon.image} alt={pokemon.name} />
                  <h2>{pokemon.name}</h2>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
