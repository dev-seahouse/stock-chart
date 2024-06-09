import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils.ts';

/**
 *  Creates an elevation look
 */
function Paper({
  children,
  className,
}: PropsWithChildren & { className?: string }) {
  return (
    <div className={cn('rounded-lg bg-background p-6 shadow-lg', className)}>
      {children}
    </div>
  );
}

export default Paper;
