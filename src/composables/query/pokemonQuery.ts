import { useQuery } from "@tanstack/react-query";
import { Pokemon } from "../../@types/pokemon";
import { ApiResponse } from "@/api/ApiResponse";
import { fetchPokemonDetails } from "./pokemonDetailsQuery";

export const getAllPokemons = async (): Promise<ApiResponse<Pokemon[]>> => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  const data = await response.json();
  return {
    data: data.results,
    message: "Pokémons fetched successfully",
  };
};

export function usePokemons() {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: async () => {
      const { data } = await getAllPokemons();
      const pokemonWithImages = await Promise.all(
        data.map((pokemon) => fetchPokemonDetails(pokemon.url))
      );
      return {
        data: pokemonWithImages,
        message: "Pokémons fetched successfully",
      };
    },
  });
}

export default {
  getAllPokemons,
  usePokemons,
};
