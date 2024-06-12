import { BarChartIcon } from 'lucide-react';
import { Button } from '@/lib/components/Button.tsx';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/lib/components/DropdownMenu.tsx';
import type { StockPriceType } from './PriceTypePicker.types.ts';
import { cn } from '@/lib/utils.ts';

interface PriceTypePickerProps {
  priceType: StockPriceType;
  onPriceTypeChange: (type: StockPriceType) => void;
  className?: string;
}

const priceTypes = ['Open', 'High', 'Low', 'Close'];

function PriceTypePicker({
  priceType,
  onPriceTypeChange,
  className,
}: PriceTypePickerProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            `
              flex items-center gap-2 text-gray-800

              dark:text-gray-200
            `,
            className,
          )}
        >
          <BarChartIcon
            className={`
              size-4 text-gray-500

              dark:text-gray-400
            `}
          />
          {priceType.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={priceType}
          //   libray typescirpt bug? should be generic
          onValueChange={onPriceTypeChange as () => void}
        >
          {priceTypes.map((type) => (
            <DropdownMenuRadioItem
              value={type.toLowerCase()}
              key={type}
              className={`
                text-gray-800

                dark:text-gray-200
              `}
            >
              {type}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PriceTypePicker;
