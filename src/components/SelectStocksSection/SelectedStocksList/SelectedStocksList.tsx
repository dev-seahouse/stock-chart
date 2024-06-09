import { X } from 'lucide-react';
import { Button } from '@/lib/components/Button.tsx';
import type { StocksSelectOption } from '@/components/SelectStocksSection/StocksAsyncSelect/StocksAsyncSelect.types.ts';
import Paper from '@/lib/components/Paper.tsx';

interface SelectedStocksListProps {
  selectedStocks: StocksSelectOption[];
  handleDeselectStock: (stock: StocksSelectOption) => void;
  maxSelectableStocks: number;
}

function NoStocksSelected() {
  return (
    <div
      className={`
        text-gray-500

        dark:text-gray-400
      `}
    >
      No stocks selected.
    </div>
  );
}

function SelectedStocksList({
  selectedStocks,
  handleDeselectStock,
  maxSelectableStocks,
}: SelectedStocksListProps) {
  if (!selectedStocks?.length)
    return (
      <Paper>
        <NoStocksSelected />
      </Paper>
    );

  return (
    <Paper className="mt-4 p-4">
      <ul className="space-y-2">
        {selectedStocks.map((stock) => (
          <li
            key={stock.value}
            className={`
              flex items-center justify-between rounded-lg bg-gray-100 p-3

              dark:bg-gray-700
            `}
          >
            <div className="flex flex-1 items-center gap-3 overflow-hidden">
              <div
                className={`
                  flex size-8 shrink-0 items-center justify-center rounded-full
                  bg-gray-300 font-bold text-gray-800

                  dark:bg-gray-600 dark:text-gray-200
                `}
              >
                {stock.label.charAt(0).toUpperCase()}
              </div>
              <div
                className={`
                  text-gray-800

                  dark:text-gray-200
                `}
              >
                {stock.label}
              </div>
            </div>
            <Button
              onClick={() => handleDeselectStock(stock)}
              variant="ghost"
              size="icon"
            >
              <X
                className={`
                  size-5 text-gray-700

                  dark:text-gray-100
                `}
              />
              <div className="sr-only">Remove {stock.label}</div>
            </Button>
          </li>
        ))}
        {selectedStocks?.length === maxSelectableStocks && (
          <div
            className={`
              mt-4 text-gray-500

              dark:text-gray-400
            `}
          >
            You can only select up to 3 stocks. To select more, please deselect
            one of the current selections.
          </div>
        )}
      </ul>
    </Paper>
  );
}

export default SelectedStocksList;
