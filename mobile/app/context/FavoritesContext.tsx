import React, { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Pokemon,
  FavoritesContextType,
  FavoritesProviderProps,
} from "../types/pokemonMobile";

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem("favorites");
        setFavorites(storedFavorites ? JSON.parse(storedFavorites) : []);
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
      }
    };
    loadFavorites();
  }, []);

  const addFavorite = async (pokemon: Pokemon) => {
    try {
      const updatedFavorites = [...favorites, pokemon];
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Erro ao salvar favorito:", error);
    }
  };

  const removeFavorite = async (name: string) => {
    try {
      const updatedFavorites = favorites.filter((fav) => fav.name !== name);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
