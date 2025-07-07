import { PaginatedPokemonTable } from "@/components/ui/paginated-table/paginated-table";
import { Pokemon } from "@/types/pokemon";
import { getEvolutionTriggerPage } from "@/utils/getEvolutionTrigger";
import { getPokemonPage } from "@/utils/getPokemons";
import { ColumnDef } from "@tanstack/react-table";

export default async function Home() {
  const initialData = await getPokemonPage();
  const evolutionInitialData = await getEvolutionTriggerPage();

  const columnsMainPokemonTable = [
    {
      header: "Name",
      accessorKey: "name",
    },
  ] as ColumnDef<Pokemon>[];

  const columnsEvoTriggers = [
    {
      header: "Name",
      accessorKey: "name",
    },
  ] as ColumnDef<Pokemon>[];

  return (
    <main>
      <PaginatedPokemonTable
        title="Pokémon Table"
        initialData={initialData}
        columns={columnsMainPokemonTable}
      />

      <PaginatedPokemonTable
        title="Evolution Triggers"
        initialData={evolutionInitialData}
        columns={columnsEvoTriggers}
        filtering={false}
      />
    </main>
  );
}
