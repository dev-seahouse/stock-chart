import { useState } from 'react';
import { DateTime } from 'luxon';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/lib/components/Popover.tsx';
import { Calendar } from '@/lib/components/Calendar.tsx';
import { Button } from '@/lib/components/Button.tsx';
import { CalendarDaysIcon } from 'lucide-react';
import { cn } from '@/lib/utils.ts';

interface DateRangePickerProps {
  dateRange: { start: Date; end: Date };
  onDateChange: (start: Date, end: Date) => void;
  disableFuture?: boolean;
  className?: string;
}

function DateRangePicker({
  dateRange,
  onDateChange,
  disableFuture = true,
}: DateRangePickerProps) {
  const [isFromPopoverOpen, setIsFromPopoverOpen] = useState(false);
  const [isToPopoverOpen, setIsToPopoverOpen] = useState(false);

  const handleFromDateChange = (newFromDate: Date | undefined) => {
    if (!newFromDate) return;
    const newEndDate =
      newFromDate > dateRange.end ? newFromDate : dateRange.end;
    onDateChange(newFromDate, newEndDate);
    setIsFromPopoverOpen(false);
  };

  const handleToDateChange = (newToDate: Date | undefined) => {
    if (!newToDate) return;
    const newStartDate =
      newToDate < dateRange.start ? newToDate : dateRange.start;
    onDateChange(newStartDate, newToDate);
    setIsToPopoverOpen(false);
  };

  return (
    <div
      className={cn(
        `
          flex w-full items-center gap-2

          md:w-auto
        `,
      )}
    >
      <Popover open={isFromPopoverOpen} onOpenChange={setIsFromPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`
              flex w-full items-center gap-2 text-gray-800

              dark:text-gray-200

              md:w-auto
            `}
            onClick={() => setIsFromPopoverOpen(true)}
          >
            <CalendarDaysIcon
              className={`
                size-4 text-gray-500

                dark:text-gray-400
              `}
            />
            {DateTime.fromJSDate(dateRange.start).toFormat('dd/MM/yyyy')}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-[276px] p-0">
          <Calendar
            selected={dateRange.start}
            mode="single"
            onSelect={handleFromDateChange}
            toDate={disableFuture ? DateTime.now().toJSDate() : undefined}
          />
        </PopoverContent>
      </Popover>
      <span
        className={`
          text-gray-800

          dark:text-gray-200
        `}
      >
        to
      </span>
      <Popover open={isToPopoverOpen} onOpenChange={setIsToPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`
              flex w-full items-center gap-2 text-gray-800

              dark:text-gray-200

              md:w-auto
            `}
            onClick={() => setIsToPopoverOpen(true)}
          >
            <CalendarDaysIcon
              className={`
                size-4 text-gray-500

                dark:text-gray-400
              `}
            />
            {DateTime.fromJSDate(dateRange.end).toFormat('dd/MM/yyyy')}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="max-w-[276px] p-0">
          <Calendar
            selected={dateRange.end}
            mode="single"
            onSelect={handleToDateChange}
            toDate={disableFuture ? DateTime.now().toJSDate() : undefined}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateRangePicker;
