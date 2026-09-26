import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import boundaries from 'eslint-plugin-boundaries';
import prettier from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist', 'coverage']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.strictTypeChecked,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    plugins: { boundaries },
    settings: {
      'import/resolver': {
        typescript: { alwaysTryTypes: true, project: './tsconfig.app.json' },
      },
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app' },
        { type: 'module', pattern: 'src/modules/*', capture: ['moduleName'] },
        { type: 'shared', pattern: 'src/shared/*', capture: ['sharedName'] },
      ],
    },
    rules: {
      'boundaries/dependencies': [
        2,
        {
          default: 'allow',
          policies: [
            {
              from: { element: { type: 'module' } },
              disallow: { to: { element: { type: 'app' } } },
            },
            {
              from: { element: { type: 'shared' } },
              disallow: { to: { element: { types: { anyOf: ['app', 'module'] } } } },
            },
            {
              from: { element: { types: { anyOf: ['app', 'module'] } } },
              disallow: { to: { element: { type: 'module' } } },
            },
            {
              from: { element: { types: { anyOf: ['app', 'module'] } } },
              allow: { to: { element: { type: 'module', fileInternalPath: 'index.ts' } } },
            },
            {
              from: { element: { types: { anyOf: ['app', 'module'] } } },
              allow: { to: { element: { type: 'module', fileInternalPath: 'admin.ts' } } },
            },
            {
              from: { element: { type: 'module' } },
              allow: {
                to: {
                  element: {
                    type: 'module',
                    captured: { moduleName: '{{from.element.captured.moduleName}}' },
                  },
                },
              },
            },
          ],
        },
      ],
    },
  },
  prettier,
]);
