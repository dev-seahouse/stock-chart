import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { testingQueryOptions } from './testingQueryConfig';
import ThemeProvider from '@/providers/ThemeProvider';

/* for testing react hooks */
export const createWrapper = () => {
  const queryClient = new QueryClient(testingQueryOptions);

  // eslint-disable-next-line react/display-name
  return ({ children }: { children: ReactNode }) => (
    <ThemeProvider defaultTheme="light" storageKey="stock-chart-theme-test">
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ThemeProvider>
  );
};
