import { Database } from "@/supabase/types";

// Table interface with Row, Insert, and Update types
export interface UserTable {
  Row: Database["public"]["Tables"]["user"]["Row"];
  Insert: Database["public"]["Tables"]["user"]["Insert"];
  Update: Database["public"]["Tables"]["user"]["Update"];
}

// Convenience type exports
export type User = UserTable["Row"];
export type UserInsert = UserTable["Insert"];
export type UserUpdate = UserTable["Update"];
