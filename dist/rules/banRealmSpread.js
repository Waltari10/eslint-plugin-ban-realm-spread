"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@typescript-eslint/utils");
const utils_2 = require("../utils");
exports.default = (0, utils_2.createRule)({
    name: "ban-realm-spread",
    meta: {
        type: "suggestion",
        docs: {
            description: "Bans spread operator from being used on Realm results.",
            recommended: "error",
        },
        messages: {
            noRealmSpread: 'Dont spread "{type}"! Spread operator does not work on Realm objects.',
            noRealmSpreadName: 'Dont spread "{type}" "{{name}}"! Spread operator does not work on Realm objects.',
        },
        schema: [{}],
    },
    defaultOptions: [{}],
    create(context) {
        var _a;
        const parserServices = utils_1.ESLintUtils.getParserServices(context);
        const checker = (_a = parserServices === null || parserServices === void 0 ? void 0 : parserServices.program) === null || _a === void 0 ? void 0 : _a.getTypeChecker();
        return {
            SpreadElement(node) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
                const expression = parserServices.esTreeNodeToTSNodeMap.get(node.argument);
                // Handle intersection type
                if (checker === null || checker === void 0 ? void 0 : checker.getTypeAtLocation(expression).isIntersection()) {
                    const nonNullableType = (_a = checker === null || checker === void 0 ? void 0 : checker.getTypeAtLocation(expression)) === null || _a === void 0 ? void 0 : _a.getNonNullableType();
                    // @ts-ignore
                    if (!nonNullableType || !(nonNullableType === null || nonNullableType === void 0 ? void 0 : nonNullableType.types)) {
                        return;
                    }
                    // @ts-ignore
                    const types = nonNullableType.types;
                    // types is an array but doesn't have forEach so using for.
                    // for (const type in types) was breaking TS types
                    for (let i = 0; i < (types === null || types === void 0 ? void 0 : types.length); i++) {
                        const type = types[i];
                        if (((_c = (_b = type === null || type === void 0 ? void 0 : type.symbol) === null || _b === void 0 ? void 0 : _b.escapedName) === null || _c === void 0 ? void 0 : _c.toString()) === "Object" &&
                            ((_f = (_e = (_d = type === null || type === void 0 ? void 0 : type.symbol) === null || _d === void 0 ? void 0 : _d.parent) === null || _e === void 0 ? void 0 : _e.escapedName) === null || _f === void 0 ? void 0 : _f.toString())) {
                            context.report({
                                node,
                                //@ts-ignore
                                messageId: ((_g = node === null || node === void 0 ? void 0 : node.argument) === null || _g === void 0 ? void 0 : _g.name)
                                    ? "noRealmSpreadName"
                                    : "noRealmSpread",
                                data: {
                                    //@ts-ignore
                                    name: (_h = node === null || node === void 0 ? void 0 : node.argument) === null || _h === void 0 ? void 0 : _h.name,
                                },
                            });
                        }
                    }
                }
                else {
                    // Handle non intersection type
                    const symbol = (_j = checker === null || checker === void 0 ? void 0 : checker.getTypeAtLocation(expression)) === null || _j === void 0 ? void 0 : _j.getSymbol();
                    // @ts-ignore
                    if (!(symbol === null || symbol === void 0 ? void 0 : symbol.parent)) {
                        return;
                    }
                    // Namespace name
                    // @ts-ignore
                    const parentName = ((_l = (_k = symbol === null || symbol === void 0 ? void 0 : symbol.parent) === null || _k === void 0 ? void 0 : _k.escapedName) === null || _l === void 0 ? void 0 : _l.toString()) || "";
                    // Name of type in namespace
                    const type = ((_m = symbol === null || symbol === void 0 ? void 0 : symbol.escapedName) === null || _m === void 0 ? void 0 : _m.toString()) || "";
                    if (parentName === "Realm" && type === "Object") {
                        context.report({
                            node,
                            //@ts-ignore
                            messageId: ((_o = node === null || node === void 0 ? void 0 : node.argument) === null || _o === void 0 ? void 0 : _o.name)
                                ? "noRealmSpreadName"
                                : "noRealmSpread",
                            data: {
                                //@ts-ignore
                                name: ((_p = node === null || node === void 0 ? void 0 : node.argument) === null || _p === void 0 ? void 0 : _p.name) || "",
                                type: parentName + "." + type,
                            },
                        });
                    }
                }
            },
        };
    },
});
//# sourceMappingURL=banRealmSpread.js.map