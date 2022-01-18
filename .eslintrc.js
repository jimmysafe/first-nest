module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'no-plusplus': 'off',
    camelcase: 'off',
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'no-useless-constructor': 'off',
    'class-methods-use-this': 'off',
    'max-classes-per-file': ['error', 3],
    'import/no-cycle': 'off',
    'no-nested-ternary': 'off',
    'import/no-extraneous-dependencies': 'off',
    'consistent-return': 'off',
    'no-underscore-dangle': 'off',
    'no-return-await': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'import/no-unresolved': 'off',
    'import/export': 'off',
    'array-callback-return': 'off',
  },
};
