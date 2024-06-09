import renderWithProviders from '@/testing/renderWithProviders.tsx';
import { describe, expect, it, vi } from 'vitest';
import StocksAsyncSelect from './StocksAsyncSelect.tsx';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('StocksAsyncSelect', () => {
  // smoke test
  it('should render without error', () => {
    renderWithProviders(<StocksAsyncSelect onChange={vi.fn} />);
  });

  it('fetches and displays options based on user input', async () => {
    renderWithProviders(<StocksAsyncSelect onChange={vi.fn} />);

    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'Apple');

    await waitFor(() => {
      expect(screen.getByText('Apple Inc. (AAPL)')).toBeInTheDocument();
    });
  });

  it('handles no result correctly', async () => {
    renderWithProviders(<StocksAsyncSelect onChange={vi.fn} />);
    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'asdasdasdasdasdasd');

    await waitFor(() => {
      expect(screen.queryByText(/Apple Inc./i)).not.toBeInTheDocument();
    });
  });

  it('uses cached data', async () => {
    renderWithProviders(<StocksAsyncSelect onChange={vi.fn()} />);

    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'Apple');

    await screen.findByText('Apple Inc. (AAPL)');

    await userEvent.clear(input);
    await userEvent.type(input, 'Apple');

    await screen.findByText('Apple Inc. (AAPL)');
  });

  it('handles API errors correctly', async () => {
    renderWithProviders(<StocksAsyncSelect onChange={vi.fn()} />);

    const input = screen.getByRole('combobox');
    await userEvent.type(input, 'error');

    await waitFor(() => {
      expect(
        screen.getByText(/Please wait before searching again./i),
      ).toBeInTheDocument();
    });
  });
});
