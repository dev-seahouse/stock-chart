import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

/**
 * 1 column on mobile
 * 3 columns on desktop
 */
function GridLayout({ children }: PropsWithChildren) {
  return (
    <div
      className={cn(`
        grid grid-cols-1 gap-8

        md:grid-cols-3
      `)}
    >
      {children}
    </div>
  );
}

export default GridLayout;
