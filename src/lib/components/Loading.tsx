import { Skeleton } from '@/lib/components/Skeleton.tsx';

function Loading() {
  return (
    <div className="flex h-[400px] items-center justify-center space-x-4">
      <Skeleton className="size-12 rounded-full" />
      <span className="sr-only">Loading...</span>
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}

export default Loading;
