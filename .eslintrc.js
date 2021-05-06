module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  plugins: [
    '@typescript-eslint',
    'vue',
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
  ],
  rules: {
    "sort-imports": "error",
    "vue/attributes-order": "error",
    "vue/max-attributes-per-line": "error",
    "@typescript-eslint/no-unused-vars": "error",
  }
}
