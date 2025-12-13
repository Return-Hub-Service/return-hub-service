import supabase from "@/src/lib/supabase";

export async function fetchHomeItems() {
  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }

  const { data, error } = await supabase.from("home_items").select("*");

  if (error) throw error;
  return data;
}

export async function createHomeItem(item: any) {
  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }

  const { data, error } = await supabase.from("home_items").insert(item);

  if (error) throw error;
  return data;
}
