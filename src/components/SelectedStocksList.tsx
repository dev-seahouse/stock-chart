import { X } from 'lucide-react';
import { Button } from '@/lib/components/Button.tsx';
import { StocksSelectOption } from '@/components/StocksAsyncSelect.tsx';

interface SelectedStocksListProps {
  selectedStocks: StocksSelectOption[];
  handleDeselectStock: (stock: StocksSelectOption) => void;
}

function NoStocksSelected() {
  return (
    <div
      className={`
        mt-5 text-gray-500

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
}: SelectedStocksListProps) {
  if (!selectedStocks?.length) return <NoStocksSelected />;

  return (
    <ul className="space-y-2">
      {selectedStocks.map((stock) => (
        <li
          key={stock.value}
          className={`
            flex items-center justify-between text-gray-800

            dark:text-gray-200
          `}
        >
          {stock.label}
          <Button
            onClick={() => handleDeselectStock(stock)}
            variant="ghost"
            size="icon"
          >
            <X
              className={`
                size-4 text-gray-500

                dark:text-gray-400
              `}
            />
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default SelectedStocksList;
