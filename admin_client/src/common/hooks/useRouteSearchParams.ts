import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export default function useRouteSearchParams<T extends Record<string, string>>() {
  const { search } = useLocation();

  return useMemo<T>(() => {
    const searchParams: URLSearchParams = new URLSearchParams(search);
    return Object.fromEntries(searchParams.entries()) as T;
  }, [search]);
}
