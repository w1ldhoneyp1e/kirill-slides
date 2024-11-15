import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginImport from 'eslint-plugin-import';
import pluginReactHooks from 'eslint-plugin-react-hooks';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {files: ['src/**/*.{ts,jsx,tsx}']},
    {languageOptions: {globals: globals.browser}},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        plugins: {
            import: eslintPluginImport,
            'react-hooks': pluginReactHooks,
        },
        rules: {
            // Правило для группировки импортов
            'import/order': [
                'error',
                {
                    groups: [
                        ['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index'],
                    ],
                },
            ],
            'import/prefer-default-export': 'off', // Предпочтение именованным экспортам
            'import/newline-after-import': ['error', { 'count': 1 }], // Правило для разделения длинных импортов на несколько строк
            'react/react-in-jsx-scope': 'off', // Отключаем требование импорта React
            'quotes': ['error', 'single'], // Одинарные кавычки
            'indent': ['error', 4], // Отступы в 4 пробела
            'array-element-newline': ['error', { 'multiline': true }], // Элементы списка на новой строке
            'object-property-newline': ['error', { 'allowMultiplePropertiesPerLine': false }], // Свойства объекта на новой строке
            'eol-last': ['error', 'always'], // Пустая строка в конце файла
            'no-magic-numbers': ['warn',
                {
                    'ignoreArrayIndexes': true,
                    'ignore': [0, 1],
                }], // Игнорирование магических чисел
            'no-else-return': 'error', // Убираем `else`, если можно вернуть значение до
            'no-unneeded-ternary': 'error', // Убираем лишние тернарные операторы
            'prefer-const': 'error', // Использование `const` вместо `let`, если переменная не меняется
            'no-self-assign': 'error', // Предотвращение присваивания переменной самой себе
            'consistent-return': 'error', // Консистентные возвращаемые значения в функциях
            'function-paren-newline': ['error', 'multiline'], // Переносить аргументы функции на новую строку, если их больше одного
            'object-curly-newline': [
                'error',
                {
                    'ObjectExpression': {
                        'multiline': true,
                        'minProperties': 2,
                    }, // Если больше одного элемента в объекте
                    'ObjectPattern': {
                        'multiline': true,
                        'minProperties': 2,
                    }, // Для деструктуризации объектов
                    'ImportDeclaration': {
                        'multiline': true,
                        'minProperties': 2,
                    }, // Для импортов
                    'ExportDeclaration': {
                        'multiline': true,
                        'minProperties': 2,
                    }, // Для экспортов
                },
            ], // Переносить элементы объекта на новую строку
            'comma-dangle': ['error', 'always-multiline'],
            'react-hooks/rules-of-hooks': 'error', // Проверка правильности использования хуков
            'react-hooks/exhaustive-deps': 'warn', // Проверка зависимостей в useEffect
            'no-trailing-spaces': 'error', // Убирает пробелы в конце строки
            'no-mixed-spaces-and-tabs': 'error', // Предотвращает смешивание пробелов и табуляций
        },
    },
];
