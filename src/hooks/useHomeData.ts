"use client";

import { useState, useEffect } from "react";

export function useHomeData() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Fetch home data logic here
    setLoading(false);
  }, []);

  return { data, loading, error };
}
