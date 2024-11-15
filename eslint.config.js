import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import eslintPluginImport from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {files: ['src/*.{ts,jsx,tsx}'],},
    {languageOptions: {globals: globals.browser,},},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        plugins: {import: eslintPluginImport,},
        rules: {
            'import/order': ['error',
                {
                    'groups': [['builtin', 'external'], 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                }],
            'import/prefer-default-export': 'off', // Предпочтение именованным экспортам
            'react/react-in-jsx-scope': 'off', // Отключаем требование импорта React
            'quotes': ['error', 'single'], // Одинарные кавычки
            'indent': ['error', 4], // Отступы в 4 пробела
            'array-element-newline': ['error', { 'multiline': true }], // Элементы списка на новой строке
            'object-property-newline': ['error', { 'allowMultiplePropertiesPerLine': false }], // Свойства объекта на новой строке
            'linebreak-style': ['error', 'unix'], // Перенос строк в стиле Unix
            'eol-last': ['error', 'always'], // Пустая строка в конце файла
            'no-magic-numbers': ['warn',
                {
                    'ignoreArrayIndexes': true,
                    'ignore': [0, 1] 
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
                    'ObjectExpression': { 'multiline': true }, // Если больше одного элемента в объекте
                    'ObjectPattern': { 'multiline': true }, // Для деструктуризации объектов
                }
            ], // Переносить элементы объекта на новую строку
        },
    },
];
