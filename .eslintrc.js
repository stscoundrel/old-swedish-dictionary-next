module.exports = {
  extends: [
    'airbnb-base',
    'next',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    node: true,
    es2020: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
  globals: {
    document: true,
    'jest/globals': true,
  },
  plugins: [
    'import',
    'react',
    'jest',
    '@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  settings: {
    react: {
      version: '17.0.1',
    },
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  rules: {
    semi: 0,
    'no-console': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'import/no-extraneous-dependencies': 0,
    'import/extensions': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },
};
