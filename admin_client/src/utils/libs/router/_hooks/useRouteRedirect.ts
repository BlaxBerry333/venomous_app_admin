import { useLayoutEffect } from "react";
import useRouteNavigate from "./useRouteNavigate";

export default function useRouteRedirect(condition: boolean, path: string) {
  const { replace } = useRouteNavigate();

  useLayoutEffect(() => {
    if (condition) {
      replace(path);
    }
  }, [condition, replace, path]);
}
