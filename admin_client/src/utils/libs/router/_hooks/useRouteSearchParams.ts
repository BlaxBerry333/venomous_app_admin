import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

type SearchParams = Record<string, string>;

type Props<T extends SearchParams> = {
  callback: (searchParams: T) => Promise<void>;
};

export default function useRouteSearchParams<S extends SearchParams>(props?: Props<S>): S {
  const { search } = useLocation();

  const searchParams = useMemo<S>(() => {
    const _searchParams: URLSearchParams = new URLSearchParams(search);
    return Object.fromEntries(_searchParams.entries()) as S;
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
