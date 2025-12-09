# Adding New Tables to the Database

This guide walks you through adding a new table/schema to your Supabase database with full TypeScript type safety.

## Quick Reference

```bash
1. npx supabase migration new create_<table>_table
2. Edit migration SQL file
3. npm run supabase:reset
4. npm run supabase:generate-types
5. Create src/interfaces/<Table>.ts
6. Export from src/interfaces/index.ts
7. Use in your components!
```

---

## Detailed Step-by-Step Guide

### Step 1: Create a Migration

```bash
npx supabase migration new create_product_table
```

This creates a new file in `supabase/migrations/` with a timestamp:
```
supabase/migrations/20231208123456_create_product_table.sql
```

### Step 2: Write the SQL Migration

Edit the generated migration file with your table schema:

```sql
-- Create product table
CREATE TABLE IF NOT EXISTS public.product (
    product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INTEGER DEFAULT 0,
    user_id UUID REFERENCES public.user(user_id),  -- Foreign key example
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for performance (optional but recommended)
CREATE INDEX idx_product_user_id ON public.product(user_id);
CREATE INDEX idx_product_created_at ON public.product(created_at);
```

**Common Column Types:**
- `UUID` - Unique identifiers
- `VARCHAR(n)` - Short text (with max length)
- `TEXT` - Long text (unlimited)
- `INTEGER` - Whole numbers
- `DECIMAL(p, s)` - Precise decimals (e.g., prices)
- `BOOLEAN` - true/false
- `TIMESTAMP WITH TIME ZONE` - Dates with timezone
- `JSONB` - JSON data (searchable)

### Step 3: Apply the Migration

```bash
npm run supabase:reset
```

This will:
- Drop and recreate your local database
- Apply ALL migrations in order
- Run seed data from `supabase/seed.sql`

**Note:** This resets your entire local database. If you only want to apply new migrations without losing data, use:
```bash
npm run supabase:migrate
```

### Step 4: Regenerate TypeScript Types

```bash
npm run supabase:generate-types
```

This updates `src/database/database.types.ts` with types for your new table.

### Step 5: Create TypeScript Interface

Create `src/interfaces/Product.ts`:

```typescript
import { Database } from "../database";

// Row type - what you get when you query the table
export type Product = Database["public"]["Tables"]["product"]["Row"];

// Insert type - what you need to insert a new row
export type ProductInsert = Database["public"]["Tables"]["product"]["Insert"];

// Update type - what you can update on an existing row
export type ProductUpdate = Database["public"]["Tables"]["product"]["Update"];
```

**Understanding the Types:**

- **`Product`** (Row): All fields as they come from the database
  ```typescript
  {
    product_id: string;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    user_id: string | null;
    created_at: string;
    updated_at: string;
  }
  ```

- **`ProductInsert`**: Fields needed to insert (optional fields with defaults)
  ```typescript
  {
    product_id?: string;        // Optional (has DEFAULT)
    name: string;                // Required
    description?: string | null; // Optional
    price: number;               // Required
    stock?: number;              // Optional (has DEFAULT)
    user_id?: string | null;     // Optional
    created_at?: string;         // Optional (has DEFAULT)
    updated_at?: string;         // Optional (has DEFAULT)
  }
  ```

- **`ProductUpdate`**: All fields optional for updates
  ```typescript
  {
    product_id?: string;
    name?: string;
    description?: string | null;
    price?: number;
    stock?: number;
    user_id?: string | null;
    created_at?: string;
    updated_at?: string;
  }
  ```

### Step 6: Export from Index

Update `src/interfaces/index.ts`:

```typescript
export * from './User';
export * from './Product';  // Add this line
```

### Step 7: Use in Your Application

Now you can use your fully-typed table:

```typescript
import { Product, ProductInsert, ProductUpdate } from "@/src/interfaces";
import supabase from "@/src/lib/supabase";

// ✅ Query - fully typed response
const [products, setProducts] = useState<Product[]>([]);

const { data, error } = await supabase
  .from("product")
  .select("*");

if (data) {
  setProducts(data);  // TypeScript knows this is Product[]

  // Full autocomplete:
  data[0].product_id  // ✅
  data[0].name        // ✅
  data[0].price       // ✅
  data[0].xyz         // ❌ TypeScript error - field doesn't exist
}

// ✅ Insert - type-safe
const newProduct: ProductInsert = {
  name: "Widget",
  price: 19.99,
  stock: 100,
  // TypeScript ensures you don't forget required fields
};

const { data: inserted } = await supabase
  .from("product")
  .insert(newProduct)
  .select()
  .single();

// ✅ Update - type-safe
const update: ProductUpdate = {
  stock: 95,
  price: 18.99,
};

await supabase
  .from("product")
  .update(update)
  .eq("product_id", productId);

// ✅ Delete
await supabase
  .from("product")
  .delete()
  .eq("product_id", productId);
```

---

## Working with Relationships

### Adding Foreign Keys

When creating relationships between tables:

```sql
-- Add foreign key to existing table
ALTER TABLE public.product
ADD COLUMN user_id UUID REFERENCES public.user(user_id) ON DELETE CASCADE;
```

**ON DELETE options:**
- `CASCADE` - Delete products when user is deleted
- `SET NULL` - Set user_id to NULL when user is deleted
- `RESTRICT` - Prevent user deletion if they have products

### Querying with Joins

```typescript
// Query with related data
const { data } = await supabase
  .from("product")
  .select(`
    *,
    user:user_id (
      user_id,
      name,
      email
    )
  `);

// TypeScript infers the shape including nested user object!
if (data) {
  data[0].name;       // Product name
  data[0].user.name;  // User name (joined)
}
```

---

## Adding Seed Data

Update `supabase/seed.sql` to include sample data for your new table:

```sql
-- Seed products
INSERT INTO public.product (name, description, price, stock) VALUES
    ('Widget', 'A useful widget', 19.99, 100),
    ('Gadget', 'An amazing gadget', 29.99, 50),
    ('Doohickey', 'A mysterious doohickey', 9.99, 200)
ON CONFLICT DO NOTHING;
```

Then run:
```bash
npm run supabase:reset
```

---

## Common Patterns

### UUID Primary Keys

```sql
product_id UUID PRIMARY KEY DEFAULT gen_random_uuid()
```

### Auto-Updated Timestamps

```sql
-- Create trigger function (once per database)
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to table
CREATE TRIGGER update_product_updated_at
    BEFORE UPDATE ON public.product
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();
```

### Soft Deletes

```sql
ALTER TABLE public.product
ADD COLUMN deleted_at TIMESTAMP WITH TIME ZONE;

-- Query only non-deleted items
SELECT * FROM product WHERE deleted_at IS NULL;
```

### Enums

```sql
-- Create enum type
CREATE TYPE product_status AS ENUM ('draft', 'active', 'archived');

-- Use in table
ALTER TABLE public.product
ADD COLUMN status product_status DEFAULT 'draft';
```

After adding enums, regenerate types and they'll appear in your TypeScript:

```typescript
type ProductStatus = Database["public"]["Enums"]["product_status"];
// "draft" | "active" | "archived"
```

---

## Best Practices

### 1. Always Use Migrations

❌ **Don't** modify the database directly in Supabase Studio
✅ **Do** create a migration file for every schema change

### 2. Name Conventions

- **Tables**: Singular, lowercase (e.g., `product`, not `products`)
- **Columns**: snake_case (e.g., `created_at`, not `createdAt`)
- **Primary Keys**: `{table}_id` (e.g., `product_id`)
- **Foreign Keys**: Reference the target column name (e.g., `user_id`)

### 3. Indexes

Add indexes for:
- Foreign keys
- Frequently queried columns
- Columns used in WHERE clauses

```sql
CREATE INDEX idx_product_user_id ON public.product(user_id);
CREATE INDEX idx_product_created_at ON public.product(created_at);
```

### 4. Not Null Constraints

Be explicit about nullable columns:

```sql
name VARCHAR(255) NOT NULL,        -- Required
description TEXT,                   -- Optional (NULL allowed)
```

### 5. Regenerate Types After Every Migration

Make it a habit:
```bash
npm run supabase:reset && npm run supabase:generate-types
```

---

## Troubleshooting

### "Table doesn't exist" Error

1. Ensure migration was applied: `npm run supabase:status`
2. Check migration file syntax
3. Try: `npm run supabase:reset`

### Types Not Updating

1. Regenerate: `npm run supabase:generate-types`
2. Restart your TypeScript server (VS Code: `Cmd+Shift+P` → "Restart TS Server")
3. Check that `src/database/database.types.ts` was updated

### Foreign Key Errors

Ensure referenced table exists first:
```sql
-- ❌ Error: user table doesn't exist yet
CREATE TABLE product (
  user_id UUID REFERENCES user(user_id)
);

-- ✅ Correct order
-- Migration 1: Create user table
-- Migration 2: Create product table with user_id FK
```

---

## Example: Complete Table Addition

Let's add an `order` table that references both `user` and `product`:

```bash
# 1. Create migration
npx supabase migration new create_order_table
```

```sql
-- 2. Edit migration file
CREATE TABLE IF NOT EXISTS public.order (
    order_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.user(user_id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES public.product(product_id) ON DELETE RESTRICT,
    quantity INTEGER NOT NULL DEFAULT 1,
    total_price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_order_user_id ON public.order(user_id);
CREATE INDEX idx_order_product_id ON public.order(product_id);
CREATE INDEX idx_order_status ON public.order(status);
```

```bash
# 3. Apply migration and regenerate types
npm run supabase:reset
npm run supabase:generate-types
```

```typescript
// 4. Create src/interfaces/Order.ts
import { Database } from "../database";

export type Order = Database["public"]["Tables"]["order"]["Row"];
export type OrderInsert = Database["public"]["Tables"]["order"]["Insert"];
export type OrderUpdate = Database["public"]["Tables"]["order"]["Update"];
```

```typescript
// 5. Export from src/interfaces/index.ts
export * from './User';
export * from './Product';
export * from './Order';
```

```typescript
// 6. Use in application
import { Order } from "@/src/interfaces";

// Query orders with user and product data
const { data: orders } = await supabase
  .from("order")
  .select(`
    *,
    user:user_id (name, email),
    product:product_id (name, price)
  `);

// Fully typed!
orders[0].order_id;
orders[0].user.name;
orders[0].product.price;
```

Done! 🎉
