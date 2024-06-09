import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import ThemeProvider, { useTheme } from '@/providers/ThemeProvider.tsx';
import React from 'react';
import { act, render, renderHook } from '@testing-library/react';

beforeEach(() => {
  localStorage.clear();
});

afterAll(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('ThemeProvider', () => {
  // smoke test
  it('should render without error', () => {
    render(
      <ThemeProvider>
        <div>hello</div>
      </ThemeProvider>,
    );
  });

  it('should provide the default theme', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('system');
  });

  it('should get theme from localStorage', () => {
    localStorage.setItem('vite-ui-theme', 'dark');

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe('dark');
  });

  it('should update the theme', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme('light');
    });

    expect(result.current.theme).toBe('light');
    expect(localStorage.getItem('vite-ui-theme')).toBe('light');
  });

  it('should toggle the theme', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => {
      result.current.setTheme('dark');
    });

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('light');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('dark');
  });

  it('should apply the theme class to the document root', () => {
    const addSpy = vi.spyOn(document.documentElement.classList, 'add');
    const removeSpy = vi.spyOn(document.documentElement.classList, 'remove');

    renderHook(() => useTheme(), { wrapper });

    expect(removeSpy).toHaveBeenCalledWith('light', 'dark');
    expect(addSpy).toHaveBeenCalledWith(expect.stringMatching(/light|dark/));
  });
});
