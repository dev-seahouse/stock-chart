import { expect, it } from 'vitest';
import App from './App';
import renderWithProviders from './testing/renderWithProviders';
import { screen } from '@testing-library/react';

// smoke test
it('should render without error', () => {
  renderWithProviders(<App />);
});

it('should render app name', () => {
  renderWithProviders(<App />);
  expect(screen.getByText(/stock price chart/i)).toBeVisible();
});
