import { expect, it } from 'vitest';
import MainErrorFallback from '@/components/MainErrorFallBack/MainErrorFallback.tsx';
import { render, screen } from '@testing-library/react';

it('should render without error', () => {
  render(<MainErrorFallback />);
});

it('displays error message', () => {
  render(<MainErrorFallback />);
  expect(screen.getByText('Ooops, something went wrong :(')).toBeVisible();
});

it('shuould has refresh button', () => {
  render(<MainErrorFallback />);
  expect(screen.getByRole('button', { name: /refresh/i })).toBeVisible();
});
