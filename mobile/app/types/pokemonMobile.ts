import { ReactNode } from "react";

export type RootTabParamList = {
  Home: undefined;
  Favorites: undefined;
};
export interface TabBarIconProps {
  color: string;
  size: number;
}

export interface Pokemon {
  name: string;
  categories: string[];
  abilities: string[];
}

export interface FavoritesContextType {
  favorites: Pokemon[];
  addFavorite: (pokemon: Pokemon) => void;
  removeFavorite: (name: string) => void;
}

export interface FavoritesProviderProps {
  children: ReactNode;
}
