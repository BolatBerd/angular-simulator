const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const prettier = require('eslint-plugin-prettier');
const eslintConfigPrettier = require('eslint-config-prettier');
const htmlConfigs = [
  ...angular.configs.templateRecommended,
  ...angular.configs.templateAccessibility,
];

module.exports = [
  {
    ignores: ['node_modules/**', 'dist/**', 'coverage/**', '.angular/**'],
  },
  ...tseslint.configs(
    js.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier,
  ),
  {
    files: ['**/*.ts'],
    languageOptions: {
      project: ['./tsconfig.json', './tsconfig.app.json', './tsconfig.spec.json'],
      createDefaultProgram: true,
    },
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'padded-blocks': ['error', { classes: 'always' }],
      'quotes': ['warn', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
      'object-curly-spacing': ['warn', 'always'],
      'template-curly-spacing': ['warn', 'always'],
      'semi': ['warn', 'always'],
      '@typescript-eslint/lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: true },
      ],
      '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
          leadingUnderscore: 'forbid',
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
      ],
    },
  },
];
