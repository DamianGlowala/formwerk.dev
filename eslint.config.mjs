import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import eslint from '@eslint/js';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      'typescript-eslint/triple-slash-reference': 'off',
    },
  },
  {
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: ['packages/playground/postcss.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
  },
  {
    ignores: ['dist/*', 'components.d.ts', '.astro/*'],
  },
);
