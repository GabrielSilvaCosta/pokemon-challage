import { render, screen, fireEvent } from "@testing-library/react";
import Favorite from "../pages/favorite";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockFavorites = [
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
];

describe("Favorite Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(mockFavorites));
    Storage.prototype.setItem = jest.fn();
  });

  test("renders title and 'Voltar para a Lista de Pokémon' button", () => {
    render(<Favorite />);

    expect(screen.getByText("Meus Favoritos")).toBeInTheDocument();
    expect(
      screen.getByText("Voltar para a Lista de Pokémon")
    ).toBeInTheDocument();
  });

  test("loads favorites from localStorage and displays them", () => {
    render(<Favorite />);

    expect(screen.getByText("Pikachu")).toBeInTheDocument();
    expect(screen.getByText("Charmander")).toBeInTheDocument();

    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("src", mockFavorites[0].image);
    expect(images[1]).toHaveAttribute("src", mockFavorites[1].image);
  });

  test("navigates to home page when 'Voltar para a Lista de Pokémon' is clicked", () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<Favorite />);

    fireEvent.click(screen.getByText("Voltar para a Lista de Pokémon"));

    expect(pushMock).toHaveBeenCalledWith("/");
  });

  test("displays empty message when there are no favorites", () => {
    Storage.prototype.getItem = jest.fn(() => JSON.stringify([]));

    render(<Favorite />);

    expect(
      screen.getByText("Você ainda não tem Pokémon favoritos!")
    ).toBeInTheDocument();
  });
});
