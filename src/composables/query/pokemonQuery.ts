import { useQuery } from "@tanstack/react-query";
import { Pokemon } from "../../@types/pokemon";
import { ApiResponse } from "@/api/ApiResponse";

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
    queryFn: getAllPokemons,
  });
}

export default {
  getAllPokemons,
  usePokemons,
};
