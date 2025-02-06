export interface Pokemon {
  name: string;
  url: string;
  image?: string;
  abilities?: string[];
  categories?: string[];
}

export interface Ability {
  ability: {
    name: string;
  };
}

export interface PokemonDetails {
  name: string;
  sprites: {
    front_default: string;
  };
  abilities: Ability[];
  types: {
    type: {
      name: string;
    };
  }[];
}

export interface PokemonCardProps {
  pokemon: Pokemon;
  onLike: (pokemon: Pokemon) => void;
  onDislike: (name: string) => void;
}

export interface ButtonProps {
  onClick: () => void;
  text: string;
  icon: React.ReactNode;
  className?: string;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
