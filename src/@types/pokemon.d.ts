export interface Pokemon {
  name: string;
  url: string;
  image?: string;
}

export interface PokemonDetails {
  sprites: {
    front_default: string;
  };
}
