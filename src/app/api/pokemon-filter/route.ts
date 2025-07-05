import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json(
      { error: 'Missing "name" query parameter' },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Pokémon not found' },
        { status: 404 }
      );
    }

    const pokemon = await res.json();

    return NextResponse.json({
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: pokemon.name,
          url: `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`,
        },
      ],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch Pokémon' },
      { status: 500 }
    );
  }
}
