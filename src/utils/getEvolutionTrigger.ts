import { PokemonApiResponse } from "@/types/pokemon";
import {  DEFAULT_CACHE_REVALIDATION, PAGE_SIZE, EVOLUTION_TRIGGER_BASE_URL } from "./constants";

export async function getEvolutionTriggerPage(limit = PAGE_SIZE, offset = 0): Promise<PokemonApiResponse> {
  const res = await fetch(`${EVOLUTION_TRIGGER_BASE_URL}?limit=${limit}&offset=${offset}`, {
    next: { revalidate: DEFAULT_CACHE_REVALIDATION },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch Evolution Triggers');
  }

  return res.json();
}
