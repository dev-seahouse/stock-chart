import { Button } from '@/lib/components/Button';
import type { Theme } from '@/providers/ThemeProvider';
import { Sun, SunMoon } from 'lucide-react';

function AppHeader({
  theme,
  toggleTheme,
}: {
  theme: Theme;
  toggleTheme: () => void;
}) {
  return (
    <header
      className={`
        flex items-center justify-between bg-gray-900 px-6 py-4 text-white
      `}
    >
      <h1 className="text-2xl font-bold">Stock Price Chart</h1>
      <Button onClick={toggleTheme} variant="ghost">
        {theme === 'dark' ? <Sun /> : <SunMoon />}
        <span className="sr-only">Toggle dark mode</span>
      </Button>
    </header>
  );
}

export default AppHeader;
