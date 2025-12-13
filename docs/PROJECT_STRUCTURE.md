# Project Structure Documentation

This document explains the purpose and contents of each folder in the Return Hub Service project. Use this as a reference when navigating the codebase.

## Table of Contents
- [Root Directory](#root-directory)
- [Source Code (`src/`)](#source-code-src)
- [Application Routes (`src/app/`)](#application-routes-srcapp)
- [Database (`supabase/`)](#database-supabase)
- [Configuration Files](#configuration-files)

---

## Root Directory

```
return-hub-service/
├── src/                    # Application source code
├── supabase/              # Database configuration and migrations
├── public/                # Static assets (images, fonts, etc.)
├── scripts/               # Helper scripts for development
├── docs/                  # Project documentation
├── assets/                # Additional project assets
├── node_modules/          # Dependencies (auto-generated, don't edit)
├── .next/                 # Next.js build output (auto-generated, don't edit)
└── .git/                  # Git version control
```

### Key Files in Root
- **package.json** - Dependencies and npm scripts
- **tsconfig.json** - TypeScript configuration
- **next.config.ts** - Next.js framework configuration
- **docker-compose.yml** - Docker container setup for local development
- **Dockerfile** - Production Docker build instructions
- **Dockerfile.dev** - Development Docker build instructions
- **.env** - Environment variables (local Supabase URLs, API keys)
- **.gitignore** - Files to exclude from Git
- **README.md** - Main project documentation and setup guide

---

## Source Code (`src/`)

The `src/` directory contains all application source code organized by feature and concern.

```
src/
├── app/                   # Next.js App Router (pages and routes)
├── assets/                # Static assets organized by feature
├── components/            # Reusable React components
├── constants/             # Application constants and configuration
├── context/               # React Context providers
├── hooks/                 # Custom React hooks
├── interfaces/            # TypeScript type definitions
├── lib/                   # Utility functions and shared code
├── providers/             # Provider components
├── services/              # API and external service integrations
├── store/                 # State management
├── test/                  # Test files
│   └── unit-tests/        # Unit test files
└── utils/                 # Helper functions and utilities
```

### `src/lib/` - Shared Utilities

Contains reusable utility functions and configurations.

**Files:**
- **supabase.ts** - Supabase client configuration
  - Creates the typed Supabase client
  - Reads environment variables for URL and API key
  - Used throughout the app to interact with the database

### `src/interfaces/` - Type Definitions

Contains TypeScript interfaces and types for the application.

```
interfaces/
└── User/
    └── User.ts           # User table types (Row, Insert, Update)
```

**Purpose:**
- Provides type safety for database operations
- Auto-generated from Supabase schema
- Use these types when working with database queries

**Example:**
```typescript
import { User, UserInsert, UserUpdate } from '@/src/interfaces/User/User';
```

### `src/assets/` - Static Assets

Contains static files organized by feature (images, icons, fonts, etc.).

**Purpose:**
- Feature-specific assets
- Organize by feature folder (e.g., `assets/home/`, `assets/user/`)
- Keep assets close to related code

**Example:**
```
assets/
├── home/
│   ├── hero-image.png
│   └── logo.svg
└── icons/
    └── arrow.svg
```

### `src/components/` - React Components

Reusable React components organized by feature or type.

**Purpose:**
- Shared UI components (buttons, forms, cards, modals)
- Feature-specific components (e.g., `home/HomeCard.tsx`)
- Keep components small and focused on a single responsibility

**Example structure:**
```
components/
├── home/
│   └── HomeCard.tsx
├── common/
│   ├── Button.tsx
│   └── Card.tsx
└── forms/
    └── LoginForm.tsx
```

**Usage:**
```typescript
import HomeCard from '@/src/components/home/HomeCard';
```

### `src/constants/` - Application Constants

Configuration values and constants used throughout the app.

**Purpose:**
- Define magic numbers and strings in one place
- Environment-agnostic configuration
- Type-safe constant values

**Example:**
```typescript
// constants/home.ts
export const HOME_CONSTANTS = {
  MAX_ITEMS: 10,
  DEFAULT_VIEW: "grid",
} as const;
```

**Usage:**
```typescript
import { HOME_CONSTANTS } from '@/src/constants/home';
```

### `src/context/` - React Context

React Context providers for global state management.

**Purpose:**
- Share state across component tree without prop drilling
- Provide global application state
- Combine with custom hooks for easy consumption

**Example:**
```typescript
// context/HomeContext.tsx
export function HomeProvider({ children }) {
  return <HomeContext.Provider value={...}>{children}</HomeContext.Provider>;
}

export function useHome() {
  const context = useContext(HomeContext);
  return context;
}
```

**Usage:**
```typescript
import { HomeProvider, useHome } from '@/src/context/HomeContext';
```

### `src/hooks/` - Custom React Hooks

Reusable React hooks for common logic and side effects.

**Purpose:**
- Extract and reuse stateful logic
- Data fetching hooks
- Form handling hooks
- Custom behavior hooks

**Example:**
```typescript
// hooks/useHomeData.ts
export function useHomeData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data
  }, []);

  return { data, loading };
}
```

**Usage:**
```typescript
import { useHomeData } from '@/src/hooks/useHomeData';

function MyComponent() {
  const { data, loading } = useHomeData();
}
```

### `src/lib/` - Shared Utilities

Low-level utility functions and configurations that don't fit elsewhere.

**Purpose:**
- Pure utility functions
- Data transformers
- Validators
- Configuration helpers

**Example:**
```typescript
// lib/home.ts
export function formatHomeData(data: any) {
  return data.map(item => ({
    ...item,
    formatted: true
  }));
}

export function validateHomeInput(input: string): boolean {
  return input.length > 0;
}
```

**When to use `lib/` vs `utils/`:**
- `lib/` - General-purpose utilities, data formatting
- `utils/` - Feature-specific helper functions

### `src/providers/` - Provider Components

High-level provider components that wrap parts of the application.

**Purpose:**
- Combine multiple contexts
- Third-party library providers
- Feature-level providers

**Example:**
```typescript
// providers/HomeProvider.tsx
export function HomeProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <DataProvider>
        {children}
      </DataProvider>
    </ThemeProvider>
  );
}
```

**Usage:**
```typescript
import { HomeProvider } from '@/src/providers/HomeProvider';

<HomeProvider>
  <App />
</HomeProvider>
```

### `src/services/` - External Services

API calls, database operations, and external service integrations.

**Purpose:**
- Supabase database queries
- External API calls
- Third-party service integrations
- Centralize data fetching logic

**Example:**
```typescript
// services/homeService.ts
import supabase from '@/src/lib/supabase';

export async function fetchHomeItems() {
  const { data, error } = await supabase
    .from('home_items')
    .select('*');

  if (error) throw error;
  return data;
}

export async function createHomeItem(item: any) {
  const { data, error } = await supabase
    .from('home_items')
    .insert(item);

  if (error) throw error;
  return data;
}
```

**Usage:**
```typescript
import { fetchHomeItems } from '@/src/services/homeService';

const items = await fetchHomeItems();
```

### `src/store/` - State Management

Global state management (Zustand, Redux, or custom stores).

**Purpose:**
- Application-wide state
- Complex state logic
- State that persists across routes

**Example:**
```typescript
// store/homeStore.ts
interface HomeState {
  items: any[];
  selectedItem: any | null;
}

export const homeStore = {
  items: [],
  selectedItem: null,
};
```

**When to use:**
- Use Context for simple, localized state
- Use Store for complex, global state

### `src/utils/` - Helper Functions

Feature-specific utility functions and helpers.

**Purpose:**
- Business logic helpers
- Feature-specific calculations
- Type guards and validators

**Example:**
```typescript
// utils/countHomeProps.tsx
import { HomeProps } from '@/src/interfaces/home/Home';

function countHomeProps({ property_a, property_b, property_c }: HomeProps) {
  let count = 0;
  if (property_a !== undefined) count++;
  if (property_b !== undefined) count++;
  if (property_c !== undefined) count++;
  return count;
}

export default countHomeProps;
```

**Usage:**
```typescript
import countHomeProps from '@/src/utils/countHomeProps';

const count = countHomeProps(props);
```

### `src/test/` - Test Files

All test files organized by test type.

**Structure:**
```
test/
└── unit-tests/            # Unit tests
    └── *.test.ts(x)       # Test files
```

**Purpose:**
- Unit tests for functions and components
- Integration tests
- Test utilities and mocks

**Example:**
```typescript
// test/unit-tests/countHomeProps.test.ts
import countHomeProps from '@/src/utils/countHomeProps';
import { HomeProps } from '@/src/interfaces/home/Home';

describe('countHomeProps', () => {
  it('should return 0 when all properties are undefined', () => {
    const props: HomeProps = {};
    expect(countHomeProps(props)).toBe(0);
  });
});
```

**Run tests:**
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

---

## Application Routes (`src/app/`)

Next.js uses file-system based routing. Each folder with a `page.tsx` file becomes a route.

```
app/
├── (clientside)/          # Route group for client-facing pages
├── (serverside)/          # Route group for server/driver pages
├── layout.tsx             # Root layout (wraps all pages)
├── globals.css            # Global CSS styles
├── globals.css.d.ts       # TypeScript types for CSS modules
└── page.tsx               # Home page (/)
```

### Route Groups

**Route groups** are folders wrapped in parentheses `(foldername)`. They organize routes without affecting the URL structure.

#### `(clientside)/` - Client-Facing Pages

Pages accessible to regular users (customers).

```
(clientside)/
├── help/
│   └── page.tsx          # /help - Help and support page
├── login/
│   └── page.tsx          # /login - User login page
├── my-returns/
│   └── page.tsx          # /my-returns - View user's returns
├── register/
│   └── page.tsx          # /register - New user registration
├── reset-password/
│   └── page.tsx          # /reset-password - Password reset
└── schedule-pickup/
    └── page.tsx          # /schedule-pickup - Schedule a return pickup
```

**URLs:**
- `/help`
- `/login`
- `/my-returns`
- `/register`
- `/reset-password`
- `/schedule-pickup`

#### `(serverside)/` - Driver/Admin Pages

Pages for drivers and internal staff.

```
(serverside)/
└── driver/
    └── order/
        └── [id]/
            └── page.tsx  # /driver/order/:id - Update order status
```

**URLs:**
- `/driver/order/123` - Update order with ID 123
- `/driver/order/abc-456` - Update order with ID abc-456

**Dynamic Routes:**
- `[id]` is a dynamic segment that captures the order ID from the URL
- Access the ID in the component via `params.id`

### Special Files

#### `layout.tsx` - Root Layout

The root layout wraps all pages in the application.

**Purpose:**
- Defines the HTML structure (`<html>`, `<body>`)
- Loads global fonts (Geist Sans, Geist Mono)
- Sets metadata (title, description)
- Contains elements that persist across page navigation

#### `page.tsx` - Route Pages

Each `page.tsx` file defines a route.

**Naming Convention:**
- Must be named exactly `page.tsx` (case-sensitive)
- Default export a React component
- Component name can be anything but should be descriptive

**Example:**
```typescript
export default function Login() {
  return <div>Login Page</div>;
}
```

---

## Database (`supabase/`)

Contains all database-related configuration and migrations.

```
supabase/
├── config.toml            # Supabase service configuration
├── migrations/            # Database migration SQL files
│   └── *.sql
├── seed.sql              # Initial data for development
├── types.ts              # Auto-generated TypeScript types
└── .branches/            # Supabase branching (ignore)
└── .temp/                # Temporary files (ignore)
```

### `migrations/` - Database Migrations

SQL files that define your database schema changes.

**How it works:**
1. Create a new migration: `npx supabase migration new your_migration_name`
2. Edit the generated `.sql` file with your changes
3. Apply migrations: `npm run supabase:reset`

**Example migration:**
```sql
-- 20251208223726_create_user_table.sql
CREATE TABLE public.user (
    user_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    email text NOT NULL UNIQUE,
    name text,
    created_at timestamptz DEFAULT now()
);
```

### `config.toml` - Supabase Configuration

Configures all Supabase services (ports, settings, auth providers, etc.)

**Key settings:**
- API port: 54321
- DB port: 54322
- Studio port: 54323
- JWT secrets
- Auth providers

### `types.ts` - Generated Types

Auto-generated TypeScript types from your database schema.

**Generate types:**
```bash
npm run supabase:generate-types
```

**Usage:**
```typescript
import { Database } from '@/supabase/types';
```

---

## Configuration Files

### TypeScript Configuration

**tsconfig.json**
- Configures TypeScript compiler options
- Sets up path aliases (`@/*` maps to root directory)
- Enables strict type checking

### Next.js Configuration

**next.config.ts**
- Configures Next.js build and runtime behavior
- Can add custom webpack config
- Configure environment variables, redirects, etc.

### Tailwind CSS Configuration

**tailwind.config.ts**
- Configures Tailwind CSS utility classes
- Currently empty (uses Tailwind defaults)
- Customize theme, colors, spacing here

**postcss.config.mjs**
- PostCSS configuration for CSS processing
- Integrates Tailwind CSS

### ESLint Configuration

**eslint.config.mjs**
- Linting rules for code quality
- Extends Next.js recommended rules
- Enforces code style and catches errors

### Docker Configuration

**docker-compose.yml**
- Defines Next.js app container for local development
- Mounts source code for hot reloading
- Connects to Supabase services

**Dockerfile.dev**
- Development container image
- Enables hot reloading
- Includes development dependencies

**Dockerfile**
- Production container image
- Optimized build
- Smaller image size

**.dockerignore**
- Files to exclude from Docker builds
- Similar to `.gitignore` but for Docker

---

## Development Workflow

### Adding a New Page

1. Create a folder in `src/app/(clientside)/` or `src/app/(serverside)/`
2. Add a `page.tsx` file
3. Export a default React component
4. The route is automatically available at the folder path

**Example:**
```typescript
// src/app/(clientside)/about/page.tsx
export default function About() {
  return <div>About Page</div>;
}
// Accessible at: /about
```

### Adding a New Component

1. Create a folder in `src/components/`
2. Create a `.tsx` file for your component
3. Export the component
4. Import and use in pages

**Example:**
```typescript
// src/components/Button/Button.tsx
export function Button({ children }: { children: React.ReactNode }) {
  return <button className="btn">{children}</button>;
}

// Usage in page
import { Button } from '@/src/components/Button/Button';
```

### Working with the Database

1. Create migration: `npx supabase migration new add_orders_table`
2. Edit SQL file in `supabase/migrations/`
3. Apply: `npm run supabase:reset`
4. Generate types: `npm run supabase:generate-types`
5. Create interface in `src/interfaces/`
6. Use types in your components

---

## Common Patterns

### Importing Files

**Use path aliases:**
```typescript
import supabase from '@/src/lib/supabase';
import { User } from '@/src/interfaces/User/User';
import { Database } from '@/supabase/types';
```

### Component Structure

```typescript
"use client"; // For client components with interactivity

import { useState, useEffect } from "react";

export default function MyPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data
  }, []);

  return <div>Content</div>;
}
```

### Database Queries

```typescript
import supabase from "@/src/lib/supabase";

// Select
const { data, error } = await supabase
  .from("user")
  .select("*");

// Insert
const { data, error } = await supabase
  .from("user")
  .insert({ email: "test@example.com", name: "Test" });

// Update
const { data, error } = await supabase
  .from("user")
  .update({ name: "Updated Name" })
  .eq("user_id", userId);
```

---

## Questions?

- Check the main [README.md](../README.md) for setup instructions
- Review [ADDING_TABLES.md](./ADDING_TABLES.md) for database workflows
- Ask your team lead for clarification

---

**Last Updated:** December 2024
