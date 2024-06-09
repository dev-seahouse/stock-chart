import renderWithProviders from '@/testing/renderWithProviders';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import StocksPriceChart from './StocksPriceChart';
import { renderHook, screen, waitFor } from '@testing-library/react';
import useStockPriceChartQuery from './StocksPriceChart.hooks';
import { createWrapper } from '@/testing/createWrapper';
import { appleStockAggregates } from '@/mocks/aggregates.mock';
import userEvent from '@testing-library/user-event';

describe('StocksPriceChart.tsx', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterAll(() => {
    vi.resetModules();
  });

  // smoke test
  it('renders without error', () => {
    renderWithProviders(
      <StocksPriceChart
        selectedTickers={['AAPL']}
        priceType="open"
        dateRange={{ start: '2023-01-01', end: '2024-06-22' }}
      />,
    );
  });

  it('renders with mocked Highcharts', async () => {
    vi.mock('highcharts-react-official', () => ({
      __esModule: true,
      default: () => <div>Highcharts Mock</div>,
    }));
    renderWithProviders(
      <StocksPriceChart
        selectedTickers={['AAPL']}
        dateRange={{ start: '2023-01-01', end: '2024-01-01' }}
        priceType="open"
      />,
    );

    expect(await screen.findByText(/highcharts mock/i)).toBeInTheDocument();
  });

  it('displays error and allows retry on failure', async () => {
    const mockRefetch = vi.fn();
    vi.doMock('./StocksPriceChart.hooks', () => ({
      __esModule: true,
      default: () => [
        { isError: true, refetch: mockRefetch, isLoading: false },
      ],
    }));

    // Re-import the component after mocking
    const { default: MockedStocksPriceChart } = await import(
      './StocksPriceChart'
    );

    renderWithProviders(
      <MockedStocksPriceChart
        selectedTickers={['AAPL']}
        dateRange={{ start: '2023-01-01', end: '2024-01-01' }}
        priceType="open"
      />,
    );

    expect(await screen.findByText(/error loading data/i)).toBeVisible();

    const retryButton = screen.getByRole('button', { name: /retry/i });
    expect(retryButton).toBeVisible();

    await userEvent.click(retryButton);
    expect(mockRefetch).toHaveBeenCalled();
  });
});

describe('StocksPriceChart.hooks.ts', () => {
  afterAll(() => {
    vi.clearAllMocks();
  });

  it('should fetch and return stocks data', async () => {
    const { result } = renderHook(
      () =>
        useStockPriceChartQuery(
          ['AAPL'],
          { start: '2023-12-10', end: '2024-01-10' },
          'close',
        ),
      { wrapper: createWrapper() },
    );

    await waitFor(() =>
      result.current.every((query) => expect(query.isSuccess).toBe(true)),
    );

    expect(result.current[0].data).toEqual(
      appleStockAggregates.results.map((point) => ({
        x: point.t,
        y: point.c,
        ticker: 'AAPL',
      })),
    );
  });
});
