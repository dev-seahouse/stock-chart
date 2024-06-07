module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    'plugin:testing-library/react',
    "plugin:@tanstack/eslint-plugin-query/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:storybook/recommended",
    "plugin:storybook/recommended",
    "prettier",
  ],
  settings: {
    tailwindcss: {
      callees: ["cn", "classnames", "clsx", "ctl", "cva", "tv", "tw"],
    }
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', "public"],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['react-refresh', "readable-tailwind"],
  rules: {
    "@typescript-eslint/require-await": "warn",
    "readable-tailwind/multiline": ["warn", { "printWidth": 80 }],
    "@typescript-eslint/no-explicit-any": ["warn"],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
