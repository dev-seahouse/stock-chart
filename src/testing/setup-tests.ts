import '@testing-library/jest-dom/vitest';

import { afterAll, beforeAll } from 'vitest';
import { afterEach } from 'node:test';

import { server } from '@/mocks/server';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
