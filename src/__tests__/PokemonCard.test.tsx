import { render, screen, fireEvent } from "@testing-library/react";
import { PokemonCard } from "../components/pokemonCard";

const mockPokemon = {
  name: "Pikachu",
  image: "https://example.com/pikachu.png",
  categories: ["Elétrico"],
  abilities: ["Choque do Trovão", "Investida"],
  url: "https://example.com/pikachu",
};

describe("PokemonCard Component", () => {
  const mockOnLike = jest.fn();
  const mockOnDislike = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Pokemon name and image", () => {
    render(
      <PokemonCard
        pokemon={mockPokemon}
        onLike={mockOnLike}
        onDislike={mockOnDislike}
      />
    );

    expect(screen.getByText("Pikachu")).toBeInTheDocument();

    const image = screen.getByRole("img", { name: /pikachu/i });
    expect(image).toHaveAttribute("src", mockPokemon.image);
    expect(image).toHaveAttribute("alt", "Pikachu");
  });

  test("renders Pokemon categories and abilities", () => {
    render(
      <PokemonCard
        pokemon={mockPokemon}
        onLike={mockOnLike}
        onDislike={mockOnDislike}
      />
    );

    expect(screen.getByText(/Categoria:/i)).toBeInTheDocument();
    expect(screen.getByText(/Elétrico/i)).toBeInTheDocument();

    expect(screen.getByText(/Habilidades:/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Choque do Trovão, Investida/i)
    ).toBeInTheDocument();
  });

  test("calls onLike when 'Curtir' button is clicked", () => {
    render(
      <PokemonCard
        pokemon={mockPokemon}
        onLike={mockOnLike}
        onDislike={mockOnDislike}
      />
    );

    fireEvent.click(screen.getByText("Curtir"));
    expect(mockOnLike).toHaveBeenCalledWith(mockPokemon);
  });

  test("calls onDislike when 'Descurtir' button is clicked", () => {
    render(
      <PokemonCard
        pokemon={mockPokemon}
        onLike={mockOnLike}
        onDislike={mockOnDislike}
      />
    );

    fireEvent.click(screen.getByText("Descurtir"));
    expect(mockOnDislike).toHaveBeenCalledWith(mockPokemon.name);
  });
});
