import type { PropsWithChildren } from 'react';
import { cn } from '../utils';

interface HeadingProps extends PropsWithChildren {
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

// TODO: add proper typography variants
function Heading({ className, children, as }: HeadingProps) {
  const Comp = as ?? 'h1';

  return (
    <Comp
      className={cn(
        `
          mb-4 text-xl font-bold text-gray-800

          dark:text-foreground
        `,
        className,
      )}
    >
      {children}
    </Comp>
  );
}

export default Heading;
