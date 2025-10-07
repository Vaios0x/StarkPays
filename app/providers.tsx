"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StarknetProvider } from "@/lib/starknet/provider";
import { ChipiProvider } from "@/lib/integrations/chipi/provider";
import { AVNUProvider } from "@/lib/integrations/avnu/provider";
import { PrivacyProvider } from "@/lib/integrations/privacy/provider";
import { BitcoinProvider } from "@/lib/integrations/bitcoin/provider";
import { GamingProvider } from "@/lib/integrations/gaming/provider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <StarknetProvider>
        <ChipiProvider>
          <AVNUProvider>
            <PrivacyProvider>
              <BitcoinProvider>
                <GamingProvider>
                  {children}
                </GamingProvider>
              </BitcoinProvider>
            </PrivacyProvider>
          </AVNUProvider>
        </ChipiProvider>
      </StarknetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
