import { fetchPokemonDetails } from "../composables/query/pokemonDetailsQuery";

global.fetch = jest.fn();

describe("fetchPokemonDetails", () => {
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorMock.mockRestore();
  });

  test("must return pokemon details", async () => {
    const mockUrl = "https://pokeapi.co/api/v2/pokemon/25";
    const mockPokemonData = {
      name: "pikachu",
      sprites: { front_default: "https://example.com/pikachu.png" },
      abilities: [{ ability: { name: "static" } }],
      types: [{ type: { name: "electric" } }],
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue(mockPokemonData),
    });

    const result = await fetchPokemonDetails(mockUrl);

    expect(fetch).toHaveBeenCalledWith(mockUrl);
    expect(result).toEqual({
      name: "pikachu",
      url: mockUrl,
      image: "https://example.com/pikachu.png",
      abilities: ["static"],
      categories: ["electric"],
    });
  });

  test("must return null when pokemon is not found", async () => {
    const mockUrl = "https://pokeapi.co/api/v2/pokemon/999";

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const result = await fetchPokemonDetails(mockUrl);

    expect(fetch).toHaveBeenCalledWith(mockUrl);
    expect(result).toBeNull();
  });

  test("must return null when fetch fails", async () => {
    const mockUrl = "https://pokeapi.co/api/v2/pokemon/25";

    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network Error"));

    const result = await fetchPokemonDetails(mockUrl);

    expect(fetch).toHaveBeenCalledWith(mockUrl);
    expect(result).toBeNull();
  });
});
