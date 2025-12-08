"use client";

import supabase from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Home() {
  const [users, setUsers] = useState<Record<string, unknown>[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      const { data, error } = await supabase.from("user").select("*");
      if (error) setError(error);
      if (data) setUsers(data);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full">
          <h1 className="text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50 mb-8">
            Supabase Users Test
          </h1>

          {loading && (
            <p className="text-zinc-600 dark:text-zinc-400">Loading...</p>
          )}

          {error && (
            <div className="p-4 mb-4 bg-red-100 border border-red-400 text-red-700 rounded">
              Error: {error.message}
            </div>
          )}

          {!loading && users && users.length > 0 ? (
            <div className="space-y-4">
              {users.map((user, index) => (
                <div
                  key={user.user_id as string || index}
                  className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg"
                >
                  <pre className="text-sm text-zinc-800 dark:text-zinc-200 overflow-auto">
                    {JSON.stringify(user, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-zinc-600 dark:text-zinc-400">
              No users found in the database.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
