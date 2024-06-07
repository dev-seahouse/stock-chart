## how to start

```
npm start
```

## how to start storybook

```
npm run storybook
```

## how to run test

```
npm run test
```

or

```
npm run test:ui
```

## Component features and behaviour

### Select Stocks Combobox

1. Caching
   The initial implementation has an issue, that is, after user have made a selection , close the dropdown, and open it again, the dropdown items disappears.
   ![alt text](screenshots/image.png)
   This issue is fixed by

## Testing

1. msw is setup to mock http request/response, stock-chart/src/mocks
2. msw is linked to storybook to provide mocked response
3. all components are created with being testable in mind, for example stock-chart/src/providers/ReactQueryProvider.tsx is reusable in tests to allow overriding the app queryClient
4.

## Folder structure

stock-chart/
├── .storybook/
├── public/
├── screenshots/
├── src/ #
│ ├── components/ # feature specific components, often contains business logic
│ ├── api/ # api client.File name corresponds to api documentation, e.g Tickers=>Tickers.ts,
│ ├── lib/ # shared code used by different features, need to be generic, can't import from features
│ ├── layouts/ # layout components are containers that arrange/group components in some pattern
│ ├── mocks/ # msw handlers and server
│ ├── providers/ # context providers
│ ├── testing/ # testing utilities
│ ├── utils/  
│ ├── index.tsx
├── components.json # used by ShadCn

## Misc notes

1. index.html have <noscript> tag added
2. types and utils are co-located by default and extracted into separate file only if
   1. a single file is too long and becoming unreadable,
   2. the type/util is shared/duplicated 3 times (following duplicate twice rule)
