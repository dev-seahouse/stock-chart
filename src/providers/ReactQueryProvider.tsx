import {
  QueryClient,
  QueryClientProvider,
  type DefaultOptions,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { PropsWithChildren } from 'react';

export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
  },
} satisfies DefaultOptions;

export const queryClient = new QueryClient({
  defaultOptions: queryConfig,
});

export function ReactQueryProvider({
  children,
  overrideQueryClient, // for tests
}: PropsWithChildren & { overrideQueryClient?: QueryClient }) {
  return (
    <QueryClientProvider client={overrideQueryClient ?? queryClient}>
      <>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </>
    </QueryClientProvider>
  );
}
export default ReactQueryProvider;
