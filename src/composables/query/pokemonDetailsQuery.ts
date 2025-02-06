import { Pokemon, PokemonDetails } from "../../@types/pokemon";

export const fetchPokemonDetails = async (
  url: string
): Promise<Pokemon | null> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon details");
    }
    const details: PokemonDetails = await response.json();

    return {
      name: details.name,
      url,
      image: details.sprites.front_default,
      abilities: details.abilities.map((a) => a.ability.name),
      categories: details.types.map((type) => type.type.name),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
