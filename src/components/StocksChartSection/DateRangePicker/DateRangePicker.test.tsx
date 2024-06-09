import { expect, it, vi } from 'vitest';
import DateRangePicker from '@/components/StocksChartSection/DateRangePicker/DateRangePicker.tsx';
import { render, screen } from '@testing-library/react';
import { DateTime } from 'luxon';
import userEvent from '@testing-library/user-event';

const mockOnDateChange = vi.fn();

const initialDateRange = {
  start: new Date(2023, 11, 10), // December 10, 2023
  end: new Date(2023, 11, 20), // December 20, 2023
};

const renderComp = (disableFuture = false) =>
  render(
    <DateRangePicker
      dateRange={initialDateRange}
      onDateChange={mockOnDateChange}
      disableFuture={disableFuture}
    />,
  );

// smoke test
it('should render without error', () => {
  render(
    <DateRangePicker
      dateRange={initialDateRange}
      onDateChange={mockOnDateChange}
    />,
  );
});

it('should display the initial date range', () => {
  renderComp();
  const startDateButton = screen.getByRole('button', {
    name: DateTime.fromJSDate(initialDateRange.start).toFormat('dd/MM/yyyy'),
  });
  const endDateButton = screen.getByRole('button', {
    name: DateTime.fromJSDate(initialDateRange.end).toFormat('dd/MM/yyyy'),
  });

  expect(startDateButton).toBeVisible();
  expect(endDateButton).toBeVisible();
});

it('should open the from date popover when the start date button is clicked', async () => {
  renderComp();
  const startDateButton = screen.getByRole('button', {
    name: DateTime.fromJSDate(initialDateRange.start).toFormat('dd/MM/yyyy'),
  });
  await userEvent.click(startDateButton);

  expect(screen.getByRole('dialog')).toBeVisible();
});

it('should open the "to" date popover when the end date button is clicked', async () => {
  renderComp();
  const endDateButton = screen.getByRole('button', {
    name: DateTime.fromJSDate(initialDateRange.end).toFormat('dd/MM/yyyy'),
  });
  await userEvent.click(endDateButton);

  expect(screen.getByRole('dialog')).toBeVisible();
});

it('should call onDateChange new start date is selected', async () => {
  renderComp();
  const newStartDate = new Date(2023, 11, 15);
  const startDateButton = screen.getByRole('button', {
    name: DateTime.fromJSDate(initialDateRange.start).toFormat('dd/MM/yyyy'),
  });
  await userEvent.click(startDateButton);

  const newDateButton = screen.getByRole('gridcell', {
    name: DateTime.fromJSDate(newStartDate).toFormat('dd'),
  });

  expect(newDateButton).toBeVisible();

  await userEvent.click(newDateButton);

  expect(mockOnDateChange).toHaveBeenCalled();
});

it('should call onDateChange when end date is selected', async () => {
  renderComp();
  const newEndDate = new Date(2023, 11, 25); // December 25, 2023
  const endDateButton = screen.getByRole('button', {
    name: DateTime.fromJSDate(initialDateRange.end).toFormat('dd/MM/yyyy'),
  });

  await userEvent.click(endDateButton);

  const newDateButton = screen.getByRole('gridcell', {
    name: DateTime.fromJSDate(newEndDate).toFormat('dd'),
  });

  await userEvent.click(newDateButton);

  expect(mockOnDateChange).toHaveBeenCalled();
});
