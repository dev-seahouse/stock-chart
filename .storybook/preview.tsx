import { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-themes';
import { initialize, mswLoader } from 'msw-storybook-addon';
import ThemeProvider from '../src/providers/ThemeProvider';
import ReactQueryProvider from '../src/providers/ReactQueryProvider';
import { testingQueryOptions } from '../src/testing/testingQueryConfig';
import { QueryClient } from '@tanstack/react-query';
import { handlers } from '../src/mocks/handlers';

import '../src/index.css';

initialize();

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    docs: {
      toc: true,
    },
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
    withThemeByClassName<any>({
      themes: {
        light: '',
        dark: 'dark',
        system: 'system',
      },
      defaultTheme: 'light',
    }),
  ],
};

export default preview;
