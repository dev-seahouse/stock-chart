import { expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import PriceTypePicker from '@/components/StocksChartSection/PriceTypePicker/PriceTypePicker.tsx';
import { StockPriceType } from '@/components/StocksChartSection/PriceTypePicker/PriceTypePicker.types.ts';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const mockedHandleOnChange = vi.fn();

const renderComp = (priceType: StockPriceType) =>
  render(
    <PriceTypePicker
      priceType={priceType}
      onPriceTypeChange={mockedHandleOnChange}
    />,
  );
// smoke test
it('should render without error', () => {
  render(
    <PriceTypePicker
      priceType="high"
      onPriceTypeChange={mockedHandleOnChange}
    />,
  );
});

it('displays the correct initial price type', () => {
  renderComp('open');
  const button = screen.getByRole('button', { name: /open/i });
  expect(button).toBeVisible();
});

it('opens the dropdown menu when the button is clicked', async () => {
  renderComp('open');
  const button = screen.getByRole('button', { name: /open/i });
  await userEvent.click(button);
  const menu = await screen.findByRole('menu');
  expect(menu).toBeVisible();
});

it('displays the correct menu items', async () => {
  renderComp('open');
  const button = screen.getByRole('button', { name: /open/i });
  await userEvent.click(button);
  const menuItems = ['Open', 'High', 'Low', 'Close'].map((item) =>
    screen.getByRole('menuitemradio', { name: item }),
  );
  menuItems.forEach((item) => expect(item).toBeVisible());
});

it('calls onPriceTypeChange with the correct value when a menu item is selected', async () => {
  renderComp('open');
  const button = screen.getByRole('button', { name: /open/i });
  await userEvent.click(button);
  const highItem = screen.getByRole('menuitemradio', { name: /high/i });
  await userEvent.click(highItem);
  expect(mockedHandleOnChange).toHaveBeenCalledWith('high');
});
