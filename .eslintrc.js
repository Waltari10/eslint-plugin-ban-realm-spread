module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:node/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "eslint-plugin"
    ],
    "rules": {
        "node/no-unsupported-features/es-syntax": 0,
        "node/no-missing-import": 0,
        "node/no-unpublished-import": 0
    },
    globals: {
        __dirname: true
    },
}
