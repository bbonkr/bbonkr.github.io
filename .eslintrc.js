module.exports = {
    parser: `@typescript-eslint/parser`,
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    plugins: ['@typescript-eslint', 'prettier'],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    env: {
        browser: true,
        node: true,
    },
    rules: {
        'arrow-body-style': 'off',
        'prefer-arrow-callback': 'off',
        quotes: 'off',
        '@typescript-eslint/quotes': [
            2,
            'backtick',
            {
                avoidEscape: true,
            },
        ],
        indent: ['error', 2, { SwitchCase: 1 }],
        'prettier/prettier': 'error',
    },
};
