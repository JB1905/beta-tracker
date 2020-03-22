module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['prettier'],
  env: {
    node: true,
    browser: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
};
