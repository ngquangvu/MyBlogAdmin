module.exports = {
  extends: ['airbnb-typescript', 'airbnb/hooks', 'plugin:@typescript-eslint/recommended', 'plugin:jsx-a11y/recommended', 'prettier'],
  plugins: ['react', '@typescript-eslint', 'import', 'jest-dom', 'testing-library'],
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: '12',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
      extends: ['plugin:jest-dom/recommended', 'plugin:testing-library/react'],
    },
  ],
  rules: {
    'linebreak-style': 'off',
    'import/no-unassigned-import': ['error', { allow: ['**/*.css', '**/*.scss'] }],
    '@typescript-eslint/no-shadow': ['off'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: '{react,react-dom/**,react-router-dom}',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@src/**',
            group: 'parent',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
      },
    ],
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
