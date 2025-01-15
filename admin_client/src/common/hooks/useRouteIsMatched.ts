import { useMemo } from "react";
import { useMatch } from "react-router-dom";

export default function useRouteIsMatched(path: string) {
  const matchedPath = useMatch({
    path, // 可包含 :id 占位符的 URL 路径
    caseSensitive: false, // 是否严格按照大小写匹配
    end: false, // 是否需要整个 URL 路径名完全匹配
  });

  return useMemo<boolean>(() => {
    if (!path) return false;
    return matchedPath !== null;
  }, [matchedPath, path]);
}
