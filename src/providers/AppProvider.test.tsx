import { render } from '@testing-library/react';
import { it } from 'vitest';
import AppProvider from './AppProvider';

// smoke test
it('should render without error', () => {
  render(
    <AppProvider>
      <div>hello</div>
    </AppProvider>,
  );
});
