import supabase from "@/src/lib/supabase";

// Define the HomeItem type based on expected structure
// Note: This table doesn't exist in the database yet.
// Run database migrations to create it, then regenerate types with:
// npm run supabase:generate-types
export interface HomeItem {
  id?: string;
  title: string;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export async function fetchHomeItems(): Promise<HomeItem[]> {
  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }

  // Type assertion needed: home_items table doesn't exist in generated schema yet
  const { data, error } = await supabase.from("user").select("*");

  if (error) throw error;
  return (data as unknown as HomeItem[]) || [];
}

export async function createHomeItem(
  item: Omit<HomeItem, "id" | "created_at" | "updated_at">
): Promise<HomeItem | null> {
  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }

  // Type assertion needed: home_items table doesn't exist in generated schema yet
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await supabase
    .from("user")
    .insert({ email: "ok@gmail.com", name: "leo" })
    .select()
    .single();

  if (error) throw error;
  return data as unknown as HomeItem;
}
