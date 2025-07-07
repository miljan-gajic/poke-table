import { Modal } from "@/components/ui/modal/modal";
import { PaginatedPokemonTable } from "@/components/ui/paginated-table/paginated-table";
import { getPokemonPage } from "@/utils/getPokemons";

export default async function Home() {
  const initialData = await getPokemonPage();

  return (
    <main>
      <PaginatedPokemonTable initialData={initialData} />
    </main>
  );
}
