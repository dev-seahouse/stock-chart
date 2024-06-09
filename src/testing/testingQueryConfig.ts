/* eslint-disable @typescript-eslint/no-empty-function */
import { queryConfig } from '@/providers/ReactQueryProvider';

// test query config should mimic the production query config
// tests are likely to timeout if you want to test an erroneous query
// so retry off

// @see https://tanstack.com/query/v4/docs/framework/react/guides/testing
// for explanation of the following config
export const testingQueryOptions = {
  logger: {
    log: console.log,
    warn: console.warn,
    // ✅ no more errors on the console for tests
    error: process.env.NODE_ENV === 'test' ? () => {} : console.error,
  },
  defaultOptions: {
    ...queryConfig,
    queries: {
      ...queryConfig.queries,
      retry: false,
    },
  },
};
