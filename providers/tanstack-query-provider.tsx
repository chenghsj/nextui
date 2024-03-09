"use client";

import React, { useState } from "react";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function TanstackQueryProvider({ children }: any) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration>
          {children}
        </ReactQueryStreamedHydration>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export { TanstackQueryProvider };