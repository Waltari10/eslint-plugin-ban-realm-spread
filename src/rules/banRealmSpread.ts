/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { ESLintUtils } from "@typescript-eslint/utils";
import { createRule } from "../utils";

export default createRule({
  name: "ban-realm-spread",
  meta: {
    type: "suggestion",
    docs: {
      description: "Bans spread operator from being used on Realm results.",
      recommended: "error",
    },
    messages: {
      noRealmSpread:
        'Dont spread "{{name}}"! Spread operator does not work on Realm results.',
    },
    schema: [{}],
  },
  defaultOptions: [{}],
  create(context) {
    const parserServices = ESLintUtils.getParserServices(context);
    const checker = parserServices?.program?.getTypeChecker();
    return {
      SpreadElement(node) {
        const expression = parserServices.esTreeNodeToTSNodeMap.get(
          node.argument
        );
        // Handle intersection type
        if (checker?.getTypeAtLocation(expression).isIntersection()) {
          const nonNullableType = checker
            ?.getTypeAtLocation(expression)
            ?.getNonNullableType();

          // @ts-ignore
          if (!nonNullableType || !nonNullableType?.types) {
            return;
          }

          // @ts-ignore
          const types = nonNullableType.types;

          // types is an array but doesn't have forEach so using for.
          // for (const type in types) was breaking TS types
          for (let i = 0; i < types?.length; i++) {
            const type = types[i];

            if (
              type?.symbol?.escapedName?.toString() === "Object" &&
              type?.symbol?.parent?.escapedName?.toString()
            ) {
              context.report({
                node,
                messageId: "noRealmSpread",
                data: {
                  //@ts-ignore
                  name: node?.argument?.name,
                },
              });
            }
          }
        } else {
          // Handle non intersection type

          const symbol = checker?.getTypeAtLocation(expression)?.getSymbol();

          // @ts-ignore
          if (!symbol?.parent) {
            return;
          }
          // Namespace name
          // @ts-ignore
          const parentName = symbol?.parent?.escapedName?.toString() || "";

          // Name of type in namespace
          const type = symbol?.escapedName?.toString() || "";

          if (parentName === "Realm" && type === "Object") {
            context.report({
              node,
              messageId: "noRealmSpread",
              data: {
                //@ts-ignore
                name: node?.argument?.name,
              },
            });
          }
        }
      },
    };
  },
});
