import { queryConfig } from '@/providers/ReactQueryProvider';

// test query config should mimic the production query config
// tests are likely to timeout if you want to test an erroneous query
// so retry off
export const testingQueryOptions = {
  defaultOptions: {
    ...queryConfig,
    queries: {
      ...queryConfig.queries,
      retry: false,
    },
  },
};
