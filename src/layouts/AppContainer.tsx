import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils.ts';

function AppContainer({
  children,
  className,
}: PropsWithChildren & { className?: string }) {
  return (
    <div
      className={cn(
        `
          flex-1 bg-secondary p-4

          md:p-8
        `,
        className,
      )}
    >
      {children}
    </div>
  );
}
export default AppContainer;
