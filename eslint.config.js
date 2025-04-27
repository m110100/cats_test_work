import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query'
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
	globalIgnores(["node_modules/*", "build/*", ".react-router/*", ".env/*"]),
	{
		files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
		plugins: {
			js,
			'import': importPlugin,
			'react': pluginReact,
			'react-hooks': reactHooks,
			'@typescript-eslint': tseslint.plugin,
		},
		extends: ['js/recommended'],
		settings: {
			'import/resolver': {
				typescript: { project: 'tsconfig.app.json' },
				node: true,
			},
			'react': {
				'version': '19.0.0'
			},
		},
		languageOptions: { parser: tseslint.parser },
		rules: {
			'no-unused-vars': 'warn',
			'no-undef': 'warn',
			'@typescript-eslint/no-namespace': 'off',
			'import/order': [
				'error',
				{
					'groups': [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
						'object',
						'type',
					],
					'pathGroups': [
						{
							pattern: 'react',
							group: 'external',
							position: 'before',
						},
					],
					'pathGroupsExcludedImportTypes': ['react'],
					'newlines-between': 'never',
					'alphabetize': {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],
			'import/named': 'error',
			'import/default': 'error',
		},
	},
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'], languageOptions: { globals: globals.browser } },
	pluginReact.configs.flat.recommended,
	...pluginQuery.configs['flat/recommended'],
	prettierConfig,
	{
		files: ['**/*.{jsx,tsx}'],
		rules: {
			'react/react-in-jsx-scope': 'off',
			'react/jsx-uses-react': 'off',
		},
	},
]);
