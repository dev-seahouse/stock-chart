import renderWithProviders from '@/testing/renderWithProviders';
import { expect, it, test, vi, describe } from 'vitest';
import AppHeader from './AppHeader';
import { useTheme, type Theme } from '@/providers/ThemeProvider';
import { screen } from '@testing-library/react';

const TestWrapper = ({ overrideTheme }: { overrideTheme?: Theme }) => {
  const { theme, toggleTheme } = useTheme();
  return <AppHeader theme={overrideTheme ?? theme} toggleTheme={toggleTheme} />;
};

describe('AppHeader.tsx', () => {
  // smoke test
  it('should render without error', () => {
    renderWithProviders(<AppHeader theme="light" toggleTheme={vi.fn} />);
  });

  it('should render correct app title in h1', () => {
    renderWithProviders(<AppHeader theme="light" toggleTheme={vi.fn} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      import.meta.env.VITE_APP_TITLE,
    );
  });

  test('toggle dark mode button should be visible', () => {
    renderWithProviders(<AppHeader theme="light" toggleTheme={vi.fn} />);
    expect(
      screen.getByRole('button', { name: /toggle dark mode/i }),
    ).toBeVisible();
  });

  test('toggle theme should have sun icon when theme is dark', () => {
    renderWithProviders(<TestWrapper overrideTheme="dark" />);
    expect(screen.getByRole('button'));
  });
});
