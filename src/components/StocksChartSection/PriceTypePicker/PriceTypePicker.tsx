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

interface PriceTypePickerProps {
  priceType: StockPriceType;
  onPriceTypeChange: (type: StockPriceType) => void;
}

function PriceTypePicker({
  priceType,
  onPriceTypeChange,
}: PriceTypePickerProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`
            mt-4 flex w-full items-center gap-2 text-gray-800

            dark:text-gray-200

            md:mt-0 md:w-auto
          `}
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
          <DropdownMenuRadioItem
            value="open"
            className={`
              text-gray-800

              dark:text-gray-200
            `}
          >
            Open
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="high"
            className={`
              text-gray-800

              dark:text-gray-200
            `}
          >
            High
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="low"
            className={`
              text-gray-800

              dark:text-gray-200
            `}
          >
            Low
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="close"
            className={`
              text-gray-800

              dark:text-gray-200
            `}
          >
            Close
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PriceTypePicker;
