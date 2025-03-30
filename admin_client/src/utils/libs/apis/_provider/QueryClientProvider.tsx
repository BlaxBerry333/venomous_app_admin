import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60 * 1,
      gcTime: 1000 * 60 * 5,
    },
    mutations: {
      retry: false,
    },
  },
});

const CustomQueryClientProvider: NamedExoticComponent<PropsWithChildren> = memo(({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* Devtools */}
      {process.env.NODE_ENV !== "production" && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      )}

      {children}
    </QueryClientProvider>
  );
});

export default CustomQueryClientProvider;
