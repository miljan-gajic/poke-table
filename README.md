# Pokémon Data Explorer

A Next.js application that displays Pokémon data in interactive tables with server-side rendering, pagination, and filtering capabilities.

## Overview

This project demonstrates the implementation of a paginated, filterable table of Pokémon data using Next.js for server-side rendering. The application features a main Pokémon table and a secondary evolution triggers table, both implemented with pagination. Clicking on a row in the main table opens a modal with detailed information about the selected Pokémon.

## Features

- **Server-Side Rendering (SSR)**: Initial data is fetched server-side using Next.js App Router
- **Pagination**: Both tables support pagination with next/previous navigation
- **Server-Side Filtering**: Filter Pokémon by name with server-side processing
- **Interactive UI**: Click on any Pokémon row to view detailed information in a modal
- **Responsive Design**: Clean, responsive interface using Tailwind CSS
- **Data Caching**: Implementation of caching mechanisms to optimize API requests

## Technical Implementation

### Project Structure

The project follows a clean, modular architecture:

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/             # Reusable UI components
│   │   └── ui/                 # Core UI components like table and modal
│   ├── hooks/                  # Custom React hooks
│   ├── types/                  # TypeScript type definitions
│   └── utils/                  # Utility functions and constants
```

### Key Components

#### PaginatedPokemonTable

The main table component that handles pagination, filtering, and row interaction. It uses TanStack Table (react-table) for the core table functionality and supports:

- Dynamic column definitions
- Page navigation
- Name-based filtering
- Row click handling to show details

#### Modal

A reusable modal component that displays detailed information about the selected Pokémon, including:

- Pokémon abilities
- Stats
- Loading states

### Data Fetching Strategy

The application employs several strategies for data fetching:

1. **Initial Data Loading**: Server-side fetching for the first page of data
2. **Pagination**: Client-side fetching for navigation between pages
3. **Filtering**: Server-side API route for filtering by Pokémon name
4. **Detail Views**: Client-side fetching when a Pokémon is selected

### Custom Hooks

#### usePokemonPagination

Manages the state and logic for paginating through the Pokémon API results, with built-in caching to avoid redundant network requests.

#### usePokemonFilter

Handles filtering functionality with caching and error handling for searching Pokémon by name.

### API Routes

The project includes a custom API route for Pokémon filtering at `/api/pokemon-filter`, which provides:

- Name-based filtering
- Detailed information retrieval
- Error handling for not-found Pokémon

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Table Library**: TanStack Table (react-table) 8
- **TypeScript**: For type safety
- **API**: PokéAPI (https://pokeapi.co/)

## Implementation Highlights

### Server-Side Rendering

The application leverages Next.js App Router to fetch initial data server-side, providing a fully rendered page on first load:

```tsx
// src/app/page.tsx
export default async function Home() {
  const initialData = await getPokemonPage();
  const evolutionInitialData = await getEvolutionTriggerPage();
  // ...
}
```

### Pagination Logic

Pagination is implemented with a custom hook that manages state and API calls:

```typescript
// src/hooks/usePokemonPagination.ts
export function usePokemonPagination(
  initialPage: PokemonApiResponse,
) {
  const [pageData, setPageData] =
    useState<PokemonApiResponse>(initialPage);
  // ... pagination logic
}
```

### Filtering Implementation

The application uses a custom API route to filter Pokémon by name:

```typescript
// src/app/api/pokemon-filter/route.ts
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  // ... filtering logic
}
```

### Modal for Detailed View

When a user clicks on a table row, a modal is shown with detailed information:

```tsx
// src/components/ui/modal/modal.tsx
export function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  // ... modal implementation
}
```

## Key Learning Points

- Implementation of server-side rendering with Next.js
- Building paginated tables with TanStack Table
- Creating custom API routes for server-side filtering
- Efficient state management with React hooks
- Data caching strategies to optimize performance
- Modal implementations for detail views
- TypeScript for improved code reliability
