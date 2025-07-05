import { PokemonApiResponse } from "@/types/pokemon";
import { POKE_API_BASE_URL, DEFAULT_CACHE_REVALIDATION, PAGE_SIZE } from "./constants";

export async function getPokemonPage(limit = PAGE_SIZE, offset = 0): Promise<PokemonApiResponse> {
  const res = await fetch(`${POKE_API_BASE_URL}?limit=${limit}&offset=${offset}`, {
    next: { revalidate: DEFAULT_CACHE_REVALIDATION },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch Pokémons');
  }

  return res.json();
}
