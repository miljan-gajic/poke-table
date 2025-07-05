import { PaginatedPokemonTable } from "@/components/paginated-table/PaginatedTable";
import { getPokemonPage } from "@/utils/getPokemon";

export default async function Home() {
  const initialData = await getPokemonPage();

  return (
    <>
      <PaginatedPokemonTable initialData={initialData} />
    </>
  );
}
