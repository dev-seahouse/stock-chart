import AppHeader from '@/components/AppHeader/AppHeader';
import { useTheme } from '@/providers/ThemeProvider';
import type { PropsWithChildren } from 'react';

/**
 * App Layout
 */
function AppLayout({ children }: PropsWithChildren) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex h-dvh flex-col">
      <AppHeader theme={theme} toggleTheme={toggleTheme} />
      {children}
    </div>
  );
}

// bubble sort

export default AppLayout;
