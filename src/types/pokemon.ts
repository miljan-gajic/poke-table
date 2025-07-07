export type Pokemon = {
  name: string;
  url: string
};

export type PokemonApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
};

export type SinglePokemonDetails = {
  name: string
  abilities: {ability: {name: string}}[]
  stats: {stat: {name: string}}[]
}
