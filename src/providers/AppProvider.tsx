import type { PropsWithChildren } from 'react';
import ThemeProvider from './ThemeProvider';
import ReactQueryProvider from './ReactQueryProvider';
import { ErrorBoundary } from 'react-error-boundary';
import MainErrorFallback from '@/components/MainErrorFallback';

function AppProvider({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary FallbackComponent={MainErrorFallback}>
      <ReactQueryProvider>
        <ThemeProvider defaultTheme="light" storageKey="stock-chart-theme">
          {children}
        </ThemeProvider>
      </ReactQueryProvider>
    </ErrorBoundary>
  );
}

export default AppProvider;
