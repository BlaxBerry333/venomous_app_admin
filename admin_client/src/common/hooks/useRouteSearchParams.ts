import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

export default function useRouteSearchParams<T extends Record<string, string>>(props?: {
  callback: (searchParams: T) => Promise<void>;
}): T {
  const { search } = useLocation();

  const searchParams = useMemo<T>(() => {
    const _searchParams: URLSearchParams = new URLSearchParams(search);
    return Object.fromEntries(_searchParams.entries()) as T;
  }, [search]);

  // ----------------------------------------------------------------------------------------------------

  const callback = props?.callback;

  useEffect(() => {
    if (!callback) return;
    callback(searchParams);
  }, [searchParams, callback]);

  // ----------------------------------------------------------------------------------------------------

  return searchParams;
}
