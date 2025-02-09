import { getAllPokemons } from "../composables/query/pokemonQuery";

const mockPokemons = {
  data: [
    { name: "Pikachu", url: "https://pokeapi.co/api/v2/pokemon/25" },
    { name: "Charmander", url: "https://pokeapi.co/api/v2/pokemon/4" },
  ],
};

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ results: mockPokemons.data }),
  })
) as jest.Mock;

describe("Pokemon Query", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getAllPokemons fetches and returns Pokémons", async () => {
    const result = await getAllPokemons();
    expect(result.data).toEqual(mockPokemons.data);
    expect(result.message).toBe("Pokémons fetched successfully");
  });
});
