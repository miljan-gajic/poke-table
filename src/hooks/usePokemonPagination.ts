'use client';

import { PokemonApiResponse } from '@/types/pokemon';
import { POKE_API_BASE_URL, PAGE_SIZE } from '@/utils/constants';
import { useState } from 'react';

const cache = new Map<string, PokemonApiResponse>();

export function usePokemonPagination(initialPage: PokemonApiResponse) {
  const [pageData, setPageData] = useState<PokemonApiResponse>(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  cache.set(`${POKE_API_BASE_URL}?offset=0&limit=${PAGE_SIZE}`, initialPage)

  const fetchPage = async (url: string) => {
    if (cache.has(url)) {
      setPageData(cache.get(url)!);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch page');
      const json: PokemonApiResponse = await res.json();
      cache.set(url, json);
      setPageData(json);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data: pageData.results,
    loading,
    error,
    goToNext: () => {
      if (pageData.next) fetchPage(pageData.next);
    },
    goToPrevious: () => {
      if (pageData.previous) fetchPage(pageData.previous);
    },
  };
}
