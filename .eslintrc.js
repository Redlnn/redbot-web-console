module.exports = {
  root: true,

  env: {
    browser: true,
    es2021: true,
  },

  extends: [
    'eslint:recommended',
    '@vue/typescript/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],

  plugins: ['prettier'],

  parserOptions: {
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: true,
    },
  },

  rules: {
    'no-undef': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-var': 'error',
    'no-useless-return': 'error',
    'prettier/prettier': 'error',
    'vue/require-default-prop': 'off',
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': 'off',
  },
}
