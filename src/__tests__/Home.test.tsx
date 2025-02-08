import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "../app/page";
import { usePokemons } from "../composables/query/pokemonQuery";
import { useRouter } from "next/navigation";

jest.mock("../composables/query/pokemonQuery", () => ({
  usePokemons: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Home Component", () => {
  const mockPokemons = {
    data: [
      {
        name: "Pikachu",
        image: "https://example.com/pikachu.png",
        url: "https://example.com/pikachu",
      },
      {
        name: "Charmander",
        image: "https://example.com/charmander.png",
        url: "https://example.com/charmander",
      },
    ],
  };

  beforeEach(() => {
    (usePokemons as jest.Mock).mockReturnValue({
      data: mockPokemons,
      isLoading: false,
    });
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    localStorage.clear();
  });
  //     render(<Home />);

  //     expect(screen.getByText("Carregando...")).toBeInTheDocument();

  //     await waitFor(() => {
  //       expect(screen.getByText("Pikachu")).toBeInTheDocument();
  //       expect(screen.getByText("Charmander")).toBeInTheDocument();
  //     });
  //   });

  test("adds a Pokémon to favorites", async () => {
    render(<Home />);

    await waitFor(() => screen.getByText("Pikachu"));

    const likeButton = screen.getAllByRole("button", { name: /curtir/i })[0];
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(localStorage.getItem("favorites")).toContain("Pikachu");
    });
  });

  test("removes a Pokémon from favorites", async () => {
    localStorage.setItem(
      "favorites",
      JSON.stringify([{ name: "Pikachu", image: "url" }])
    );
    render(<Home />);

    await waitFor(() => screen.getByText("Pikachu"));

    const dislikeButton = screen.getAllByRole("button", {
      name: /descurtir/i,
    })[0];
    fireEvent.click(dislikeButton);

    await waitFor(() => {
      expect(localStorage.getItem("favorites")).not.toContain("Pikachu");
    });
  });

  test("navigates to favorites page", async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    render(<Home />);

    const favButton = screen.getByRole("button", { name: /meus favoritos/i });
    fireEvent.click(favButton);

    expect(mockPush).toHaveBeenCalledWith("/favorite");
  });
});
