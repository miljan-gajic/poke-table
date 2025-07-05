'use client';

import { PokemonApiResponse } from '@/types/pokemon';
import { useState } from 'react';

const filterCache = new Map<string, PokemonApiResponse>();

export function usePokemonFilter() {
  const [data, setData] = useState<PokemonApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyFilter = async (name: string) => {
    setError(null);

    if (!name) {
      setData(null);
      return;
    }

    if (filterCache.has(name)) {
      setData(filterCache.get(name)!);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/pokemon-filter?name=${encodeURIComponent(name)}`);
      if (!res.ok) throw new Error('Pokémon not found');
      const result: PokemonApiResponse = await res.json();

      filterCache.set(name, result);
      setData(result);
    } catch (e) {
      setError((e as Error).message);
      setData({ count: 0, next: null, previous: null, results: [] });
    } finally {
      setLoading(false);
    }
  };

  return {
    data: data?.results,
    applyFilter,
    error,
    loading,
    clearFilter: () => {
      setData(null);
      setError(null);
    },
  };
}
