## How to install

Requires typescript to be setup for ESlint and your project. Check quick start instructions from here to install: https://www.npmjs.com/package/@typescript-eslint/eslint-plugin

Only warns about Realm.Object Typescript type. If your Realm.Object has any other type this will not work.

After that install plugin by:

```bash
$ yarn add -D @waltari/eslint-plugin-ban-realm-spread
$ npm i --save-dev @waltari/eslint-plugin-ban-realm-spread
```

### Usage

Add `@waltari/ban-realm-spread` to the plugins in `.eslintrc` configuration file, then add the ban-realm-spread rule to rules section.

```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@waltari/ban-realm-spread"],
  "rules": {
    "@waltari/ban-realm-spread/ban-realm-spread": "error"
  }
}
```

This package only has "@waltari/ban-realm-spread/ban-realm-spread" rule.

Feel free to post any issues or improvement ideas in Github issues <3
