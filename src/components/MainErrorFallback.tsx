import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/lib/components/Button';

export function MainErrorFallback() {
  return (
    <AppLayout>
      <div
        className="flex h-screen w-screen flex-col items-center justify-center"
        role="alert"
      >
        <h2 className="text-lg font-semibold">
          Ooops, something went wrong :({' '}
        </h2>
        <Button
          className="mt-4"
          onClick={() => window.location.assign(window.location.origin)}
        >
          Refresh
        </Button>
      </div>
    </AppLayout>
  );
}

export default MainErrorFallback;
