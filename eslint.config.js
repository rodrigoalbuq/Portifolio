// ESLint flat config
import js from '@eslint/js'
import react from 'eslint-plugin-react'
import importPlugin from 'eslint-plugin-import'
import globals from 'globals'

export default [
    {
        ignores: ['node_modules/', 'dist/', 'build/', '.vite/', 'coverage/']
    },
    js.configs.recommended,
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parserOptions: { ecmaFeatures: { jsx: true } },
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        plugins: {
            react,
            import: importPlugin
        },
        settings: {
            react: { version: 'detect' },
            'import/resolver': {
                node: { extensions: ['.js', '.jsx'] }
            },
            'import/extensions': ['.js', '.jsx']
        },
        rules: {
            'no-unused-vars': ['error', { args: 'after-used', argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrors: 'all', caughtErrorsIgnorePattern: '^_' }],
            'import/no-unused-modules': ['warn', { unusedExports: true }],
            'react/react-in-jsx-scope': 'off',
            'react/jsx-uses-vars': 'error'
        }
    },
    {
        files: ['**/*.test.jsx'],
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.vitest
            }
        }
    },
    {
        files: ['eslint.config.js', 'vite.config.js', 'vitest.setup.js'],
        rules: {
            'import/no-unused-modules': 'off'
        }
    }
]
