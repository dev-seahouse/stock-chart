import { useState } from 'react';
import AsyncSelect from '@/lib/components/AsyncSelect.tsx';
import type { ActionMeta, SingleValue } from 'react-select';
import useFetchTickers, { fetchTickers } from './StocksAsyncSelect.hooks.ts';
import type { StocksSelectOption } from './StocksAsyncSelect.types.ts';
import { queryClient } from '@/providers/ReactQueryProvider.tsx';

interface StocksAsyncSelectProps {
  className?: string;
  onChange: (
    newValue: SingleValue<StocksSelectOption>,
    actionMeta: ActionMeta<StocksSelectOption>,
  ) => void;
  isDisabled?: boolean;
}

/**
 * Async select component for searching stocks
 */
function StocksAsyncSelect({
  onChange,
  isDisabled,
  className,
}: StocksAsyncSelectProps) {
  const [inputState, setInputState] = useState('');

  const { data: cachedData, isError } = useFetchTickers(inputState);

  const loadOptions = async (inputValue: string) => {
    if (!inputValue?.length) return [];

    setInputState(inputValue);

    const queryKey = ['tickers', inputValue];
    const cachedData = queryClient.getQueryData<StocksSelectOption[]>(queryKey);

    if (cachedData) return cachedData;

    return await queryClient.fetchQuery({
      queryKey,
      queryFn: ({ signal }) => fetchTickers(inputValue, signal),
    });
  };

  const noOptionsMessage = () => {
    if (isError) {
      return 'Please wait before searching again.';
    }
    return 'No stocks found';
  };

  return (
    <AsyncSelect
      placeholder="Type to search stocks ..."
      defaultOptions={cachedData ?? []}
      noOptionsMessage={noOptionsMessage}
      onChange={onChange}
      loadOptions={loadOptions}
      isMulti={false}
      isDisabled={isDisabled}
      className={className}
    />
  );
}

export default StocksAsyncSelect;
