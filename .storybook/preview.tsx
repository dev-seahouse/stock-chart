import React from 'react';
import type { Preview } from '@storybook/react';
import '../src/index.css';
import { initialize, mswLoader, mswDecorator } from 'msw-storybook-addon';
import ThemeProvider from '../src/providers/ThemeProvider';
import ReactQueryProvider from '../src/providers/ReactQueryProvider';
import { testingQueryOptions } from '../src/testing/testingQueryConfig';
import { QueryClient } from '@tanstack/react-query';
import { handlers } from '../src/mocks/handlers';

initialize();

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    msw: {
      handlers,
    },
  },
  loaders: [mswLoader],
  decorators: [
    mswDecorator,
    (Story) => {
      return (
        <ThemeProvider
          defaultTheme="light"
          storageKey="stock-chart-theme-storybook"
        >
          <ReactQueryProvider
            overrideQueryClient={new QueryClient(testingQueryOptions)}
          >
            <Story />
          </ReactQueryProvider>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;
