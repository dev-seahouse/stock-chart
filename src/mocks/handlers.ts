import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://api.polygon.io/v3/reference/tickers', ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get('search');

    if (search === 'error') {
      return HttpResponse.json(
        {
          status: 'ERROR',
          request_id: '32f2331e61c4041ab6a9a8a286b1f8fa',
          error:
            "You've exceeded the maximum requests per minute, please wait or upgrade your subscription to continue. https://polygon.io/pricing",
        },
        { status: 429 },
      );
    }

    const results =
      search?.toLowerCase() === 'apple'
        ? [{ ticker: 'AAPL', name: 'Apple Inc.' }]
        : [];

    return HttpResponse.json({ results });
  }),
];
