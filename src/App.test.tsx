import { describe, expect, it } from 'vitest';
import App from './App';
import renderWithProviders from './testing/renderWithProviders';
import { screen } from '@testing-library/react';

describe('App.tsx', () => {
  // smoke test
  it('should render without error', () => {
    renderWithProviders(<App />);
  });

  it('should render app name', () => {
    renderWithProviders(<App />);
    const appName = import.meta.env.VITE_APP_TITLE;
    expect(screen.getByText(appName)).toBeVisible();
  });
});
