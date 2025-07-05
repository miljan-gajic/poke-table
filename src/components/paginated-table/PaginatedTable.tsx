"use client";

import React, { useMemo, useState } from "react";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { PAGE_SIZE } from "@/utils/constants";
import { Pokemon, PokemonApiResponse } from "@/types/pokemon";
import { usePokemonPagination } from "@/hooks/usePokemonPagination";

type PokemonTableProps = {
  initialData: PokemonApiResponse;
};

export function PaginatedPokemonTable({ initialData }: PokemonTableProps) {
  const [pageIndex, setPageIndex] = useState(0);

  const { data, loading, error, goToNext, goToPrevious } =
    usePokemonPagination(initialData);

  const totalPages = Math.ceil(initialData.count / PAGE_SIZE);

  const columns = useMemo<ColumnDef<Pokemon>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (rowData: any) => {
    alert(`You clicked on row with ID: ${rowData.id}`);
    // You can navigate or open modal etc.
  };

  const handleNextPage = () => {
    setPageIndex((i) => Math.min(i + 1, totalPages - 1));
    goToNext();
  };

  const handlePreviousPage = () => {
    goToPrevious();
    setPageIndex((i) => Math.max(i - 1, 0));
  };

  return (
    <div className="p-6 bg-gradient-to-b from-blue-50 to-white w-[100%]">
      <table className="min-w-full border-collapse border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-sm font-medium text-gray-600"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="cursor-pointer transition-colors duration-200 hover:bg-blue-50 active:bg-blue-100"
              onClick={() => handleRowClick(row.original)}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end items-center mt-4">
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-blue-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handlePreviousPage}
            disabled={pageIndex === 0}
          >
            Previous
          </button>
          <span className="text-sm font-medium text-gray-600">
            Page {pageIndex + 1} of {totalPages}
          </span>
          <button
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-blue-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleNextPage}
            disabled={pageIndex >= totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
