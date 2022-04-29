"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
/**
 * Reasoning: https://stackoverflow.com/questions/49562569/typed-react-props-as-type-or-an-interface
 */
exports.default = (0, utils_1.createRule)({
    name: 'disallow-props-interface',
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Bans interface with name "props" from being used. ',
            recommended: 'error',
        },
        messages: {
            noInterfaceProps: "Props should be of 'type' instead of an 'interface'"
        },
        schema: [{}]
    },
    defaultOptions: [{}],
    create(context) {
        return {
            TSInterfaceDeclaration(node) {
                if (node.id.name.indexOf("Props") !== -1) {
                    context.report({
                        node,
                        messageId: "noInterfaceProps",
                    });
                }
            },
        };
    }
});
//# sourceMappingURL=disallowPropsInterface.js.map