import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { QueryClient } from '@tanstack/react-query';
import { render, type RenderOptions } from '@testing-library/react';
import type React from 'react';

import ThemeProvider from '@/providers/ThemeProvider';
import { testingQueryOptions } from './testingQueryConfig';

interface RenderWithProvidersOptions extends Omit<RenderOptions, 'warpper'> {
  queryClient?: QueryClient;
}

/**
Why render twice? @see https://github.com/TanStack/query/blob/ead2e5dd5237f3d004b66316b5f36af718286d2d/src/react/tests/utils.tsx#L6-L17
1. The `renderWithProviders` function is called with a UI component and some options.
2. The UI component is rendered inside a `ReactQueryProvider` (which should be `QueryClientProvider` based on the context) 
and the result of the render (including various utility functions like `rerender`) is stored.
3. A new object is returned that includes all the original render result utilities, but with a modified `rerender` function.
4. This modified `rerender` function takes a new UI component, and re-renders it inside the `QueryClientProvider`. 
This ensures that the component is always rendered with the necessary context, even when it is re-rendered with new props.
 */
export function renderWithProviders(
  ui: React.ReactElement,
  options?: RenderWithProvidersOptions,
) {
  // each test its own QueryClientProvider and create a new QueryClient for each test.
  //  That way, tests are completely isolated from each other.
  const client = options?.queryClient ?? new QueryClient(testingQueryOptions);
  const { rerender, ...result } = render(
    <ThemeProvider defaultTheme="light" storageKey="stock-chart-theme-test">
      <ReactQueryProvider overrideQueryClient={client}>{ui}</ReactQueryProvider>
    </ThemeProvider>,
    options,
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <ThemeProvider defaultTheme="light" storageKey="stock-chart-theme-test">
          <ReactQueryProvider overrideQueryClient={client}>
            {rerenderUi}
          </ReactQueryProvider>
        </ThemeProvider>,
      ),
  };
}

export default renderWithProviders;
