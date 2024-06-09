import { render } from '@testing-library/react';
import { it } from 'vitest';
import ReactQueryProvider from '@/providers/ReactQueryProvider.tsx';

it('should render without error', () => {
  render(
    <ReactQueryProvider>
      <div>hello world</div>
    </ReactQueryProvider>,
  );
});
