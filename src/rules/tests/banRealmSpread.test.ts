import { ESLintUtils } from "@typescript-eslint/utils";
import path from "path";

import rule from "../banRealmSpread";

const rootDir = path.resolve(__dirname, "./fixtures/");

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    tsconfigRootDir: rootDir,
    project: "./tsconfig.json",
  },
});

ruleTester.run("ban-realm-spread", rule, {
  valid: [
    {
      code: "type Realm = unknown; const foo: Realm = {}; const moo = foo;",
    },
    "class Realm {}; const foo: Realm = {}; const moo = foo",
    "namespace Realm { export class Object {}}; const foo: Realm = {}; const moo = foo",
  ],

  invalid: [
    {
      code: `
          class Extra {}; 
          declare namespace Realm { export abstract class Object {} }; 
          const foo: Extra & Realm.Object = {}; 
          const moo = {...foo};
        `,
      errors: [
        {
          messageId: "noRealmSpreadName",
          column: 24,
          line: 5,
        },
      ],
    },
    {
      code: "declare namespace Realm { export abstract class Object {} }; const foo: Realm.Object | undefined = {}; const moo = {...foo};",
      errors: [
        {
          messageId: "noRealmSpreadName",
          column: 117,
          line: 1,
        },
      ],
    },
    {
      code: "declare namespace Realm { export abstract class Object {} }; const foo: Realm.Object | null = {}; const moo = {...foo};",
      errors: [
        {
          messageId: "noRealmSpreadName",
          column: 112,
          line: 1,
        },
      ],
    },
    {
      code: "declare namespace Realm { export abstract class Object {} }; const foo: Realm.Object = {}; const moo = {...foo};",
      errors: [
        {
          messageId: "noRealmSpreadName",
          column: 105,
          line: 1,
        },
      ],
    },
    {
      code: "class Extra {}; declare namespace Realm { export abstract class Object {} }; const foo: Realm.Object & Extra = {}; const moo = {...foo};",
      errors: [
        {
          messageId: "noRealmSpreadName",
          column: 129,
          line: 1,
        },
      ],
    },
  ],
});
