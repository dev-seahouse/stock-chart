import React, { useState } from 'react';
import TickersService from '@/api/services/Tickers';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import AsyncSelect from '@/lib/components/AsyncSelect';
import type { ActionMeta, SingleValue } from 'react-select';

export interface StocksSelectOption {
  label: string;
  value: string;
}

interface StocksAsyncSelectProps {
  onChange: (
    newValue: SingleValue<StocksSelectOption>,
    actionMeta: ActionMeta<StocksSelectOption>,
  ) => void;
  isDisabled?: boolean;
}

const fetchTickers = async (
  search: string,
  signal?: AbortSignal,
): Promise<StocksSelectOption[]> => {
  const queryParams = {
    search,
    locale: 'us',
    limit: 10,
    market: 'stocks',
    type: 'CS',
  };
  try {
    const response = await TickersService.tickers(queryParams, signal);
    return response.data.results.map((ticker) => ({
      label: `${ticker.name} (${ticker.ticker})`,
      value: ticker.ticker,
    }));
  } catch (e) {
    throw new Error(e as string);
  }
};

const useFetchTickers = (search: string) => {
  return useQuery({
    queryKey: ['tickers', search],
    queryFn: ({ signal }) => fetchTickers(search, signal),
    enabled: !!search,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

const StocksAsyncSelect: React.FC<StocksAsyncSelectProps> = ({
  onChange,
  isDisabled,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [debouncedInputValue] = useDebounce(inputValue, 500); // 500ms debounce
  const queryClient = useQueryClient();

  const { data: cachedData, isError } = useFetchTickers(debouncedInputValue);

  const loadOptions = async (inputValue: string) => {
    if (!inputValue?.length) return [];

    // update input value to trigger debounce
    setInputValue(inputValue);

    // get cached data if found
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
    />
  );
};

export default StocksAsyncSelect;
