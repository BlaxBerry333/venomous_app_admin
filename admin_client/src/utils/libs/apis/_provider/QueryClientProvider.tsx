import type { NamedExoticComponent, PropsWithChildren } from "react";
import { memo } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
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
